export const data = {
  title: 'BlueprintUI Layout',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/layout/index.html',
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/layout',
    version: '1.0.0'
  },
}

export function render() {
  return /* markdown */`
<section bp-layout="grid gap:md cols:12 cols:6@md">
  <div bp-layout="block gap:md">
    <h2 bp-text="section">A lightweight layout library for building great responsive mobile first UIs that work everywhere.</h2>
    <ul bp-text="list subsection">
      <li>Easy to use declarative layouts</li>
      <li>Grid, block, and inline layouts</li>
      <li>Responsive container queries</li>
      <li>Only ~3kb of CSS</li>
    </ul>
    <a href="https://badge.fury.io/js/@blueprintui%2Flayout" aria-label="npm package @blueprintui/layout"><img src="https://badge.fury.io/js/@blueprintui%2Flayout.svg" role="presentation"></a>
  </div>

  <div bp-layout="block gap:xs">

\`\`\`html
<div bp-layout="grid gap:sm cols:12 cols:6@sm cols:3@md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
\`\`\`

    <div bp-layout="grid gap:sm cols:12 cols:6@sm cols:3@md" demo resizable>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>
</section>

## Installation

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

<br />

## Layouts

<section bp-layout="grid cols:12 cols:6@md gap:md">
  <div>
    <p bp-text="body">Blueprint is comprised of three primary layouts. Layouts can be controlled with <code>gap</code> spacing and container query breakpoints with grids.</p>
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
  </div>

  \`\`\`html
  <div bp-layout="block gap:sm">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  \`\`\`
</section>

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