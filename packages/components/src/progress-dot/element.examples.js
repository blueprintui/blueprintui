export const metadata = {
  name: 'progress-dot',
  elements: ['progress-dot']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/progress-dot.js';
    </script>

    <bp-progress-dot aria-label="loading..."></bp-progress-dot>
    `;
}

export function size() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/progress-dot.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-progress-dot size="sm" aria-label="loading..."></bp-progress-dot>
      <bp-progress-dot aria-label="loading..."></bp-progress-dot>
      <bp-progress-dot size="lg" aria-label="loading..."></bp-progress-dot>
    </div>
    `;
}