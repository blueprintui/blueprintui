import { LitElement, html, svg } from 'lit';
import { property } from 'lit/decorators/property.js';
import type { BpFlowNode } from '../flow-node/element.js';
import type { BpFlowHandle } from '../flow-handle/element.js';
import styles from './element.css' with { type: 'css' };

/**
 * Flow Edge - Connection between flow nodes
 *
 * @element bp-flow-edge
 * @since 1.0.0
 * @cssprop --stroke - edge line color
 * @cssprop --stroke-width - line thickness
 * @cssprop --stroke-dasharray - dash pattern
 * @cssprop --marker-color - arrow color
 */
export class BpFlowEdge extends LitElement {
  static styles = [styles];

  /** Source node id (required) */
  @property({ type: String }) accessor source = '';

  /** Target node id (required) */
  @property({ type: String }) accessor target = '';

  /** Source handle id */
  @property({ type: String, attribute: 'source-handle' }) accessor sourceHandle = '';

  /** Target handle id */
  @property({ type: String, attribute: 'target-handle' }) accessor targetHandle = '';

  /** Path style */
  @property({ type: String }) accessor type: 'straight' | 'bezier' | 'step' = 'bezier';

  /** Animate edge flow */
  @property({ type: Boolean }) accessor animated = false;

  /** Edge label text */
  @property({ type: String }) accessor label = '';

  private _animationFrame?: number;

