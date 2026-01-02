export var data ={
  title: '@blueprintui/crane',
  layout: 'single-page.11ty.js',
  templateEngineOverride: '11ty.js,md',
  permalink: 'crane.html',
  browserColor: '#aca653'
}

export function render(data) {
  return /* markdown */`
<style>
  main {
    margin: 0 auto;
    max-width: 1220px;
    padding: 48px 24px 96px 24px;
  }

  footer {
    padding: 12px;
    background: hsl(56, 35%, 50%);
  }

  footer bp-divider {
    --background: #2d2d2d;
  }

  footer a {
    color: #2d2d2d;
    text-decoration: none;
  }

  .demos bp-crane {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  bp-divider {
    margin: 12px 0;
  }

  bp-crane > *:not([draggable=false]):not(bp-button) {
    --background: hsl(56, 35%, 50%);
    background: var(--background);
    color: #2d2d2d;
    padding: 8px;
    min-height: 100px;
    border: 0;
    border-radius: 4px;
    padding: 24px;
    position: relative;
    display: flex;
    place-content: center;
    place-items: center;
  }

  [bp-crane*='target'] {
    position: relative;
  }

  [bp-crane*='target']:not([bp-crane*='active'])::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -5px;
    display: block;
    content: '';
    background: hsl(56, 80%, 65%);
    width: 2px;
  }

  bp-dropzone {
    display: block;
    border-radius: 4px;
    background: hsl(0deg 0% 100% / 0%) !important;
    outline-offset: -2px !important;
    outline: 2px solid hsl(56, 80%, 20%) !important;
  }

  bp-button-icon {
    --color: #2d2d2d;
  }

  [bp-crane='handle'] {
    position: absolute;
    top: 4px;
    right: 4px;
    --cursor: grab;
  }
</style>
<main bp-layout="block gap:lg">
  <div bp-layout="block inline:center gap:sm">
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.722 508.722">
      <linearGradient id="a" x1="256" x2="256" y1="496" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="hsl(56, 80%, 70%)" />
        <stop offset="0.8" stop-color="hsl(56, 10%, 70%)" />
        <stop offset="1" stop-color="hsl(56, 10%, 70%)" />
      </linearGradient>
      <path  fill="url(#a)" d="M494.405 329.374h-2.683v-16.607c0-7.625-6.204-13.829-13.829-13.829h-14.036l-60.567-60.567a7.628 7.628 0 0 0-.817-.697v-82.927h43.713a7.5 7.5 0 0 0 5.921-12.104l-30-38.581a7.501 7.501 0 0 0-5.921-2.896h-15.854L156.408 4.345a7.444 7.444 0 0 0-.729-.249c-.079-.023-.159-.038-.239-.058-.149-.037-.298-.076-.45-.104-.144-.027-.288-.044-.432-.062-.089-.011-.177-.026-.267-.034a7.12 7.12 0 0 0-.525-.025c-.05-.001-.099-.007-.15-.007H134.97a7.501 7.501 0 0 0-7.472 6.847l-7.908 90.514H68.981c-.247-9.688-8.188-17.498-17.935-17.498H17.958C8.056 83.668 0 91.724 0 101.626v53.734c0 9.902 8.056 17.958 17.958 17.958h33.088c9.902 0 17.958-8.056 17.958-17.958v-.612h47.59l-8.904 296.251h-6.843c-14.802 0-26.844 12.042-26.844 26.844v19.574a7.5 7.5 0 0 0 7.5 7.5h13.465a7.5 7.5 0 0 0 0-15h-5.965v-12.074c0-6.531 5.313-11.844 11.844-11.844H195.785c6.531 0 11.844 5.313 11.844 11.844v12.074h-82.662a7.5 7.5 0 0 0 0 15h90.162a7.5 7.5 0 0 0 7.5-7.5v-19.574c0-14.802-12.042-26.844-26.844-26.844H180.93l-8.904-296.251h41.476v37.407c0 10.718 8.72 19.438 19.438 19.438h57.543c10.718 0 19.438-8.72 19.438-19.438v-37.407h77.549v82.3a7.49 7.49 0 0 0-1.79 1.323l-60.567 60.567H310.05c-7.625 0-13.829 6.204-13.829 13.829v16.607h-6.983c-7.895 0-14.317 6.422-14.317 14.317v14.108c0 7.894 6.422 14.316 14.317 14.316h20.124a7.5 7.5 0 0 0 0-15h-19.441v-12.741h203.798v12.741H339.365a7.5 7.5 0 0 0 0 15h155.04c7.894 0 14.317-6.422 14.317-14.316v-14.108c0-7.894-6.423-14.317-14.317-14.317zM141.843 18.806h4.9l7.196 82.361h-19.292zM54.004 155.36a2.961 2.961 0 0 1-2.958 2.958H17.958A2.961 2.961 0 0 1 15 155.36v-53.734a2.961 2.961 0 0 1 2.958-2.958h33.088a2.961 2.961 0 0 1 2.958 2.958v45.622zm15-39.193h152a7.5 7.5 0 0 0 0-15h-52.009l-6.851-78.407 197.53 78.407h-108.67a7.5 7.5 0 0 0 0 15h147.849l.042.002.026-.002h13.595l18.336 23.581H69.003v-23.581zm60.801 98.358 22.634 16.387-24.128 33.326zm1.301 156.212 31.234-39.022 1.894 63.024zm2.323-87.99 26.346-36.39 1.704 56.712zm-6.098 14.106 27.66 20.039-29.365 36.685zm27.66 109.712-32.165 40.184 1.867-62.134zm-19.429-206.39 21.951-29.111 1.383 46.005zm15.466-45.427-20.233 26.834.806-26.834zm-12.39 296.25 26.3-32.856.987 32.856zm156.286-258.843a4.443 4.443 0 0 1-4.438 4.438h-57.543a4.443 4.443 0 0 1-4.438-4.438v-37.407h66.419zm147.72 106.783h-40.171v-40.171zm-55.171-41.143v41.144h-41.144zm-76.249 56.143h165.498v15.436H311.224z"/>
    </svg>
    <h1 bp-text="heading center" style="--font-size: 72px; font-weight: 200;">Crane</h1>
    <h1 bp-text="section center" bp-layout="m-t:sm">Simple and lightweight drag and drop components and utilities.</h1>
    <div style="width: 365px; align-self: center; margin-top: 12px">

  \`\`\`bash
  npm install @blueprintui\/crane
  \`\`\`
  </div>

  <bp-crane bp-layout="inline gap:xs inline:center m-t:xs">
    <bp-button action="secondary" style="--color: hsl(56, 70%, 70%)">
      <a href="https://github.com/blueprintui/blueprintui/tree/main/projects/crane">GitHub <svg width="12" height="12" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"></path></svg></a>
    </bp-button>
    <bp-button action="secondary" style="--color: hsl(56, 70%, 70%)">
      <a href="https://stackblitz.com/edit/blueprintui-crane">Stackblitz</a>
    </bp-button>
    <bp-button action="secondary" style="--color: hsl(56, 70%, 70%)">
      <a href="https://www.npmjs.com/package/@blueprintui/crane">NPM</a>
    </bp-button>
  </bp-crane>
</div>

## Drag and Drop Lists

<div bp-layout="grid gap:md cols:12 cols:6@md block:center" class="demos">

\`\`\`html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/crane@0.0.0/include/crane.js/+esm';

  document.querySelector('bp-crane').addEventListener('bp-crane-drop', e => {
    e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
  });
</script>
<bp-crane>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <bp-dropzone></bp-dropzone>
</bp-crane>
\`\`\`

<bp-crane class="demo">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <bp-dropzone></bp-dropzone>
</bp-crane>

</div>

## Multi List

<div bp-layout="grid gap:md cols:12 cols:6@md block:center" class="demos">
  <section>
    <bp-crane>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <bp-dropzone></bp-dropzone>
    </bp-crane>
    <bp-divider></bp-divider>
    <bp-crane>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <bp-dropzone></bp-dropzone>
    </bp-crane>
  </section>

\`\`\`html
<bp-crane>
  <button>1</button>
  <button>2</button>
  ...
</bp-crane>
<bp-divider></bp-divider>
<bp-crane>
  <button>5</button>
  <button>6</button>
  ...
</bp-crane>
\`\`\`

</div>

## Handles

<div bp-layout="grid gap:md cols:12 cols:6@md block:center" class="demos">

\`\`\`html
<bp-crane>
  <div>1 <button bp-crane="handle"></button></div>
  <div>2 <button bp-crane="handle"></button></div>
  <div>3 <button bp-crane="handle"></button></div>
  <div>4 <button bp-crane="handle"></button></div>
  <bp-dropzone></bp-dropzone>
</bp-crane>
\`\`\`

<bp-crane>
  <div>1 <bp-button-icon bp-crane="handle" shape="drag-handle" action="flat"></bp-button-icon></div>
  <div>2 <bp-button-icon bp-crane="handle" shape="drag-handle" action="flat"></bp-button-icon></div>
  <div>3 <bp-button-icon bp-crane="handle" shape="drag-handle" action="flat"></bp-button-icon></div>
  <div>4 <bp-button-icon bp-crane="handle" shape="drag-handle" action="flat"></bp-button-icon></div>
  <bp-dropzone></bp-dropzone>
</bp-crane>

</div>

</main>
<footer bp-layout="inline gap:sm inline:center">
  <a bp-text="link" href="https://blueprintui.dev">BlueprintUI</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://github.com/blueprintui/blueprintui/tree/main/projects/crane">GitHub</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://www.npmjs.com/package/@blueprintui/crane">NPM</a>
</footer>

<script type="module">
  import '@blueprintui/components/include/divider.js';
  import '@blueprintui/components/include/button.js';
  import '@blueprintui/components/include/button-icon.js';
  import '@blueprintui/icons/shapes/drag-handle.js';
  import '@blueprintui/crane/include/crane.js';

  document.querySelector('body').addEventListener('bp-crane-drop', e => {
    e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
  });
</script>
  `
}
