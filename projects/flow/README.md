# Flow

Flow diagram components for creating node-based diagrams with draggable nodes and connections.

## Installation

```bash
npm install @blueprintui/flow
```

## Usage

```html
<script type="module">
  import '@blueprintui/flow/include/core.js';
</script>

<bp-flow aria-label="workflow diagram">
  <bp-flow-node id="node-1" x="100" y="100">
    <h3>Start</h3>
  </bp-flow-node>

  <bp-flow-node id="node-2" x="300" y="100">
    <h3>Process</h3>
  </bp-flow-node>

  <bp-flow-edge source="node-1" target="node-2"></bp-flow-edge>
</bp-flow>
```

## Documentation

For full documentation visit [blueprintui.dev/flow](https://blueprintui.dev/flow)
