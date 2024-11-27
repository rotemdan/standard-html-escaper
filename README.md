# Standards-compliant HTML escaper and unescaper

Fully [standards-compliant](https://developer.mozilla.org/en-US/docs/Glossary/Character_reference) HTML escape and unescape methods.

* Escapes a minimal set of characters, essential for successful HTML parsing
* Unescapes all [2230 possible named entities](https://html.spec.whatwg.org/entities.json), decimal and hexadecimal code patterns
* Forgiving by default. Will skip invalid escape patterns when unescaping. Optional *strict mode* will error when an invalid escape code is encountered
* No dependencies

## Installation

```sh
npm install standard-html-escaper
```

## Usage
```ts
import { escapeHtml, unescapeHtml } from 'standard-html-escaper'

const escapedText = escapeHtml(myText)
const unescapedText = unescapeHtml(escapedText)
```
## Methods

### `escapeHtml(text: string)`

Escapes a string.

Encodes the minimal required set of HTML special characters to their escape codes:

* `&`: `&amp;`
* `<`: `&lt;`
* `>`: `&gt;`
* `'`: `&#39;`
* `"`: `&quot;`

Using this minimal set of characters is generally recommended, since not all decoders handle less common escape codes correctly.

`&#39;` is commonly used instead of the equivalent named entity `&apos;`, to ensure compatibility with the widest range of `unescape` implementations.

### `unescapeHtml(text: string, options)`

Unescapes a string.

Handles all escape patterns specified in the standard:

* All 2230 possible named entities, like `&lt;`, `&angle;` or `&rightleftharpoons;`
* Decimal encoded codepoints, like `&#12;`, `&#9132;` `&#153412;`
* Hexadecimal encoded codepoints, like `&#x9a;`, `&#Xb915f;` or `&#XE523A6;`

`options`:
* `strict`: error when an invalid escape code is encountered. Otherwise ignores invalid escape patterns. Defaults to `false`

## Other exports

### `htmlEntitiesTable`

The full [WHATWG HTML entities table](https://html.spec.whatwg.org/entities.json), as a JavaScript object. Contains all named entities and their decoded values, both as strings and sequences of integer codepoints.

## License

MIT
