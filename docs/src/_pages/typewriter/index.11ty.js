export const data ={
  title: '@blueprintui/typewriter',
  description: 'Simple and lightweight key navigation utilities and components.',
  layout: 'single-page.11ty.js',
  templateEngineOverride: '11ty.js,md',
  permalink: 'typewriter.html',
  image: 'https://blueprintui.dev/assets/images/typewriter.png'
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
    background: hsl(240, 35%, 50%);
  }

  footer bp-divider {
    --background: #fff;
  }

  footer a {
    text-decoration: none;
  }

  .demos bp-keynav {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  }

  .demos bp-keynav button {
    min-height: 100px;
  }

  .demos bp-keynav[layout='block'] {
    grid-template-columns: 1fr;
    justify-items: center;
    width: 100%;
  }

  .demos bp-keynav[layout='block'] button {
    min-height: 55px;
    width: 100%;
  }

  .demos bp-keynav button,
  .demos bp-keynav button {
    background: hsl(240, 35%, 50%);
    color: #fff;
    padding: 8px;
    border: 0;
    border-radius: 4px;
  }

  .demos bp-keynav button:focus,
  .demos bp-keynav button:focus {
    background: hsl(240, 80%, 95%);
    color: hsl(240, 80%, 50%);
    outline-offset: 2px;
    outline: 2px solid hsl(240, 80%, 65%);
  }

  .demos bp-keynav {
    display: grid;
    gap: 6px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .demos bp-keynav button {
    padding: 24px;
  }
</style>
<main bp-layout="block gap:lg">
  <div bp-layout="block inline:center gap:sm">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 512 512"><linearGradient id="a" x1="256" x2="256" y1="496" y2="16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="hsl(240, 80%, 70%)" /><stop offset="0.8" stop-color="hsl(240, 10%, 70%)" /><stop offset="1" stop-color="hsl(240, 10%, 70%)" /></linearGradient><path fill="url(#a)" d="M472 264h-10.511c-3.228-10.292-9.983-20.542-22.593-23.287l-2.548-15.289A39.875 39.875 0 0 0 396.892 192H376V64a8 8 0 0 0-2.343-5.657l-40-40A8 8 0 0 0 328 16H144a8 8 0 0 0-8 8v168h-20.892a39.875 39.875 0 0 0-39.456 33.424L73.1 240.713c-12.61 2.745-19.365 13-22.593 23.287H40a24.028 24.028 0 0 0-24 24v24a24.028 24.028 0 0 0 24 24h6.938L32.062 455.008h.006A7.9 7.9 0 0 0 32 456v16a24.028 24.028 0 0 0 24 24h400a24.028 24.028 0 0 0 24-24v-16a7.9 7.9 0 0 0-.068-.991h.006L465.062 336H472a24.028 24.028 0 0 0 24-24v-24a24.028 24.028 0 0 0-24-24zM336 43.313 348.687 56H336zM448 304v16h-16v-16zm-32 16h-64v-16h64zm-80 0h-32v-16h32zm-48-16v16h-64v-16zm59.736-48a49.7 49.7 0 0 1-10.026 10.832 67.137 67.137 0 0 1-9.71 6.538V256zM312.9 280a130.879 130.879 0 0 1-16.9 4.456V256h16v24zm-32.9 6.816c-5.485.567-10.868.9-16 1.058V256h16zm-32 1.058a224.467 224.467 0 0 1-16-1.058V256h16zm-32-3.418A130.879 130.879 0 0 1 199.1 280h.9v-24h16zm-32-11.086a67.137 67.137 0 0 1-9.71-6.538A49.7 49.7 0 0 1 164.264 256H184zM208 320h-32v-16h32zm-48 0H96v-16h64zm-80 0H64v-16h16zm368.938 16 14 112H49.062l14-112zm-3.547-69.5A43.422 43.422 0 0 1 448 280v8H334.645c19.691-10.639 27.876-24.065 31.163-32H432c4 0 9.744 1.088 13.391 10.5zm-48.5-58.5a23.922 23.922 0 0 1 23.672 20.055L422.556 240H376v-32zM152 32h168v32a8 8 0 0 0 8 8h32v168H152zm-36.892 176H136v32H89.444l1.992-11.945A23.922 23.922 0 0 1 115.108 208zm-48.5 58.5C70.256 257.088 76 256 80 256h66.192c3.287 7.935 11.472 21.361 31.163 32H64v-7.976a43.41 43.41 0 0 1 2.609-13.524zM32 312v-24a8.009 8.009 0 0 1 8-8h8v40h-8a8.009 8.009 0 0 1-8-8zm432 160a8.009 8.009 0 0 1-8 8H56a8.009 8.009 0 0 1-8-8v-8h416zm16-160a8.009 8.009 0 0 1-8 8h-8v-40h8a8.009 8.009 0 0 1 8 8zm-360 48a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zM88 392a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zM88 424a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zm32 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8zM184 56a8 8 0 0 1 8-8h112a8 8 0 0 1 0 16H192a8 8 0 0 1-8-8zm160 32a8 8 0 0 1-8 8H176a8 8 0 0 1 0-16h160a8 8 0 0 1 8 8zm0 32a8 8 0 0 1-8 8H176a8 8 0 0 1 0-16h160a8 8 0 0 1 8 8zm0 32a8 8 0 0 1-8 8H176a8 8 0 0 1 0-16h160a8 8 0 0 1 8 8zm0 32a8 8 0 0 1-8 8H176a8 8 0 0 1 0-16h160a8 8 0 0 1 8 8zm0 32a8 8 0 0 1-8 8H176a8 8 0 0 1 0-16h160a8 8 0 0 1 8 8z"/></svg>
    <h1 bp-text="heading center" style="--font-size: 72px; font-weight: 200;">Typewriter</h1>
    <h1 bp-text="section center" bp-layout="m-t:sm">Simple and lightweight key navigation utilities and components.</h1>
    <div style="width: 365px; align-self: center; margin-top: 12px">

  \`\`\`bash
  npm install @blueprintui\/typewriter
  \`\`\`
  </div>

  <bp-keynav role="toolbar" aria-label="blueprintui typewriter resources" loop layout="inline" bp-layout="inline gap:xs inline:center m-t:xs">
    <bp-button action="secondary" style="--color: hsl(240, 70%, 70%)">
      <a href="https://github.com/blueprintui/blueprintui/tree/main/packages/typewriter">GitHub <svg width="12" height="12" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"></path></svg></a>
    </bp-button>
    <bp-button action="secondary" style="--color: hsl(240, 70%, 70%)">
      <a href="https://stackblitz.com/edit/blueprintui-typewriter">Stackblitz</a>
    </bp-button>
    <bp-button action="secondary" style="--color: hsl(240, 70%, 70%)">
      <a href="https://www.npmjs.com/package/@blueprintui/typewriter">NPM</a>
    </bp-button>
  </bp-keynav>
</div>

## Inline

<div bp-layout="grid gap:md cols:12 cols:6@md block:center" class="demos">

\`\`\`html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/typewriter@0.0.0/include/keynav.js/+esm';
</script>
<bp-keynav loop layout="inline">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav>
\`\`\`
<bp-keynav loop layout="inline">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav>
  </div>

## Grid

keynav follows the aria [grid navitation](https://w3c.github.io/aria-practices/#gridNav_focus) patterns. keynav computes the number of columns by computing the number of items from the CSS property \`grid-template-columns\`. If the columns are dynamic you can explicity set the column count \`<bp-keynav columns="4">\`.

  <div bp-layout="grid gap:md cols:12 cols:6@md block:center" class="demos">

\`\`\`html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/typewriter@0.0.0/include/keynav.js/+esm';
</script>
<bp-keynav layout="grid" columns="4">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav>
\`\`\`
<bp-keynav layout="grid" columns="4">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
  <button>6</button>
  <button>7</button>
  <button>8</button>
  <button>9</button>
  <button>10</button>
  <button>11</button>
  <button>12</button>
</bp-keynav>
  </div>

## Block

keynav has three directions: \`inline\`, \`block\`, and \`all\`. The default is \`inline\`. The \`block\` direction is useful for creating a vertical list of items. The \`loop\` attribute will loop the list of items when the user reaches the end of the list.

  <div bp-layout="grid gap:md cols:12 cols:6@md block:center" class="demos">

\`\`\`html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/typewriter@0.0.0/include/keynav.js/+esm';
</script>
<bp-keynav loop layout="block">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav>
\`\`\`
<bp-keynav loop layout="block">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav>
  </div>

</main>
<footer bp-layout="inline gap:sm inline:center">
  <a bp-text="link" href="https://blueprintui.dev">BlueprintUI</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://github.com/blueprintui/blueprintui/tree/main/packages/typewriter">GitHub</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://www.npmjs.com/package/@blueprintui/typewriter">NPM</a>
</footer>

<script type="module">
  import '@blueprintui/components/include/divider.js';
  import '@blueprintui/components/include/button.js';
  import '@blueprintui/components/include/button-icon.js';
  import '@blueprintui/typewriter/include/keynav.js';
</script>
  `
}
