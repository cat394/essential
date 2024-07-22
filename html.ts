import { escape } from "@std/html";

export function escapeDangerousMarkup(markup: unknown) {
  return escape(String(markup));
}

export function html(staticParts: readonly string[], ...dynamicParts: unknown[]): string {

  return String.raw( { raw: staticParts }, ...dynamicParts);
}