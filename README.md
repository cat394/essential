# HTML Template Tag Function

This module provides an html template tag function that allows you to safely handle dynamic values in your HTML templates. You can choose to escape dangerous markup when necessary to prevent potential security risks like XSS attacks.

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