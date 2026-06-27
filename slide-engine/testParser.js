import { parseAutoSlideText } from './src/utils/slideParser.js';
const md = `---
[VocabularyList]
title: Listen and repeat
words:

* word: bike to school | translation: dap xe | image_url: [https://img.com](https://google.com)
* word: sail | translation: cheo thuyen | image_url: [https://img.com](https://google.com)`;
console.log(JSON.stringify(parseAutoSlideText(md), null, 2));
