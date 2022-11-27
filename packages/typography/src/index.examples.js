export const metadata = {
  name: 'typography'
};

export function example() {
  return /* html */`
<div bp-layout="block gap:md">
  <p bp-text="banner">The five boxing wizards jump quickly (banner)</p>
  <p bp-text="heading">The five boxing wizards jump quickly (heading)</p>
  <p bp-text="subheading">The five boxing wizards jump quickly (subheading)</p>
  <p bp-text="section">The five boxing wizards jump quickly (section)</p>
  <p bp-text="subsection">The five boxing wizards jump quickly (subsection)</p>
  <p bp-text="content">The five boxing wizards jump quickly (content)</p>
  <p bp-text="message">The five boxing wizards jump quickly (message)</p>
  <p bp-text="caption">The five boxing wizards jump quickly (caption)</p>
  <p bp-text="content">The five <span bp-text="code">boxing wizards</span> jump quickly (code)</p>
</div>`;
}

export function autoContrast() {
  return /* html */`
<div bp-layout="block gap:md" style="--background: #2d2d2d; background: var(--background);">
  <p bp-text="heading">The five boxing wizards jump quickly (heading)</p>
  <p bp-text="subheading">The five boxing wizards jump quickly (subheading)</p>
  <p bp-text="section">The five boxing wizards jump quickly (section)</p>
  <p bp-text="subsection">The five boxing wizards jump quickly (subsection)</p>
  <p bp-text="content">The five boxing wizards jump quickly (content)</p>
  <p bp-text="message">The five boxing wizards jump quickly (message)</p>
  <p bp-text="caption">The five boxing wizards jump quickly (caption)</p>
</div>
<div bp-layout="block gap:md" style="--background: #f2f2f2; background: var(--background);">
  <p bp-text="heading">The five boxing wizards jump quickly (heading)</p>
  <p bp-text="subheading">The five boxing wizards jump quickly (subheading)</p>
  <p bp-text="section">The five boxing wizards jump quickly (section)</p>
  <p bp-text="subsection">The five boxing wizards jump quickly (subsection)</p>
  <p bp-text="content">The five boxing wizards jump quickly (content)</p>
  <p bp-text="message">The five boxing wizards jump quickly (message)</p>
  <p bp-text="caption">The five boxing wizards jump quickly (caption)</p>
</div>`;
}

export function content() {
  return /* html */`
<div bp-layout="block gap:md">
  <h1 bp-text="heading">The five boxing wizards jump quickly (heading)</h1>
  <h2 bp-text="subheading">The five boxing wizards jump quickly (subheading)</h2>
  <h3 bp-text="section">The five boxing wizards jump quickly (section)</h3>
  <h4 bp-text="subsection">The five boxing wizards jump quickly (subsection)</h4>
  <h5 bp-text="content">The five boxing wizards jump quickly (content)</h5>
  <h6 bp-text="message">The five boxing wizards jump quickly (message)</h6>
  <h6 bp-text="caption">The five boxing wizards jump quickly (caption)</h6>
</div>`;
}

export function alignment() {
  return /* html */`
<div bp-layout="block gap:md inline:stretch">
  <p bp-text="content start">align start</p>
  <p bp-text="content center">align center</p>
  <p bp-text="content end">align end</p>
</div>`;
}

export function transforms() {
  return /* html */`
<div bp-layout="block gap:md">
  <p bp-text="content capitalize">text title case (capitalize)</p>
  <p bp-text="content uppercase">Text uppercase (uppercase)</p>
  <p bp-text="content lowercase">Text Lowercase (lowercase)</p>
</div>`;
}

export function scale() {
  return /* html */`
<style>
  :root {
    --bp-scale-text: 0.8;
  }
</style>
<div bp-layout="block gap:md">
  <p bp-text="banner">The five boxing wizards jump quickly (banner)</p>
  <p bp-text="heading">The five boxing wizards jump quickly (heading)</p>
  <p bp-text="subheading">The five boxing wizards jump quickly (subheading)</p>
  <p bp-text="section">The five boxing wizards jump quickly (section)</p>
  <p bp-text="subsection">The five boxing wizards jump quickly (subsection)</p>
  <p bp-text="content">The five boxing wizards jump quickly (content)</p>
  <p bp-text="message">The five boxing wizards jump quickly (message)</p>
  <p bp-text="caption">The five boxing wizards jump quickly (caption)</p>
</div>`;
}

export function fill() {
  return /* html */`
<div bp-layout="block gap:md">
  <p bp-text="content fill">The five boxing wizards jump quickly (fill)</p>
  <p bp-text="content">The five boxing wizards jump quickly (default)</p>
</div>`;
}

