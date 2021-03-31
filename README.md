# Markdown Wikilinks Preview

**Note: Markdown Notes now has a better version of this, integrated into the extension itself. I would not recommend using this in combination with it.**

Allows wikilinks features within the VSCode markdown preview. 

Uses a [fork of a markdown-it plugin](https://github.com/thomaskoppelaar/markdown-it-wikilinks) ([original here](https://github.com/jsepia/markdown-it-wikilinks) In order to make linking markdown documents a bit more rewarding - The VSCode preview window now also shows wikilinks correctly.

***This is still in very early development. If anything goes wrong, submit an issue or a PR.***

## Features

- Enables highlighting of Wikilinks within the VSCode Markdown Preview. (Works with piped links as well!)
- Allows clicking on those links to go to the referenced file's preview.

## Limitations

- When clicking a link inside the preview, only the preview will update; The file won't open in your editor.

- Linking between files with different extensions (e.g. `.markdown` and `.md`) Will cause trouble.
  - Currently, this extension will append any link with a `.md` extension.

- File naming convention is very basic: `lowercase-filenames-without-spaces-or-periods` will work the best. Anything else is bandit territory.  

## Roadmap

- [X] User defined settings
  - [X] File type (`.markdown`, `.mdx`, etc.)

