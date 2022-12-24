export const data = {
  title: 'Icons',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/icons.html'
}

export function render() {
  return /* markdown */`
The icon component provides a flexible way to render SVG based icon. Icon SVGs sourced from [Clarity](https://storybook.core.clarity.design).
BlueprintUI Icons can be used standalone of other BlueprintUI components and utilities.

## Installation

\`\`\`shell
npm install @blueprintui/icons
\`\`\`

## Usage

\`\`\`javascript
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/user.js';
\`\`\`

\`\`\`html
<bp-icon shape="user"></bp-icon>
\`\`\`

<br />

<style>
  #icons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  #icons bp-button-icon {
    --icon-width: 24px;
    --icon-height: 24px;
  }

  #icons bp-button-icon:hover {
    transform: scale(1.5);
  }
</style>

<div bp-layout="block gap:sm">
  <bp-search aria-label="search icons" placeholder="search"></bp-search>
  <div id="icons"></div>
</div>

<template id="modal-template">
  <h2 bp-text="section" slot="header"></h2>
  <div bp-layout="block gap:md">
    <bp-icon></bp-icon>
    <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span></code></pre>
    <div bp-layout="inline gap:sm">
      <bp-icon size="sm"></bp-icon>
      <bp-icon size="md"></bp-icon>
      <bp-icon size="lg"></bp-icon>
    </div>
<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sm<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>md<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lg<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span></code></pre>
    <div bp-layout="inline gap:sm">
      <bp-icon badge="accent"></bp-icon>
      <bp-icon badge="success"></bp-icon>
      <bp-icon badge="warning"></bp-icon>
      <bp-icon badge="danger"></bp-icon>
    </div>
    <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">badge</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accent<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">badge</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>success<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">badge</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>warning<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">badge</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>danger<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span></code></pre>
  </div>
</template>

<script type="module">
  import { shapes } from '@blueprintui/icons/shapes/shapes.js';
  import '@blueprintui/icons/shapes/all.js';
  import '@blueprintui/components/include/button-icon.js';
  import '@blueprintui/components/include/dialog.js';
  import '@blueprintui/components/include/search.js';

  const icons = shapes.map(shape => {
    const btn = document.createElement('bp-button-icon');
    btn.shape = shape;
    return btn;
  });

  const search = document.querySelector('bp-search');
  search.addEventListener('input', () => {
    if (search.value) {
      iconContainer.innerHTML = '';
      iconContainer.append(...icons.filter(i => i.shape.includes(search.value)));
    } else {
      iconContainer.append(...icons);
    }
  });

  const iconContainer = document.querySelector('#icons');
  iconContainer.append(...icons);
  iconContainer.addEventListener('click', event => {
    const shape = event.target.shape;
    const dialog = document.createElement('bp-dialog');
    dialog.closable = true;
    dialog.modal = true;
    dialog.size = 'lg';

    const template = document.createElement('template');
    template.innerHTML = document.querySelector('#modal-template').innerHTML.replaceAll('user', shape);
    const content = template.content.cloneNode(true);
    content.querySelector('h2').textContent = shape;
    content.querySelectorAll('bp-icon').forEach(i => i.setAttribute('shape', shape));
    dialog.append(content);
    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    document.body.appendChild(dialog);
  });
</script>
  `;
}
