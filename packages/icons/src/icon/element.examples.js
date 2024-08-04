import { shapes } from '../../dist/shapes/shapes.js';

export const metadata = {
  name: 'icon',
  elements: ['bp-icon']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/user.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-icon></bp-icon>
      <bp-icon shape="user"></bp-icon>
    </div>
  `;
}

export function all() {
  return /* html */`
<script type="module">
  import '@blueprintui/icons/include.js';
  ${shapes.map(s => `import '@blueprintui/icons/shapes/${s}.js'`).join('\n')}
</script>
<div bp-layout="inline gap:md">
  ${shapes.map(s => /* html */`<bp-icon shape="${s}"></bp-icon>`).join('\n')}
</div>
`;
}

export function solid() {
  return /* html */`
<script type="module">
  import '@blueprintui/icons/include.js';
  ${shapes.map(s => `import '@blueprintui/icons/shapes/${s}.js'`).join('\n')}
</script>
<div bp-layout="inline gap:md">
  ${shapes.map(s => /* html */`<bp-icon shape="${s}" type="solid"></bp-icon>`).join('\n')}
</div>
`;
}

export function badge() {
  return /* html */`
<script type="module">
  import '@blueprintui/icons/include.js';
  ${shapes.map(s => `import '@blueprintui/icons/shapes/${s}.js'`).join('\n')}
</script>
<div bp-layout="inline gap:md">
  ${shapes.map(s => /* html */`
  <bp-icon shape="${s}" badge="accent"></bp-icon>
  <bp-icon shape="${s}" badge="success"></bp-icon>
  <bp-icon shape="${s}" badge="warning"></bp-icon>  
  <bp-icon shape="${s}" badge="danger"></bp-icon>
`).join('\n')}
</div>
`;
}

export function size() {
  return /* html */`
<script type="module">
  import '@blueprintui/icons/include.js';
  ${shapes.map(s => `import '@blueprintui/icons/shapes/${s}.js'`).join('\n')}
</script>
<div bp-layout="inline gap:md">
  ${shapes.map(s => /* html */`
  <bp-icon shape="${s}" size="sm"></bp-icon>
  <bp-icon shape="${s}" size="md"></bp-icon>
  <bp-icon shape="${s}" size="lg"></bp-icon>
`).join('\n')}
</div>
`;
}
