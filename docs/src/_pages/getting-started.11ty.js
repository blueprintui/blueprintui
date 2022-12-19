export var data = {
  title: 'Getting Started',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'getting-started.html',
}

export function render() {
  return /* markdown */`
## Installation

Blueprint UI components are built as Web Components. This enables them to work in a
variety of frameworks and libraries. Blueprint UI is split into several packages
that can be used independently. To use components its install the following,

\`\`\`bash
npm install @blueprintui/components

npm install @blueprintui/layout @blueprintui/typography // optional utilities
\`\`\`

## CSS

To use components the base theme CSS file must be loaded into the page. This can be done via a CSS import or HTML link.

\`\`\`css
@import '@blueprintui/themes/index.min.css'
\`\`\`

or

\`\`\`html
<link rel="stylesheet" href="@blueprintui/themes/index.min.css">
\`\`\`

## JavaScript

Once the tokens CSS is loaded components can be imported via JavaScript imports.

\`\`\`javascript
import '@blueprintui/components/include/alert.js';
\`\`\`


## HTML

\`\`\`html
<bp-alert status="success">hello there!</bp-alert>
\`\`\`

<div><bp-alert status="success">hello there!</bp-alert></div>

## CDN

Blueprint UI Components can be used via CDNs for fast and easy prototyping.

\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/@blueprintui/themes/index.min.css">

<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/components/include/alert.js/+esm';
</script>
\`\`\`

<div bp-layout="inline gap:sm inline:center m-b:lg">
  <bp-button action="outline" status="accent">
    <a href="https://stackblitz.com/edit/blueprintui-cdn" target="_blank">CDN Demo</a>
  </bp-button>

  <bp-button action="outline" status="accent">
    <a href="/docs/foundation/design-tokens.html">Design Tokens</a> <bp-icon shape="arrow" direction="right" size="sm"></bp-icon>
  </bp-button>
</div>
  `;
}
