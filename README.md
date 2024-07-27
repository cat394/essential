# HTML Template Tag Function

> This package will now be maintained as a new package called
> [@kokomi/lamp](https://jsr.io/@kokomi/lamp@1.0.0). If you use this package in
> the future, please use that package.

This function uses JavaScript tag functions to insert dynamic JavaScript values
into HTML markup.

> ⚠️ WARNING: This **accepts** dangerous markup from the user by default. If you
> are inserting user input, use the `escapeDangerousMarkup` function.

## Usage

```ts
import { escapeDangerousMarkup, html } from "@kokomi/essential";

const primaryBtn = (text: string) =>
  html`<button class="primary">${text}</button>`;

primaryBtn("Hello world!"); // => <button class="primary">Hello world</button>

primaryBtn(10); // => <button class="primary">10</button>

primaryBtn(false); // => <button class="primary">false</button>

primaryBtn(undefined); // => <button class="primary">undefined</button>

primaryBtn('<script src="inject.js"></script>'); // ❗Beware of XSS attacks!
// => <button class="primary"><script src="inject.js"></script></button>

// Manually avoid risky markup
primaryBtn(escapeDangerousMarkup('<script src="inject.js"></script>')); // 👍XSS was avoided
// => <button class="primary">&lt;script src=&quot;inject.js&quot;&gt;&lt;/script&gt;</button>
```

## Exception

Starting with _version 3_, if the dynamic values ​​passed to the html function are
arrays, we will combine them.

```ts
const names = ["Alice", "Bob", "Cameron"];

const list = html`<ul>${names.map((name) => html`<li>${name}</li>`)}</ul>`;
// => "<ul><li>Alice</li><li>Bob</li><li>Cameron</li></ul>"

const anyValueItems = [false, undefined, { key: "value" }, () => ""];

const list = html`<ul>${
  anyValueItems.map((item) => html`<li>${item}</li>`)
}</ul>`;
// => "<ul><li>false</li><li>undefined</li><li>[object Object]</li><li>()=>''</li></ul>"
```

## Licence

MIT
