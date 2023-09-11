export const data = {
  title: 'Icons',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/icons.html',
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/icons',
    version: '2.0.0'
  }
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
    margin: 0 auto;
    max-width: 1122px;
  }

  #icons bp-button-icon:hover {
    transform: scale(1.5);
  }
</style>

<div bp-layout="grid gap:md">
  <form id="filter-form" bp-layout="col:2">
    <bp-form-group layout="vertical">
      <bp-search aria-label="search icons" placeholder="search" name="search"></bp-search>
      <bp-fieldset layout="horizontal">
        <label>Solid</label>
        <bp-switch name="solid"></bp-switch>
      </bp-fieldset>
      <bp-fieldset>
        <label>Size</label>
        <label>sm</label>
        <bp-radio name="size" value="sm" checked></bp-radio>
        <label>md</label>
        <bp-radio name="size" value=""></bp-radio>
        <label>lg</label>
        <bp-radio name="size" value="lg"></bp-radio>
      </bp-fieldset>
      <bp-fieldset>
        <label>Badge</label>
        <label>none</label>
        <bp-radio name="badge" value="" checked></bp-radio>
        <label>accent</label>
        <bp-radio name="badge" value="accent"></bp-radio>
        <label>success</label>
        <bp-radio name="badge" value="success"></bp-radio>
        <label>warning</label>
        <bp-radio name="badge" value="warning"></bp-radio>
        <label>danger</label>
        <bp-radio name="badge" value="danger"></bp-radio>
      </bp-fieldset>
      <bp-fieldset>
        <label>Status</label>
        <label>none</label>
        <bp-radio name="status" value="" checked></bp-radio>
        <label>accent</label>
        <bp-radio name="status" value="accent"></bp-radio>
        <label>success</label>
        <bp-radio name="status" value="success"></bp-radio>
        <label>warning</label>
        <bp-radio name="status" value="warning"></bp-radio>
        <label>danger</label>
        <bp-radio name="status" value="danger"></bp-radio>
      </bp-fieldset>
    </bp-form-group>
  </form>
  <div id="icons" bp-layout="inline gap:md col:10"></div>
</div>

<template id="modal-template">
  <h2 bp-text="section" slot="header"></h2>
  <div bp-layout="block gap:md">
    <div bp-layout="inline gap:sm">
      <bp-icon></bp-icon>
      <bp-icon type="solid"></bp-icon>
    </div>
<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>solid<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span></code></pre>
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
  <div bp-layout="inline gap:sm">
    <bp-icon status="accent"></bp-icon>
    <bp-icon status="success"></bp-icon>
    <bp-icon status="warning"></bp-icon>
    <bp-icon status="danger"></bp-icon>
  </div>
  <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">status</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>accent<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">status</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>success<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">status</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>warning<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-icon</span> <span class="token attr-name">shape</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">status</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>danger<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-icon</span><span class="token punctuation">&gt;</span></span></code></pre>
    </div>
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
    btn.action = 'flat';
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

  const form = document.querySelector('#filter-form');
  form.addEventListener('change', (e) => {
    e.preventDefault();
    const { search, size, badge, solid, status } = Object.fromEntries(new FormData(form));
    console.log(status)
    icons.forEach(icon => {
      icon.shadowRoot.querySelector('bp-icon').size = size;
      icon.shadowRoot.querySelector('bp-icon').badge = badge ? badge : null;
      icon.shadowRoot.querySelector('bp-icon').status = status ? status : null;
      icon.shadowRoot.querySelector('bp-icon').type = solid ? 'solid' : '';
    });
  });

  const iconContainer = document.querySelector('#icons');
  iconContainer.append(...icons);
  iconContainer.addEventListener('click', event => {
    const shape = event.target.shape;
    const dialog = document.createElement('bp-dialog');
    dialog.closable = true;
    dialog.modal = true;
    dialog.size = 'lg';
    dialog.style.setProperty('--height', '770px');

    const template = document.createElement('template');
    template.innerHTML = document.querySelector('#modal-template').innerHTML.replaceAll('user', shape);
    const content = template.content.cloneNode(true);
    content.querySelector('h2').textContent = shape;
    content.querySelectorAll('bp-icon').forEach(i => i.setAttribute('shape', shape));
    dialog.append(content);
    dialog.addEventListener('close', () => setTimeout(() => dialog.remove(), 400), { once: true });
    document.body.appendChild(dialog);
    setTimeout(() => dialog.showPopover(), 0);
  });
</script>
  `;
}
