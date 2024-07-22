# HTML Template Tag Function

This function uses JavaScript tag functions to insert dynamic JavaScript values into HTML markup.

> ⚠️ WARNING: This **accepts** dangerous markup from the user by default. If you are inserting user input, use the `escapeDangerousMarkup` function.

## Usage

```ts
import { html, escapeDangerousMarkup } from "@kokomi/essential";

const primaryBtn = (text: string) => html`<button class="primary">${text}</button>`;

primaryBtn('Hello world!'); // => <button class="primary">Hello world</button>

primaryBtn(10) // => <button class="primary">10</button>

primaryBtn(false) // => <button class="primary">false</button>

primaryBtn(undefined) // => <button class="primary">undefined</button>

primaryBtn('<script src="inject.js"></script>') // ❗Beware of XSS attacks!
// => <button class="primary"><script src="inject.js"></script></button>

// Manually avoid risky markup
primaryBtn(escapeDangerousMarkup('<script src="inject.js"></script>')) // 👍XSS was avoided
// => <button class="primary">&lt;script src=&quot;inject.js&quot;&gt;&lt;/script&gt;</button>
```

## Licence

MIT