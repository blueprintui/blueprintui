import { LitElement, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import styles from './element.css' with { type: 'css' };

/**
 * Flow - Flow diagram container with zoom and pan
 *
 * @element bp-flow
 * @since 1.0.0
 * @slot - flow nodes and edges
 * @event {CustomEvent<{id: string, x: number, y: number}>} node-drag - Node position changed during drag
 * @event {CustomEvent<{id: string, x: number, y: number}>} node-drag-end - Node drag completed
 * @event {CustomEvent<{id: string, selected: boolean}>} node-select - Node selection toggled
 * @event {CustomEvent<{zoom: number, x: number, y: number}>} viewport-change - Zoom/pan changed
 * @cssprop --background - canvas background color
 * @cssprop --grid-color - grid line color
 * @cssprop --grid-opacity - grid visibility (0-1)
 * @cssprop --selection-color - multi-select box color
 * @cssprop --min-zoom - minimum zoom level
 * @cssprop --max-zoom - maximum zoom level
 */
export class BpFlow extends LitElement {
  static styles = [styles];

  /** Container width */
  @property({ type: String }) accessor width = '100%';

  /** Container height */
  @property({ type: String }) accessor height = '400px';

  /** Zoom level (0.1-2) */
  @property({ type: Number }) accessor zoom = 1;

  /** Horizontal pan offset in pixels */
  @property({ type: Number, attribute: 'pan-x' }) accessor panX = 0;

  /** Vertical pan offset in pixels */
  @property({ type: Number, attribute: 'pan-y' }) accessor panY = 0;

  /** Enable grid snapping */
  @property({ type: Boolean, attribute: 'snap-to-grid' }) accessor snapToGrid = false;

  /** Grid cell size in pixels */
  @property({ type: Number, attribute: 'grid-size' }) accessor gridSize = 15;

  /** Disable interactions */
  @property({ type: Boolean, reflect: true }) accessor readonly = false;

  /** Visual layer style */
  @property({ type: String, reflect: true }) accessor layer: 'flat' | 'container' = 'flat';

  // Internal viewport state (for smooth interactions)
  private _viewportZoom = 1;
  private _viewportX = 0;
  private _viewportY = 0;
  private _isInteracting = false;
  private _isPanning = false;
  private _panStartX = 0;
  private _panStartY = 0;
  private _lastEmitTime = 0;

  // Computed viewport (returns interaction state during interaction, attribute state at rest)
  get _renderZoom(): number {
    return this._isInteracting ? this._viewportZoom : this.zoom;
  }

  get _renderPanX(): number {
    return this._isInteracting ? this._viewportX : this.panX;
  }

  get _renderPanY(): number {
    return this._isInteracting ? this._viewportY : this.panY;
  }

  // Accept external changes when not interacting (state reconciliation)
  updated(changed: PropertyValues) {
    if (!this._isInteracting) {
      if (changed.has('zoom')) {
        this._viewportZoom = this.zoom;
      }
      if (changed.has('panX')) {
        this._viewportX = this.panX;
      }
      if (changed.has('panY')) {
        this._viewportY = this.panY;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialize internal state
    this._viewportZoom = this.zoom;
    this._viewportX = this.panX;
    this._viewportY = this.panY;

    // Add event listeners
    this.addEventListener('wheel', this._onWheel, { passive: false });
    this.addEventListener('pointerdown', this._onPointerDown);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('wheel', this._onWheel);
    this.removeEventListener('pointerdown', this._onPointerDown);
    this.removeEventListener('click', this._onClick);
  }

  render() {
    const transform = `translate(${this._renderPanX}px, ${this._renderPanY}px) scale(${this._renderZoom})`;

    return html`
      <div
        part="viewport"
        style="
          width: ${this.width};
          height: ${this.height};
        ">
        ${this._renderGrid()}
        <div part="canvas" style="transform: ${transform}; transform-origin: 0 0;">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private _renderGrid() {
    if (!this.snapToGrid) return '';

    const gridSize = this.gridSize * this._renderZoom;
    const offsetX = this._renderPanX % gridSize;
    const offsetY = this._renderPanY % gridSize;

    return html`
      <svg part="grid" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-pattern"
            width="${gridSize}"
            height="${gridSize}"
            patternUnits="userSpaceOnUse"
            x="${offsetX}"
            y="${offsetY}">
            <path
              d="M ${gridSize} 0 L 0 0 0 ${gridSize}"
              fill="none"
              stroke="var(--grid-color, #e5e7eb)"
              stroke-width="1"
              opacity="var(--grid-opacity, 0.5)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    `;
  }

  private _emitViewportChange() {
    this.dispatchEvent(
      new CustomEvent('viewport-change', {
        detail: {
          zoom: this._viewportZoom,
          x: this._viewportX,
          y: this._viewportY
        },
        bubbles: true,
        composed: true
      })
    );
  }

  // Helper method to get current zoom (useful for child components)
  getZoom(): number {
    return this._renderZoom;
  }

  // Helper method to snap coordinates to grid
  snapToGridCoords(x: number, y: number): { x: number; y: number } {
    if (!this.snapToGrid) {
      return { x, y };
    }

    return {
      x: Math.round(x / this.gridSize) * this.gridSize,
      y: Math.round(y / this.gridSize) * this.gridSize
    };
  }

  // Zoom handler
  private _onWheel = (e: WheelEvent) => {
    if (this.readonly) return;
    if (!e.ctrlKey && !e.metaKey) return; // Require modifier key for zoom

    e.preventDefault();

    const delta = -e.deltaY / 1000;
    const minZoom = parseFloat(getComputedStyle(this).getPropertyValue('--min-zoom') || '0.1');
    const maxZoom = parseFloat(getComputedStyle(this).getPropertyValue('--max-zoom') || '2');

    this._isInteracting = true;
    this._viewportZoom = Math.max(minZoom, Math.min(maxZoom, this._viewportZoom + delta));
    this.requestUpdate();

    this._throttledEmitViewport();
  };

  // Pan handler
  private _onPointerDown = (e: PointerEvent) => {
    if (this.readonly) return;

    // Check if clicking on background (not a node)
    const target = e.target as HTMLElement;
    if (target.closest('bp-flow-node')) return;

    // Space key + drag or middle mouse button for pan
    if (e.button === 1 || e.button === 0) {
      // button 0 = left, 1 = middle
      this._isPanning = true;
      this._isInteracting = true;
      this._panStartX = e.clientX;
      this._panStartY = e.clientY;

      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

      window.addEventListener('pointermove', this._onPointerMove);
      window.addEventListener('pointerup', this._onPointerUp);

      e.preventDefault();
    }
  };

  private _onPointerMove = (e: PointerEvent) => {
    if (!this._isPanning) return;

    const deltaX = e.clientX - this._panStartX;
    const deltaY = e.clientY - this._panStartY;

    this._viewportX = this.panX + deltaX;
    this._viewportY = this.panY + deltaY;

    this._panStartX = e.clientX;
    this._panStartY = e.clientY;

    this.requestUpdate();
    this._throttledEmitViewport();

    e.preventDefault();
  };

  private _onPointerUp = (e: PointerEvent) => {
    if (!this._isPanning) return;

    this._isPanning = false;
    this._isInteracting = false;

    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerup', this._onPointerUp);

    // Final viewport change event
    this._emitViewportChange();

    e.preventDefault();
  };

  // Click handler for deselection
  private _onClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('bp-flow-node')) {
      // Clicked on background - deselect all
      this.querySelectorAll('bp-flow-node[selected]').forEach(node => {
        (node as any).selected = false;
      });
    }
  };

  private _throttledEmitViewport() {
    const now = performance.now();
    if (now - this._lastEmitTime < 16) return; // 60fps max

    this._lastEmitTime = now;
    this._emitViewportChange();
  }
}
