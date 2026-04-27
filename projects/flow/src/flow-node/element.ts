import { LitElement, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import styles from './element.css' with { type: 'css' };

/**
 * Flow Node - Draggable node element for flow diagrams
 *
 * @element bp-flow-node
 * @since 1.0.0
 * @slot - node content
 * @slot handles - connection point elements
 * @cssprop --background - node background color
 * @cssprop --border-color - border color
 * @cssprop --border-width - border thickness
 * @cssprop --border-radius - corner radius
 * @cssprop --padding - internal spacing
 * @cssprop --shadow - drop shadow
 */
export class BpFlowNode extends LitElement {
  static styles = [styles];

  /** Unique identifier for the node (required) */
  @property({ type: String }) accessor id = '';

  /** X position in pixels (required) */
  @property({ type: Number }) accessor x = 0;

  /** Y position in pixels (required) */
  @property({ type: Number }) accessor y = 0;

  /** Node width (auto-sized if omitted) */
  @property({ type: String }) accessor width = 'auto';

  /** Node height (auto-sized if omitted) */
  @property({ type: String }) accessor height = 'auto';

  /** Selection state */
  @property({ type: Boolean, reflect: true }) accessor selected = false;

  /** Enable dragging */
  @property({ type: Boolean }) accessor draggable = true;

  /** Custom type for styling */
  @property({ type: String, reflect: true }) accessor type = '';

  // Internal drag state (for 60fps performance during drag)
  private _dragX = 0;
  private _dragY = 0;
  private _isDragging = false;
  private _dragStartX = 0;
  private _dragStartY = 0;
  private _pointerStartX = 0;
  private _pointerStartY = 0;
  private _lastEmitTime = 0;

  // Computed position (returns drag position during drag, attribute position at rest)
  get _renderX(): number {
    return this._isDragging ? this._dragX : this.x;
  }

  get _renderY(): number {
    return this._isDragging ? this._dragY : this.y;
  }

  // Expose render positions for edge calculations
  get renderX(): number {
    return this._renderX;
  }

  get renderY(): number {
    return this._renderY;
  }

  // Accept external changes when not dragging (state reconciliation)
  updated(changed: PropertyValues) {
    if (!this._isDragging) {
      if (changed.has('x')) {
        this._dragX = this.x;
      }
      if (changed.has('y')) {
        this._dragY = this.y;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialize internal state
    this._dragX = this.x;
    this._dragY = this.y;

    // Add CSS state for selection
    if (this.selected) {
      this.internals.states.add('selected');
    }

    // Add event listeners for dragging and selection
    this.addEventListener('pointerdown', this._onPointerDown);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerdown', this._onPointerDown);
    this.removeEventListener('click', this._onClick);
  }

  // ElementInternals for CSS states
  private internals = this.attachInternals();

  render() {
    return html`
      <div
        part="container"
        style="
          transform: translate(${this._renderX}px, ${this._renderY}px);
          width: ${this.width};
          height: ${this.height};
        ">
        <slot></slot>
        <slot name="handles"></slot>
      </div>
    `;
  }

  // Update CSS state when selected changes
  private _updateSelectedState() {
    if (this.selected) {
      this.internals.states.add('selected');
    } else {
      this.internals.states.delete('selected');
    }
  }

  willUpdate(changed: PropertyValues) {
    if (changed.has('selected')) {
      this._updateSelectedState();
    }
  }

  // Drag handlers for 60fps performance
  private _onPointerDown = (e: PointerEvent) => {
    if (!this.draggable) return;
    if ((e.target as HTMLElement).closest('bp-flow-handle')) return; // Don't drag when clicking handles

    const flow = this.closest('bp-flow') as any;
    if (flow?.readonly) return;

    this._isDragging = true;
    this._dragStartX = this.x;
    this._dragStartY = this.y;
    this._dragX = this.x;
    this._dragY = this.y;
    this._pointerStartX = e.clientX;
    this._pointerStartY = e.clientY;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    window.addEventListener('pointermove', this._onPointerMove);
    window.addEventListener('pointerup', this._onPointerUp);
    window.addEventListener('pointercancel', this._onPointerUp);

    e.preventDefault();
    e.stopPropagation();
  };

  private _onPointerMove = (e: PointerEvent) => {
    if (!this._isDragging) return;

    const deltaX = e.clientX - this._pointerStartX;
    const deltaY = e.clientY - this._pointerStartY;

    const flow = this.closest('bp-flow') as any;
    const zoom = flow?.getZoom ? flow.getZoom() : 1;

    this._dragX = this._dragStartX + deltaX / zoom;
    this._dragY = this._dragStartY + deltaY / zoom;

    // Apply grid snapping if enabled
    if (flow?.snapToGrid) {
      const snapped = flow.snapToGridCoords(this._dragX, this._dragY);
      this._dragX = snapped.x;
      this._dragY = snapped.y;
    }

    this.requestUpdate(); // Immediate 60fps update

    // Throttle event emission (16ms = 60fps max)
    this._throttledEmit();

    e.preventDefault();
  };

  private _onPointerUp = (e: PointerEvent) => {
    if (!this._isDragging) return;

    this._isDragging = false;

    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerup', this._onPointerUp);
    window.removeEventListener('pointercancel', this._onPointerUp);

    // Final event with complete position
    this.dispatchEvent(
      new CustomEvent('node-drag-end', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, x: this._dragX, y: this._dragY }
      })
    );

    // Host app should update x/y attributes now
    // If they don't, internal state persists (fine for interactions)

    e.preventDefault();
  };

  private _throttledEmit() {
    const now = performance.now();
    if (now - this._lastEmitTime < 16) return; // 60fps max

    this._lastEmitTime = now;
    this.dispatchEvent(
      new CustomEvent('node-drag', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, x: this._dragX, y: this._dragY }
      })
    );
  }

  // Click handler for selection
  private _onClick = (e: Event) => {
    // Toggle selection on click (Ctrl/Cmd for multi-select)
    const isMultiSelect = (e as MouseEvent).ctrlKey || (e as MouseEvent).metaKey;

    if (!isMultiSelect) {
      // Deselect all other nodes
      const flow = this.closest('bp-flow');
      flow?.querySelectorAll('bp-flow-node[selected]').forEach(node => {
        if (node !== this) {
          (node as any).selected = false;
        }
      });
    }

    this.selected = !this.selected;

    this.dispatchEvent(
      new CustomEvent('node-select', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, selected: this.selected }
      })
    );

    e.stopPropagation();
  };
}
