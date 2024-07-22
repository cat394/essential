import { escape } from "@std/html";

/**
 * Escapes dangerous markup to prevent XSS attacks.
 * @param {unknown} markup - The markup to be escaped.
 * @returns {string} - The escaped markup.
 */
export function escapeDangerousMarkup(markup: unknown): string {
  return escape(String(markup));
}

/**
 * A template tag function that creates a string from template literals, allowing dynamic values to be safely included.
 * @param {readonly string[]} staticParts - An array of static strings from the template literal.
 * @param {unknown[]} dynamicParts - An array of dynamic values to be included in the template.
 * @returns {string} - The combined string with dynamic values included.
 */
export function html(
  staticParts: readonly string[],
  ...dynamicParts: unknown[]
): string {
  return staticParts.reduce((acc, part, i) => {
    const dynamicPart = dynamicParts[i - 1];
    return acc + (dynamicPart !== undefined ? String(dynamicPart) : "") + part;
  });
}
