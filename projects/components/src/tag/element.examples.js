export const metadata = {
  name: 'tag',
  elements: ['bp-tag']
};


/** @summary Displays labeled, removable tags for categorization or filtering. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/tag.js';
      import '@blueprintui/components/include/badge.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-tag>neutral</bp-tag>
      <bp-tag status="accent">info</bp-tag>
      <bp-tag status="success">success</bp-tag>
      <bp-tag status="warning">warning</bp-tag>
      <bp-tag status="danger">danger</bp-tag>
    </div>
  `;
}


/** @summary Shows tags with badges for additional context. */
export function badges() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/tag.js';
      import '@blueprintui/components/include/badge.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-tag>neutral <bp-badge>10</bp-badge></bp-tag>
      <bp-tag status="accent">info <bp-badge status="accent">10</bp-badge></bp-tag>
      <bp-tag status="success">success <bp-badge status="success">10</bp-badge></bp-tag>
      <bp-tag status="warning">warning <bp-badge status="warning">10</bp-badge></bp-tag>
      <bp-tag status="danger">danger <bp-badge status="danger">10</bp-badge></bp-tag>
    </div>
  `;
}


/** @summary Demonstrates tags in readonly state. */
export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/tag.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-tag readonly status="accent">info</bp-tag>
      <bp-tag status="accent">info</bp-tag>
    </div>
  `;
}


/** @summary Shows tags as clickable links for navigation. */
export function links() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/tag.js';
      import '@blueprintui/components/include/badge.js';
    </script>

    <div bp-layout="inline gap:xs">
      <a href="#"><bp-tag>neutral <bp-badge>10</bp-badge></bp-tag></a>
      <a href="#"><bp-tag status="accent">info <bp-badge status="accent">10</bp-badge></bp-tag></a>
      <a href="#"><bp-tag status="success">success <bp-badge status="success">10</bp-badge></bp-tag></a>
      <a href="#"><bp-tag status="warning">warning <bp-badge status="warning">10</bp-badge></bp-tag></a>
      <a href="#"><bp-tag status="danger">danger <bp-badge status="danger">10</bp-badge></bp-tag></a>
    </div>
  `;
}