export const data = {
  title: 'Vue',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'frameworks/vue.html',
}

export function render() {
  return /* markdown */`
<div bp-layout="inline gap:xs">
  <bp-tag style="--padding: var(--bp-size-2) var(--bp-size-6)"><a href="https://stackblitz.com/edit/blueprintui-vue" target="_blank" rel="noopener noreferrer">Demo</a> <img src="/assets/images/frameworks/vue.svg" alt="Vue" style="max-width: 15px" /></bp-tag>
</div>

  `;
}
