import { assertEquals, assertNotEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { escapeDangerousMarkup, html } from "./mod.ts";

describe("html function test", () => {
  it("dynamic safe string value is set", () => {
    const value = "Hello";

    const test = html`<h1>${value}</h1>`;

    assertEquals(test, "<h1>Hello</h1>");
  });

  it("dynamic number value is set", () => {
    const value = 1 + 1;

    const test = html`<h1>${value}</h1>`;

    assertEquals(test, "<h1>2</h1>");
  });

  it("dynamic object value is set", () => {
    const value = { prop: "hi" };

    const test = html`<h1>${value}</h1>`;

    assertEquals(test, "<h1>[object Object]</h1>");
  });

  it("accepts external markup", () => {
    const value = '<script src="inject.js"></script>';

    const test = html`<h1>${value}</h1>`;

    assertEquals(test, '<h1><script src="inject.js"></script></h1>');
  });

  it("avoid dangerous markup with the escapeDangerousMarkup function", () => {
    const value = '<script src="inject.js"></script>';

    const test = html`<h1>${escapeDangerousMarkup(value)}</h1>`;

    assertNotEquals(test, '<h1><script src="inject.js"></script></h1>');

    assertEquals(
      test,
      "<h1>&lt;script src=&quot;inject.js&quot;&gt;&lt;/script&gt;</h1>",
    );
  });

  it("empty string value is set", () => {
    const value = "";

    const test = html`<h1>${value}</h1>`;

    assertEquals(test, "<h1></h1>");
  });

  it("multiple values are set", () => {
    const value1 = "Hello";
    const value2 = "<world>";

    const test = html`<h1>${value1}, ${value2}!</h1>`;

    assertEquals(test, "<h1>Hello, <world>!</h1>");
  });

  it("null value is set", () => {
    const value = null;

    const test = html`<h1>${value}</h1>`;

    assertEquals(test, "<h1>null</h1>");
  });

  it("undefined value is set", () => {
    const value = undefined;

    const test = html`<h1>${value}</h1>`;

    assertEquals(test, "<h1>undefined</h1>");
  });

  it("the dynamically inserted values​ are an array of strings, they are concatenated", () => {
    const list = ["Alice", "Bob", "Cameron"];

    const test = html`<ul>${list.map((item) => html`<li>${item}</li>`)}</ul>`;

    assertEquals(test, "<ul><li>Alice</li><li>Bob</li><li>Cameron</li></ul>");
  });

  it("the elements of the array are not strings, all elements are forcibly converted to strings and then each element is concatenated", () => {
    const list = [1, false, undefined, { key: "value" }, () => ""];

    const test = html`<ul>${list.map((item) => html`<li>${item}</li>`)}</ul>`;

    assertEquals(
      test,
      "<ul><li>1</li><li>false</li><li>undefined</li><li>[object Object]</li><li>()=>''</li></ul>",
    );
  });
});