export function size() {
  return /* html */`
<div bp-layout="block gap:lg">
  <div bp-layout="block gap:md">

    <p bp-text="banner">The five boxing wizards jump quickly (banner)</p>
    <p bp-text="heading">The five boxing wizards jump quickly (heading)</p>
    <p bp-text="subheading">The five boxing wizards jump quickly (subheading)</p>
    <p bp-text="section">The five boxing wizards jump quickly (section)</p>
    <p bp-text="subsection">The five boxing wizards jump quickly (subsection)</p>
    <p bp-text="content">The five boxing wizards jump quickly (content)</p>
    <p bp-text="message">The five boxing wizards jump quickly (message)</p>
    <p bp-text="caption">The five boxing wizards jump quickly (caption)</p>
  </div>
  <div bp-layout="block gap:md">
    <h2 bp-text="banner size:sm">Small</h2>
    <p bp-text="banner size:sm">The five boxing wizards jump quickly (banner)</p>
    <p bp-text="heading size:sm">The five boxing wizards jump quickly (heading)</p>
    <p bp-text="subheading size:sm">The five boxing wizards jump quickly (subheading)</p>
    <p bp-text="section size:sm">The five boxing wizards jump quickly (section)</p>
    <p bp-text="subsection size:sm">The five boxing wizards jump quickly (subsection)</p>
    <p bp-text="content size:sm">The five boxing wizards jump quickly (content)</p>
    <p bp-text="message size:sm">The five boxing wizards jump quickly (message)</p>
    <p bp-text="caption size:sm">The five boxing wizards jump quickly (caption)</p>
  </div>
  <div bp-layout="block gap:md">
    <h2 bp-text="banner size:lg">Large</h2>
    <p bp-text="banner size:lg">The five boxing wizards jump quickly (banner)</p>
    <p bp-text="heading size:lg">The five boxing wizards jump quickly (heading)</p>
    <p bp-text="subheading size:lg">The five boxing wizards jump quickly (subheading)</p>
    <p bp-text="section size:lg">The five boxing wizards jump quickly (section)</p>
    <p bp-text="subsection size:lg">The five boxing wizards jump quickly (subsection)</p>
    <p bp-text="content size:lg">The five boxing wizards jump quickly (content)</p>
    <p bp-text="message size:lg">The five boxing wizards jump quickly (message)</p>
    <p bp-text="caption size:lg">The five boxing wizards jump quickly (caption)</p>
  </div>
</div>
`;
}

export function staticSize() {
  return /* html */`
<div bp-layout="block gap:lg">
  <div bp-layout="block gap:md">
    <h2 bp-text="banner size:static">Static</h2>
    <p bp-text="banner size:static">The five boxing wizards jump quickly (banner)</p>
    <p bp-text="heading size:static">The five boxing wizards jump quickly (heading)</p>
    <p bp-text="subheading size:static">The five boxing wizards jump quickly (subheading)</p>
    <p bp-text="section size:static">The five boxing wizards jump quickly (section)</p>
    <p bp-text="subsection size:static">The five boxing wizards jump quickly (subsection)</p>
    <p bp-text="content size:static">The five boxing wizards jump quickly (content)</p>
    <p bp-text="message size:static">The five boxing wizards jump quickly (message)</p>
    <p bp-text="caption size:static">The five boxing wizards jump quickly (caption)</p>
  </div>
  <div bp-layout="block gap:md">
    <h2 bp-text="banner">Default</h2>
    <p bp-text="banner">The five boxing wizards jump quickly (banner)</p>
    <p bp-text="heading">The five boxing wizards jump quickly (heading)</p>
    <p bp-text="subheading">The five boxing wizards jump quickly (subheading)</p>
    <p bp-text="section">The five boxing wizards jump quickly (section)</p>
    <p bp-text="subsection">The five boxing wizards jump quickly (subsection)</p>
    <p bp-text="content">The five boxing wizards jump quickly (content)</p>
    <p bp-text="message">The five boxing wizards jump quickly (message)</p>
    <p bp-text="caption">The five boxing wizards jump quickly (caption)</p>
  </div>
</div>`;
}

export function style() {
  return /* html */`
<div bp-layout="block gap:md">
  <p bp-text="content">The five <span bp-text="bold">boxing wizards</span> jump quickly (bold)</p>

  <p bp-text="content">The five <span bp-text="italic">boxing wizards</span> jump quickly (italic)</p>

  <p bp-text="content">The five <span bp-text="code">boxing wizards</span> jump quickly (code)</p>

  <pre bp-text="code:block"><code>npm install -g @blueprintui/typography</code></pre>
</div>`;
}

export function list() {
  return /* html */`
<div bp-layout="block gap:md">
  <ul bp-text="list">
    <li>list item</li>
    <li>list item</li>
    <li>list item</li>
    <li>list item</li>
  </ul>
  <ol bp-text="list">
    <li>list item</li>
    <li>list item</li>
    <li>list item</li>
    <li>list item</li>
  </ol>
</div>`;
}

export function link() {
  return /* html */`
<div bp-layout="block gap:md">
  <a href="#" bp-text="link">link</a>
  <a href="#" bp-text="link">link</a>
  <a href="#" bp-text="link">link</a>
  <p bp-text="content"><a href="#" bp-text="link">link</a></p>
</div>`;
}

export function longContent() {
  return /* html */`
<div bp-layout="block gap:md" style="max-width: 720px">
  <p bp-text="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <p bp-text="content">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
</div>`;
}
