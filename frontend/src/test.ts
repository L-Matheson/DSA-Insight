// useQuestionData.ts
import { computed, type Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { resolveMbqlTemplates, extractTemplateKeys, type MBQLNode, type TemplatePayload } from './mbql-template';
import { ruleHandler } from './ruleHandler';
import { usePayload } from './usePayload';
import { fetchQuestionData } from './api/metabase'; // existing backend call: (questionId, mbql) => Promise<T>

interface UseQuestionDataOptions {
  questionId: Ref<string>;
  astfilter: Ref<unknown>; // nodedefinition.config.optionconfig.astfilter, passed in directly
}

export function useQuestionData({ questionId, astfilter }: UseQuestionDataOptions) {
  const tes = usePayload(); // reactive, per-ticket

  // astfilter -> raw MBQL. Curly-brace refs still unresolved at this point.
  // Wrapped in try/catch: astfilter can be mid-edit and momentarily invalid
  // while the user is still building a nested filter in the UI.
  const rawMbql = computed<MBQLNode | null>(() => {
    try {
      return ruleHandler.toJSON(astfilter.value, 'mbql') as MBQLNode;
    } catch (err) {
      console.warn('astfilter not yet resolvable to MBQL', err);
      return null;
    }
  });

  // Which {{keys}} does this specific filter reference right now?
  // Recomputed whenever rawMbql changes shape (user adds/removes a {{}} filter).
  const requiredKeys = computed(() =>
    rawMbql.value ? extractTemplateKeys(rawMbql.value) : new Set<string>()
  );

  // tes.payload is a whole-ticket object — pluck only the keys this MBQL
  // cares about. This is what makes reactivity precise: a change to an
  // unrelated ticket field won't invalidate this computed or requery,
  // only a change to a referenced key will.
  const relevantPayload = computed<TemplatePayload>(() => {
    const out: TemplatePayload = {};
    for (const key of requiredKeys.value) {
      out[key] = tes.payload[key];
    }
    return out;
  });

  const missingKeys = computed(() =>
    [...requiredKeys.value].filter(
      (k) => relevantPayload.value[k] === null || relevantPayload.value[k] === undefined
    )
  );

  // Fully-resolved MBQL — this is what actually determines the response,
  // so it's what we key and query on.
  const resolvedMbql = computed<MBQLNode | null>(() =>
    rawMbql.value ? resolveMbqlTemplates<MBQLNode>(rawMbql.value, relevantPayload.value) : null
  );

  const query = useQuery({
    queryKey: computed(() => ['metabase-question', questionId.value, resolvedMbql.value] as const),
    queryFn: () => fetchQuestionData(questionId.value, resolvedMbql.value as MBQLNode),
    enabled: computed(
      () => resolvedMbql.value !== null && missingKeys.value.length === 0
    ),
  });

  return { ...query, resolvedMbql, missingKeys, requiredKeys };
}
