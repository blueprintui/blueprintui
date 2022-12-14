export const data = {
  title: 'Layout',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/layout/index.html'
}

export function render() {
  return /* markdown */`
To get started install via NPM.

\`\`\`bash
npm install @blueprintui/layout
\`\`\`

Import the library into your CSS.

\`\`\`css
@import '@blueprintui/layout/index.min.css';
\`\`\`

Alternatively copy and paste the stylesheet \`<link>\` into your \`<head>\` to load the CSS.

\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/@blueprintui/layout@latest/index.min.css">
\`\`\`

## Layouts

Blueprint is comprised of three primary layouts. Layouts can be controlled with \`gap\` spacing and container query breakpoints with grids.

<ul bp-text="list">
  <li>
    <code>block</code> (vertical)
  </li>
  <li>
    <code>inline</code> (horizontal)
  </li>
  <li>
    <code>grid</code>
  </li>
</ul>

<div bp-layout="grid cols:auto inline:stretch gap:md m-t:lg">
  <div bp-layout="block gap:md">
    <h3 bp-text="section">Block</h3>
    <div bp-layout="block gap:xs" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>

  <div bp-layout="block gap:md">
    <h3 bp-text="section">Inline</h3>
    <div bp-layout="inline gap:xs" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>

  <div bp-layout="block gap:md">
    <h3 bp-text="section">Grid</h3>
    <div bp-layout="grid gap:xs cols:6@xs" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>
</div>
<bp-button action="outline" status="accent" bp-layout="inline:center"><a href="/docs/layout/block">Next: Block Layout</a></bp-button>
  `;
}