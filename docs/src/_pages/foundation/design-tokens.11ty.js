import { tokensTable } from '../../_examples/tokens.examples.js';

export const data = {
  title: 'Themes',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/themes.html',
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/themes',
    version: '2.0.0'
  }
}

export function render() {
  return /* markdown */`

Design tokens enable easy theming for all BlueprintUI components. The base theme and additional built in themes are defined in the \`@blueprintui/themes\` package.
BlueprintUI Themes can be used standalone of other BlueprintUI components and utilities.

## Installation

\`\`\`shell
npm install @blueprintui/themes
\`\`\`


\`\`\`css
@import '@blueprintui/themes/index.min.css'; // light
@import '@blueprintui/themes/dark/index.min.css'; // dark
@import '@blueprintui/themes/compact/index.min.css'; // compact
\`\`\`

To enable the tokens and addon themes add the \`bp-theme\` attribute to the root HTML element.

\`\`\`html
<html bp-theme="">
\`\`\`

<style>
  .color {
    width: 100%;
    max-width: 125px;
    height: 80px;
    border-radius: var(--bp-object-border-radius-100);
    box-shadow: var(--bp-object-shadow-300);
  }

  .box {
    min-height: 20px;
    background: var(--bp-layer-background-200);
  }
</style>

## Color
${tokensTable('bp-color')}

## Status
${tokensTable('bp-status')}

## Object
${tokensTable('bp-object')}

## Layer
${tokensTable('bp-layer')}

## Interaction
${tokensTable('bp-interaction')}

## Scale
${tokensTable('bp-scale')}

## Text
${tokensTable('bp-text')}

## Layout
${tokensTable('bp-layout')}

## Size
${tokensTable('bp-size')}

## Space
${tokensTable('bp-space')}

<bp-toast id="copy-toast" status="success">Copied to clipboard</bp-toast>

<script type="module">
  import '@blueprintui/components/include/button-icon.js';
  import '@blueprintui/components/include/toast.js';
  import '@blueprintui/grid/include/core.js';
  import '@blueprintui/icons/shapes/copy.js';

  const toast = document.querySelector('#copy-toast');
  document.querySelector('article').addEventListener('click', async (e) => {
    if (e.target.tagName === 'BP-BUTTON-ICON' && e.target.shape === 'copy') {
      const cell = e.target.closest('bp-grid-row')?.querySelector('bp-grid-cell:nth-child(2)');
      if (cell) {
        navigator.clipboard.writeText(cell.textContent);
        toast.showPopover();
        setTimeout(() => toast.hidePopover(), 2000);
      }
    }
  });
</script>
  `;
}