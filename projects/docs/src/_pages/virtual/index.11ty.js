export const data = {
  title: '@blueprintui/virtual',
  description: 'Zero-dependency virtual scrolling Web Component.',
  layout: 'single-page.11ty.js',
  templateEngineOverride: '11ty.js,md',
  permalink: 'virtual.html',
  image: 'https://blueprintui.dev/assets/images/virtual.png'
}

export function render(data) {
  return /* markdown */`
<style>
  :root {
    --virtual-list-color: hsl(160, 35%, 45%);
    scrollbar-width: var(--bp-scrollbar-width, auto);
    scrollbar-color: var(--bp-scrollbar-color, auto);
  }

  main {
    margin: 0 auto;
    max-width: 1220px;
    padding: 48px 24px 96px 24px;
  }

  footer {
    padding: 12px;
    background: var(--virtual-list-color);
  }

  footer bp-divider {
    --background: #fff;
  }

  footer a {
    text-decoration: none;
  }

  .demos bp-virtual-list {
    border: var(--bp-object-border-width-100) solid var(--bp-object-border-color-200);
    border-radius: 4px;
  }

  .demos .item {
    padding: 12px 16px;
    border-bottom: var(--bp-object-border-width-100) solid var(--bp-object-border-color-200);
  }

  .scroll-info {
    font-family: monospace;
    padding: 8px;
    background: hsl(160, 20%, 95%);
    border-radius: 4px;
    margin-bottom: 12px;
  }

  bp-button {
    --color: var(--virtual-list-color);
    --border: 1px solid var(--virtual-list-color);
  }
</style>
<main bp-layout="block gap:lg">
  <div bp-layout="block inline:center gap:sm">
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="18.5 33.5 63 33"><defs><linearGradient id="a" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:#dbdbdb;stop-opacity:1"/><stop offset="100%" style="stop-color:#53ac8e;stop-opacity:1"/></linearGradient></defs><path fill="none" stroke="url(#a)" stroke-width="3" d="M28 35h44q8 0 8 8v14q0 8-8 8H55q-3 0-5-2-2 2-5 2H28q-8 0-8-8V43q0-8 8-8Z"/><circle cx="35" cy="50" r="8" fill="none" stroke="url(#a)" stroke-width="2.5"/><circle cx="65" cy="50" r="8" fill="none" stroke="url(#a)" stroke-width="2.5"/><path stroke="url(#a)" stroke-width="2.5" d="M43 50h14"/></svg>
    <h1 bp-text="heading center" style="--font-size: 72px; font-weight: 200;">Virtual</h1>
    <h1 bp-text="section center" bp-layout="m-t:sm">Zero-dependency virtual scrolling Web Component.</h1>
    <div style="width: 380px; align-self: center; margin-top: 12px">

  \`\`\`bash
  npm install @blueprintui\/virtual
  \`\`\`
  </div>

  <div bp-layout="inline gap:xs inline:center m-t:xs">
    <bp-button action="secondary" style="--color: hsl(160, 50%, 60%)">
      <a href="https://github.com/blueprintui/blueprintui/tree/main/projects/virtual">GitHub <svg width="12" height="12" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"></path></svg></a>
    </bp-button>
    <bp-button action="secondary" style="--color: hsl(160, 50%, 60%)">
      <a href="https://stackblitz.com/edit/blueprintui-virtual">Stackblitz</a>
    </bp-button>
    <bp-button action="secondary" style="--color: hsl(160, 50%, 60%)">
      <a href="https://www.npmjs.com/package/@blueprintui/virtual">NPM</a>
    </bp-button>
  </div>
</div>

## Basic Usage

Render thousands of items with only the visible ones in the DOM. The component emits \`bp-virtual-change\` events when the visible range changes, allowing you to render only what's needed.

<div bp-layout="grid gap:md cols:12 cols:6@md" class="demos">

<div bp-layout="block gap:sm">

\`\`\`html
<bp-virtual-list
  id="demo-list"
  height="300px"
  item-height="44"
  item-count="10000"></bp-virtual-list>
\`\`\`

\`\`\`javascript
import 'https://cdn.jsdelivr.net/npm/@blueprintui/virtual@1.0.0/include/virtual-list.js/+esm';

const list = document.querySelector('bp-virtual-list');
const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

list.addEventListener('bp-virtual-change', event => {
  list.innerHTML = data.slice(event.detail.start, event.detail.end)
    .map(item => '<div>' + item.name + '</div>')
    .join('');
});
\`\`\`

</div>

<bp-virtual-list id="demo-basic" height="300px" item-height="44" item-count="10000">
</bp-virtual-list>

</div>

## Commands

Control scroll position with HTML invoker commands.

<div bp-layout="grid gap:md cols:12 cols:6@md" class="demos">

\`\`\`javascript
<button commandfor="demo-command" command="--scroll-to-index" value="500">Scroll to 500</button>
<button commandfor="demo-command" command="--scroll-to-index" value="0">Scroll to First</button>
<button commandfor="demo-command" command="--scroll-to-index" value="10000">Scroll to Last</button>

<bp-virtual-list id="demo-command" height="250px" item-height="44" item-count="10000"></bp-virtual-list>
\`\`\`

<div bp-layout="block gap:xs">
  <div bp-layout="inline gap:xs">
    <bp-button commandfor="demo-command" command="--scroll-to-index" value="500" action="secondary">Scroll to 500</bp-button>
    <bp-button commandfor="demo-command" command="--scroll-to-index" value="0" action="secondary">Scroll to First</bp-button>
    <bp-button commandfor="demo-command" command="--scroll-to-index" value="10000" action="secondary">Scroll to Last</bp-button>
  </div>
  <bp-virtual-list id="demo-command" height="250px" item-height="44" item-count="10000"></bp-virtual-list>
</div>

</div>


## Scroll Events

The \`bp-virtual-scroll\` event provides scroll position and direction, useful for implementing infinite scroll or scroll-based UI updates.

<div bp-layout="grid gap:md cols:12 cols:6@md" class="demos">

\`\`\`javascript
list.addEventListener('bp-virtual-scroll', ({ detail }) => {
  console.log('Position:', detail.scrollTop);
  console.log('Direction:', detail.direction); // 'up', 'down', or 'idle'
});
\`\`\`

<div bp-layout="block gap:xs">
  <pre id="scroll-info" bp-text="code">Scroll position: 0, Direction: idle</pre>
  <bp-virtual-list id="demo-events" height="250px" item-height="44" item-count="10000">
  </bp-virtual-list>
</div>

</div>


## Scroll To Index

Use the \`scrollToIndex()\` method to programmatically scroll to any item in the list. Supports both instant and smooth scrolling.

<div bp-layout="grid gap:md cols:12 cols:6@md block:center" class="demos">

\`\`\`javascript
// Instant jump to item 500
list.scrollToIndex(500);

// Smooth scroll to item 500
list.scrollToIndex(500, 'smooth');

// Back to top
list.scrollToIndex(0, 'smooth');
\`\`\`

<div bp-layout="block gap:xs">
  <div bp-layout="inline gap:xs">
    <bp-button action="secondary" size="sm" id="btn-jump">Jump to 500</bp-button>
    <bp-button action="secondary" size="sm" id="btn-smooth">Smooth to 500</bp-button>
    <bp-button action="secondary" size="sm" id="btn-top">Back to top</bp-button>
  </div>
  <bp-virtual-list id="demo-scroll" height="250px" item-height="44" item-count="10000"></bp-virtual-list>
</div>

</div>


## API

### Properties / Attributes

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| \`itemHeight\` | \`item-height\` | \`number\` | \`44\` | Fixed height per item in pixels |
| \`itemCount\` | \`item-count\` | \`number\` | \`0\` | Total items in dataset |
| \`itemBuffer\` | \`item-buffer\` | \`number\` | \`1\` | Buffer items outside viewport |
| \`height\` | \`height\` | \`string\` | \`'auto'\` | Container height (CSS value) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| \`bp-virtual-change\` | \`{ start, end, count }\` | Visible range updated |
| \`bp-virtual-scroll\` | \`{ scrollTop, direction }\` | Scroll position changed |

### Commands

| Command | Description |
|--------|-------------|
| \`--scroll-to-index\` | Scroll to item at index based on the value of the source button issuing the command |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| \`scrollToIndex\` | \`(index, behavior?) => void\` | Scroll to item at index |
| \`refresh\` | \`() => void\` | Force recalculation of visible range |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| \`--height\` | \`auto\` | Container height |
| \`--width\` | \`100%\` | Container width |
| \`--scrollbar-width\` | \`auto\` | Scrollbar width |
| \`--scrollbar-color\` | \`auto\` | Scrollbar color |

</main>
<footer bp-layout="inline gap:sm inline:center">
  <a bp-text="link" href="https://blueprintui.dev">BlueprintUI</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://github.com/blueprintui/blueprintui/tree/main/projects/virtual">GitHub</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://www.npmjs.com/package/@blueprintui/virtual">NPM</a>
</footer>

<script type="module">
  import '@blueprintui/components/include/divider.js';
  import '@blueprintui/components/include/button.js';
  import '@blueprintui/virtual/include/virtual-list.js';

  const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

  function renderItems(list, start, end) {
    list.innerHTML = data.slice(start, end)
      .map(item => '<div class="item">' + item.name + '</div>')
      .join('');
  }

  // Basic demo
  const basicList = document.querySelector('#demo-basic');
  basicList.addEventListener('bp-virtual-change', ({ detail: { start, end } }) => {
    renderItems(basicList, start, end);
  });

  // Commands demo
  const commandsList = document.querySelector('#demo-command');
  commandsList.addEventListener('bp-virtual-change', ({ detail: { start, end } }) => {
    renderItems(commandsList, start, end);
  });

  // Scroll to index demo
  const scrollList = document.querySelector('#demo-scroll');
  scrollList.addEventListener('bp-virtual-change', ({ detail: { start, end } }) => {
    renderItems(scrollList, start, end);
  });

  document.querySelector('#btn-jump').addEventListener('click', () => {
    scrollList.scrollToIndex(500);
  });
  document.querySelector('#btn-smooth').addEventListener('click', () => {
    scrollList.scrollToIndex(500, 'smooth');
  });
  document.querySelector('#btn-top').addEventListener('click', () => {
    scrollList.scrollToIndex(0, 'smooth');
  });

  // Events demo
  const eventsList = document.querySelector('#demo-events');
  const scrollInfo = document.querySelector('#scroll-info');
  eventsList.addEventListener('bp-virtual-change', ({ detail: { start, end } }) => {
    renderItems(eventsList, start, end);
  });
  eventsList.addEventListener('bp-virtual-scroll', ({ detail }) => {
    scrollInfo.textContent = 'Scroll position: ' + Math.round(detail.scrollTop) + ', Direction: ' + detail.direction;
  });
</script>
  `
}