  connectedCallback() {
    super.connectedCallback();
    // Start animation loop for smooth edge updates during drag
    this._startAnimationLoop();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }
  }

  private _startAnimationLoop() {
    const update = () => {
      this.requestUpdate();
      this._animationFrame = requestAnimationFrame(update);
    };
    this._animationFrame = requestAnimationFrame(update);
  }

  private _findNode(nodeId: string): BpFlowNode | null {
    if (!nodeId) return null;
    const flow = this.closest('bp-flow');
    return flow?.querySelector<BpFlowNode>(`bp-flow-node[id="${nodeId}"]`) ?? null;
  }

  private _getHandlePosition(node: BpFlowNode, handleId: string): { x: number; y: number } | null {
    if (!handleId) {
      // Default to center of node
      const rect = node.getBoundingClientRect();
      const flowRect = this.closest('bp-flow')?.getBoundingClientRect();
      if (!flowRect) return null;

      return {
        x: node.renderX + rect.width / 2,
        y: node.renderY + rect.height / 2
      };
    }

    const handle = node.querySelector<BpFlowHandle>(`bp-flow-handle[id="${handleId}"]`);
    if (!handle) {
      // Fallback to position-based lookup
      const positionHandle = node.querySelector<BpFlowHandle>(`bp-flow-handle[position="${handleId}"]`);
      if (!positionHandle) return null;
      return this._calculateHandlePosition(node, positionHandle);
    }

    return this._calculateHandlePosition(node, handle);
  }

  private _calculateHandlePosition(node: BpFlowNode, handle: BpFlowHandle): { x: number; y: number } {
    const nodeRect = node.getBoundingClientRect();
    const flow = this.closest('bp-flow');
    const flowRect = flow?.getBoundingClientRect();

    if (!flowRect) {
      return { x: node.renderX, y: node.renderY };
    }

    const zoom = (flow as any)?.zoom ?? 1;
    const position = handle.position;

    let x = node.renderX;
    let y = node.renderY;

    switch (position) {
      case 'top':
        x += nodeRect.width / (2 * zoom);
        break;
      case 'right':
        x += nodeRect.width / zoom;
        y += nodeRect.height / (2 * zoom);
        break;
      case 'bottom':
        x += nodeRect.width / (2 * zoom);
        y += nodeRect.height / zoom;
        break;
      case 'left':
        y += nodeRect.height / (2 * zoom);
        break;
    }

    return { x, y };
  }

  private _calculatePath(): string {
    const sourceNode = this._findNode(this.source);
    const targetNode = this._findNode(this.target);

    if (!sourceNode || !targetNode) {
      return 'M 0 0';
    }

    const sourcePos = this._getHandlePosition(sourceNode, this.sourceHandle);
    const targetPos = this._getHandlePosition(targetNode, this.targetHandle);

    if (!sourcePos || !targetPos) {
      return 'M 0 0';
    }

    return this._generatePath(sourcePos, targetPos);
  }

  private _generatePath(source: { x: number; y: number }, target: { x: number; y: number }): string {
    switch (this.type) {
      case 'straight':
        return `M ${source.x} ${source.y} L ${target.x} ${target.y}`;

      case 'step':
        const midX = (source.x + target.x) / 2;
        return `M ${source.x} ${source.y} H ${midX} V ${target.y} H ${target.x}`;

      case 'bezier':
      default:
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const controlOffset = Math.abs(dx) * 0.5;

        const cp1x = source.x + controlOffset;
        const cp1y = source.y;
        const cp2x = target.x - controlOffset;
        const cp2y = target.y;

        return `M ${source.x} ${source.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${target.x} ${target.y}`;
    }
  }

  private _calculateViewBox(): string {
    const sourceNode = this._findNode(this.source);
    const targetNode = this._findNode(this.target);

    if (!sourceNode || !targetNode) {
      return '0 0 100 100';
    }

    const sourcePos = this._getHandlePosition(sourceNode, this.sourceHandle);
    const targetPos = this._getHandlePosition(targetNode, this.targetHandle);

    if (!sourcePos || !targetPos) {
      return '0 0 100 100';
    }

    const minX = Math.min(sourcePos.x, targetPos.x);
    const minY = Math.min(sourcePos.y, targetPos.y);
    const maxX = Math.max(sourcePos.x, targetPos.x);
    const maxY = Math.max(sourcePos.y, targetPos.y);

    const width = maxX - minX + 20; // Add padding
    const height = maxY - minY + 20;

    return `${minX - 10} ${minY - 10} ${width} ${height}`;
  }

  render() {
    const path = this._calculatePath();
    const viewBox = this._calculateViewBox();

    return html`
      <svg part="svg" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="arrowhead-${this.source}-${this.target}"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="var(--marker-color, var(--stroke, #94a3b8))" />
          </marker>
        </defs>

        ${this.animated
          ? svg`
              <path
                part="path-animated"
                d="${path}"
                fill="none"
                stroke="var(--stroke, #94a3b8)"
                stroke-width="var(--stroke-width, 2)"
                stroke-dasharray="var(--stroke-dasharray, 5 5)"
                marker-end="url(#arrowhead-${this.source}-${this.target})"
              />
            `
          : svg`
              <path
                part="path"
                d="${path}"
                fill="none"
                stroke="var(--stroke, #94a3b8)"
                stroke-width="var(--stroke-width, 2)"
                marker-end="url(#arrowhead-${this.source}-${this.target})"
              />
            `}
        ${this.label
          ? svg`
              <text
                part="label"
                x="${this._getLabelPosition().x}"
                y="${this._getLabelPosition().y}"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="var(--label-color, #64748b)"
                font-size="12"
              >
                ${this.label}
              </text>
            `
          : ''}
      </svg>
    `;
  }

  private _getLabelPosition(): { x: number; y: number } {
    const sourceNode = this._findNode(this.source);
    const targetNode = this._findNode(this.target);

    if (!sourceNode || !targetNode) {
      return { x: 0, y: 0 };
    }

    const sourcePos = this._getHandlePosition(sourceNode, this.sourceHandle);
    const targetPos = this._getHandlePosition(targetNode, this.targetHandle);

    if (!sourcePos || !targetPos) {
      return { x: 0, y: 0 };
    }

    return {
      x: (sourcePos.x + targetPos.x) / 2,
      y: (sourcePos.y + targetPos.y) / 2
    };
  }
}
