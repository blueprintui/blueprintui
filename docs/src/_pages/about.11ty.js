export const data = {
  title: 'About Page',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'about.html',
}

export function render() {
  return /* markdown */`
## Contribute

Contribute via Github or become a Sponsor! Built and maintained by <a href="https://coryrylan.com" bp-text="link">Cory Rylan</a>.

<div bp-layout="inline gap:xs">
  <bp-button action="outline" status="accent" readonly=""><a href="https://github.com/blueprintui">Github</a></bp-button>
  <bp-button action="outline" status="accent" readonly=""><a href="https://github.com/sponsors/blueprintui">Sponsor 💙</a></bp-button>
</div>
  `;
}
