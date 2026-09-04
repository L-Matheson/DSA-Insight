import { computed, type Ref } from 'vue';
import { z, type ZodTypeAny, type ZodRawShape } from 'zod';

// ---------------------------------------------------------------------------
// Node shape
// ---------------------------------------------------------------------------
//
// `type` is intentionally an open string, not a fixed union — new node types
// can be introduced without touching this file. The only structural rules
// this module relies on:
//
//   - a node is a CONTAINER if it has `children`
//   - a container REPEATS (becomes an array at its own path) if it has a
//     truthy `path`
//   - a container FLATTENS (passthrough layout, e.g. a splitter) if it has
//     no `path` — its children merge into the current level
//   - anything else is a LEAF and gets a value via the field-schema registry
//
// This means "repeater" vs "splitter" are just conventional names for a
// path-bearing vs path-less container — nothing here checks for those
// strings specifically.



// ---------------------------------------------------------------------------
// Field schema registry (extensible, no hardcoded type list)
// ---------------------------------------------------------------------------

type FieldSchemaFactory = (node: TicketNode) => ZodTypeAny;

const fieldSchemaRegistry = new Map<string, FieldSchemaFactory>();

/** Register exact-match handling for a given `type`. Overrides the default fallback. */
export function registerFieldType(type: string, factory: FieldSchemaFactory): void {
  fieldSchemaRegistry.set(type, factory);
}

function resolveLeafSchema(node: TicketNode): ZodTypeAny {
  const registered = fieldSchemaRegistry.get(node.type);
  if (registered) return registered(node);

  const typeKey = node.type.toLowerCase();

  if (typeKey.includes('date')) {
    // Swap for z.string().datetime() if dates are stored as ISO strings
    // rather than coerced Date objects.
    return z.coerce.date();
  }

  if (typeKey.includes('number')) {
    // `option` is an example of type-specific metadata read generically —
    // no assumption is made that "number" types always have it.
    return node.option === 'Integer' ? z.number().int() : z.number();
  }

  // Default fallback for any unrecognized node type.
  return z.string();
}

function withRequired(schema: ZodTypeAny, required: boolean): ZodTypeAny {
  return required ? schema : schema.optional().nullable();
}

function assign(shape: ZodRawShape, path: string, schema: ZodTypeAny): void {
  if (path in shape) {
    console.warn(
      `[ticket-schema] Duplicate path "${path}" — a later field is overwriting an earlier one. ` +
      `Check for colliding paths, especially inside flattened (path-less) containers.`
    );
  }
  shape[path] = schema;
}

// ---------------------------------------------------------------------------
// Zod schema generation
// ---------------------------------------------------------------------------

/**
 * Recursively builds a Zod object schema from a ticket node map, matching
 * the ticket-response shape: { path: value, ..., repeaterPath: [{ path: value, ... }] }
 */
export function buildTicketSchema(nodes: TicketNodeMap): z.ZodObject<ZodRawShape> {
  const shape: ZodRawShape = {};

  for (const node of Object.values(nodes)) {
    const isContainer = node.children !== undefined;

    if (isContainer && !node.path) {
      // Flattening/layout container (e.g. a splitter): no data path of its
      // own, children merge into the current level.
      const childShape = buildTicketSchema(node.children!).shape;
      for (const [path, schema] of Object.entries(childShape)) {
        assign(shape, path, schema);
      }
      continue;
    }

    if (isContainer && node.path) {
      // Repeating container: array of records shaped by its children.
      const entrySchema = buildTicketSchema(node.children!);
      let arraySchema: ZodTypeAny = z.array(entrySchema);

      if (node.required) {
        const min = node.minEntries ?? 1;
        arraySchema = (arraySchema as z.ZodArray<z.ZodTypeAny>).min(
          min,
          `${node.displayName} requires at least ${min} ${min === 1 ? 'entry' : 'entries'}`
        );
      }

      assign(shape, node.path, withRequired(arraySchema, node.required));
      continue;
    }

    // Leaf node.
    if (!node.path) {
      console.warn(`[ticket-schema] Leaf node "${node.displayName}" has no path — skipping.`);
      continue;
    }
    assign(shape, node.path, withRequired(resolveLeafSchema(node), node.required));
  }

  return z.object(shape);
}

// ---------------------------------------------------------------------------
// Schema caching (for frozen/finalized blueprints)
// ---------------------------------------------------------------------------

// Keyed by the root TicketNodeMap object reference. Only useful once a
// blueprint is finalized and reused as-is (e.g. validating many ticket
// submissions against the same static blueprint) — while a blueprint is
// still being edited in the builder UI, call buildTicketSchema directly
// so you always get a fresh schema.
const schemaCache = new WeakMap<TicketNodeMap, z.ZodObject<ZodRawShape>>();

export function getCachedTicketSchema(nodes: TicketNodeMap): z.ZodObject<ZodRawShape> {
  let schema = schemaCache.get(nodes);
  if (!schema) {
    schema = buildTicketSchema(nodes);
    schemaCache.set(nodes, schema);
  }
  return schema;
}

// ---------------------------------------------------------------------------
// Payload validation
// ---------------------------------------------------------------------------

export type TicketValidationResult =
  | { success: true; data: Record<string, unknown> }
  | { success: false; errors: z.ZodFormattedError<Record<string, unknown>> };

/**
 * Validates a submitted ticket payload against the blueprint's derived
 * schema: required nodes must be present, every value must match its
 * node's type (including inside arbitrarily nested repeaters), and
 * required repeaters must meet their minEntries count.
 *
 * Uses the cached schema — pass the same blueprint object reference each
 * time (e.g. the finalized blueprint loaded once per ticket type) to get
 * the caching benefit.
 */
export function validateTicketPayload(nodes: TicketNodeMap, payload: unknown): TicketValidationResult {
  const schema = getCachedTicketSchema(nodes);
  const result = schema.safeParse(payload);
  if (result.success) {
    return { success: true, data: result.data as Record<string, unknown> };
  }
  return { success: false, errors: result.error.format() as z.ZodFormattedError<Record<string, unknown>> };
}

// ---------------------------------------------------------------------------
// Blueprint authoring validation
// ---------------------------------------------------------------------------

/**
 * Walks the blueprint (not ticket data) looking for authoring-time issues —
 * currently: a required repeating container that hasn't had its minEntries
 * set yet. Wire this into the builder UI to block saving/finalizing until
 * it returns an empty array.
 */
export function getBlueprintIssues(nodes: TicketNodeMap): string[] {
  const issues: string[] = [];

  for (const node of Object.values(nodes)) {
    const isContainer = node.children !== undefined;
    const isRepeating = isContainer && !!node.path;

    if (isRepeating && node.required && (!node.minEntries || node.minEntries < 1)) {
      issues.push(
        `"${node.displayName}" is a required repeater but has no minEntries set.`
      );
    }

    if (isContainer) {
      issues.push(...getBlueprintIssues(node.children!));
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Vue composable usage
// ---------------------------------------------------------------------------

/**
 *   const rootNodes = ref<TicketNodeMap>(...);        // still being edited in the builder
 *   const ticketSchema = useTicketSchema(rootNodes);   // recomputes on every tree edit, for live preview
 *
 * Once the blueprint is finalized (ref stops changing, or you've persisted
 * and reloaded it as a plain object), prefer `validateTicketPayload` /
 * `getCachedTicketSchema` directly on that static object rather than this
 * computed — no need to keep re-deriving a schema that can no longer change.
 */
export function useTicketSchema(rootNodes: Ref<TicketNodeMap>) {
  return computed(() => buildTicketSchema(rootNodes.value));
}
