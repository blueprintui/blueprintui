import { BpFlow } from '../flow/index.js';
import { BpFlowNode } from '../flow-node/index.js';
import { BpFlowEdge } from '../flow-edge/index.js';
import { BpFlowHandle } from '../flow-handle/index.js';

customElements.get('bp-flow') ?? customElements.define('bp-flow', BpFlow);
customElements.get('bp-flow-node') ?? customElements.define('bp-flow-node', BpFlowNode);
customElements.get('bp-flow-edge') ?? customElements.define('bp-flow-edge', BpFlowEdge);
customElements.get('bp-flow-handle') ?? customElements.define('bp-flow-handle', BpFlowHandle);

declare global {
  interface HTMLElementTagNameMap {
    'bp-flow': BpFlow;
    'bp-flow-node': BpFlowNode;
    'bp-flow-edge': BpFlowEdge;
    'bp-flow-handle': BpFlowHandle;
  }
}
