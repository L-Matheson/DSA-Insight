// mbql-template.ts

/** A node in an MBQL AST: primitive, nested array, or plain object. */
export type MBQLPrimitive = string | number | boolean | null;
export type MBQLNode = MBQLPrimitive | MBQLNode[] | { [key: string]: MBQLNode };

/** The flat bag of values your templates resolve against, e.g. { text_test: 'foo' } */
export type TemplatePayload = Record<string, unknown>;

export interface ResolveOptions {
  /** Payload key exists nowhere in the payload object at all. */
  onMissing?: (key: string) => unknown;
  /** Payload key exists but its value is null/undefined. */
  onNull?: (key: string) => unknown;
}

const FULL_TEMPLATE_RE = /^\{\{\s*([\w.-]+)\s*\}\}$/;

function templateRefRegex(): RegExp {
  // fresh instance every call — 'g' flag regexes are stateful and must not be shared
  return /\{\{\s*([\w.-]+)\s*\}\}/g;
}

function resolveKey(key: string, payload: TemplatePayload, options: ResolveOptions): unknown {
  if (!(key in payload)) {
    return options.onMissing ? options.onMissing(key) : null;
  }
  const value = payload[key];
  if (value === null || value === undefined) {
    return options.onNull ? options.onNull(key) : null;
  }
  return value;
}

function resolveString(str: string, payload: TemplatePayload, options: ResolveOptions): unknown {
  const fullMatch = str.match(FULL_TEMPLATE_RE);
  if (fullMatch) {
    // whole string IS the template -> preserve the payload value's real type
    return resolveKey(fullMatch[1], payload, options);
  }

  const re = templateRefRegex();
  if (!re.test(str)) return str;

  return str.replace(templateRefRegex(), (_match, key: string) => {
    const resolved = resolveKey(key, payload, options);
    return resolved === null || resolved === undefined ? '' : String(resolved);
  });
}

/**
 * Recursively walks an MBQL AST and substitutes every {{key}} template
 * with payload[key]. Returns a brand-new tree; input is never mutated.
 */
export function resolveMbqlTemplates<T = MBQLNode>(
  node: MBQLNode,
  payload: TemplatePayload,
  options: ResolveOptions = {}
): T {
  if (Array.isArray(node)) {
    return node.map((child) => resolveMbqlTemplates(child, payload, options)) as unknown as T;
  }

  if (node !== null && typeof node === 'object') {
    const result: Record<string, MBQLNode> = {};
    for (const [k, v] of Object.entries(node)) {
      result[k] = resolveMbqlTemplates(v, payload, options) as MBQLNode;
    }
    return result as unknown as T;
  }

  if (typeof node === 'string') {
    return resolveString(node, payload, options) as unknown as T;
  }

  return node as unknown as T; // number | boolean | null pass through unchanged
}

/**
 * Collects every {{key}} referenced anywhere in the MBQL tree.
 * Useful for validating a payload has everything a saved question needs
 * before you attempt to resolve it.
 */
export function extractTemplateKeys(node: MBQLNode, keys: Set<string> = new Set()): Set<string> {
  if (Array.isArray(node)) {
    node.forEach((child) => extractTemplateKeys(child, keys));
  } else if (node !== null && typeof node === 'object') {
    Object.values(node).forEach((v) => extractTemplateKeys(v, keys));
  } else if (typeof node === 'string') {
    for (const m of node.matchAll(templateRefRegex())) {
      keys.add(m[1]);
    }
  }
  return keys;
}










// useResolvedMbql.ts
import { computed, type Ref } from 'vue';
import { resolveMbqlTemplates, extractTemplateKeys, type MBQLNode, type TemplatePayload, type ResolveOptions } from './mbql-template';

export function useResolvedMbql(
  mbql: Ref<MBQLNode>,
  payload: Ref<TemplatePayload>,
  options?: ResolveOptions
) {
  const resolved = computed(() => resolveMbqlTemplates(mbql.value, payload.value, options));
  const requiredKeys = computed(() => extractTemplateKeys(mbql.value));
  const missingKeys = computed(() =>
    [...requiredKeys.value].filter((k) => !(k in payload.value) || payload.value[k] == null)
  );

  return { resolved, requiredKeys, missingKeys };
}












