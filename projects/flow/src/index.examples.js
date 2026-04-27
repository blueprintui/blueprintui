export const metadata = {
  name: 'flow',
  elements: ['bp-flow', 'bp-flow-node', 'bp-flow-edge', 'bp-flow-handle']
};

export function basicFlow() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/flow/include/core.js';
    </script>

    <bp-flow aria-label="basic workflow" height="500px">
      <bp-flow-node id="start" x="50" y="100">
        <h3>Start</h3>
        <p>Begin process</p>
        <bp-flow-handle position="right" type="source" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="process" x="300" y="100">
        <h3>Process</h3>
        <p>Handle data</p>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
        <bp-flow-handle position="right" type="source" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="end" x="550" y="100">
        <h3>End</h3>
        <p>Complete</p>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-edge source="start" target="process" source-handle="right" target-handle="left"></bp-flow-edge>
      <bp-flow-edge source="process" target="end" source-handle="right" target-handle="left"></bp-flow-edge>
    </bp-flow>
  `;
}

export function withHandles() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/flow/include/core.js';
    </script>

    <bp-flow aria-label="flow with handles" height="500px">
      <bp-flow-node id="node1" x="100" y="150">
        <h3>Decision Point</h3>
        <bp-flow-handle position="top" type="target" slot="handles"></bp-flow-handle>
        <bp-flow-handle position="right" type="source" slot="handles"></bp-flow-handle>
        <bp-flow-handle position="bottom" type="source" slot="handles"></bp-flow-handle>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="node2" x="350" y="50">
        <h3>Path A</h3>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="node3" x="350" y="250">
        <h3>Path B</h3>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-edge source="node1" target="node2" source-handle="right" target-handle="left" type="bezier"></bp-flow-edge>
      <bp-flow-edge source="node1" target="node3" source-handle="bottom" target-handle="left" type="bezier"></bp-flow-edge>
    </bp-flow>
  `;
}

export function gridSnapping() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/flow/include/core.js';
    </script>

    <bp-flow aria-label="flow with grid snapping" height="500px" snap-to-grid grid-size="20">
      <bp-flow-node id="snap1" x="100" y="100">
        <h3>Snap to Grid</h3>
        <p>Drag me to see grid snapping</p>
        <bp-flow-handle position="right" type="source" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="snap2" x="400" y="100">
        <h3>Target</h3>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-edge source="snap1" target="snap2"></bp-flow-edge>
    </bp-flow>
  `;
}

export function edgeTypes() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/flow/include/core.js';
    </script>

    <bp-flow aria-label="different edge types" height="500px">
      <bp-flow-node id="src" x="50" y="150">
        <h3>Source</h3>
        <bp-flow-handle position="right" id="h1" type="source" slot="handles"></bp-flow-handle>
        <bp-flow-handle position="right" id="h2" type="source" slot="handles"></bp-flow-handle>
        <bp-flow-handle position="right" id="h3" type="source" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="dest1" x="400" y="50">
        <h3>Straight</h3>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="dest2" x="400" y="150">
        <h3>Bezier</h3>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="dest3" x="400" y="250">
        <h3>Step</h3>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-edge source="src" target="dest1" type="straight" label="Straight"></bp-flow-edge>
      <bp-flow-edge source="src" target="dest2" type="bezier" label="Bezier"></bp-flow-edge>
      <bp-flow-edge source="src" target="dest3" type="step" label="Step"></bp-flow-edge>
    </bp-flow>
  `;
}

export function interactiveExample() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/flow/include/core.js';
    </script>

    <bp-flow id="interactive-flow" aria-label="interactive workflow" height="600px" zoom="1">
      <bp-flow-node id="node-a" x="100" y="100">
        <h3>Node A</h3>
        <p>Click to select</p>
        <bp-flow-handle position="right" type="source" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="node-b" x="350" y="100">
        <h3>Node B</h3>
        <p>Drag to move</p>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
        <bp-flow-handle position="right" type="source" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-node id="node-c" x="600" y="100">
        <h3>Node C</h3>
        <p>Ctrl+Scroll to zoom</p>
        <bp-flow-handle position="left" type="target" slot="handles"></bp-flow-handle>
      </bp-flow-node>

      <bp-flow-edge source="node-a" target="node-b" animated></bp-flow-edge>
      <bp-flow-edge source="node-b" target="node-c" animated></bp-flow-edge>
    </bp-flow>

    <script>
      const flow = document.getElementById('interactive-flow');

      flow.addEventListener('node-drag-end', (e) => {
        console.log('Node moved:', e.detail);
        // Update node position
        const node = flow.querySelector(\`bp-flow-node[id="\${e.detail.id}"]\`);
        if (node) {
          node.setAttribute('x', e.detail.x);
          node.setAttribute('y', e.detail.y);
        }
      });

      flow.addEventListener('node-select', (e) => {
        console.log('Node selected:', e.detail);
      });

      flow.addEventListener('viewport-change', (e) => {
        console.log('Viewport changed:', e.detail);
      });
    </script>
  `;
}
