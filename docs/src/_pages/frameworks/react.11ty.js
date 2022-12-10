export const data = {
  title: 'React',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'frameworks/react.html',
}

export function render() {
  return /* markdown */`
<div bp-layout="inline gap:xs">
  <bp-tag><a href="https://stackblitz.com/edit/blueprintui-react" target="_blank" rel="noopener noreferrer">Demo</a> <img src="/assets/images/frameworks/react.svg" alt="React" style="max-width: 15px" /></bp-tag>
</div>

  `;
}
