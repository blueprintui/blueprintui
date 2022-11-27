import { tokensTable, space, size, status, textColor, borderColor, opacity, color } from '../../_examples/tokens.examples.js';

export const data = {
  title: 'Design Tokens',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/design-tokens.html',
}

export function render() {
  return /* markdown */`

Design tokens enable easy theming for all BlueprintUI components. The base theme and additional built in themes are defined in the \`@blueprintui/themes\` package.

\`\`\`css
@import '@blueprintui/themes/index.min.css'; // base light theme
@import '@blueprintui/themes/dark/index.min.css'; // dark theme
@import '@blueprintui/themes/compact/index.min.css'; // compact theme
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
    background: var(--bp-layer-container-background);
  }
</style>

## Color
${tokensTable('bp-color')}

## Border
${tokensTable('bp-border')}

## Object
${tokensTable('bp-object')}

## Layer
${tokensTable('bp-layer')}

## Text
${tokensTable('bp-text')}

## Status
${tokensTable('bp-status')}

## Size
${tokensTable('bp-size')}

## Space
${tokensTable('bp-space')}

## All Tokens
${tokensTable()}
  `;
}