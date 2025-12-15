const styles = /* css */ `
  :host {
    --height: auto;
    --width: 100%;
    --scrollbar-width: var(--bp-scrollbar-width, auto);
    --scrollbar-color: var(--bp-scrollbar-color, auto);
    display: block;
    height: var(--height);
    min-height: var(--height);
    width: var(--width);
    contain: strict;
  }

  .viewport {
    height: var(--height);
    position: relative;
    overflow-y: scroll;
    scrollbar-width: var(--scrollbar-width);
    scrollbar-color: var(--scrollbar-color);
  }

  .spacer {
    width: 100%;
    pointer-events: none;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    will-change: transform;
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);

/**
 * @element bp-virtual-list
 * @since 1.0.0
 * @slot - Content area for rendered items
 * @cssprop --height - Container height (default: auto)
 * @cssprop --width - Container width (default: 100%)
 * @cssprop --scrollbar-width - Scrollbar width (default: auto)
 * @cssprop --scrollbar-color - Scrollbar color (default: auto)
 * @event bp-virtual-change - Fired when visible range changes
 * @event bp-virtual-scroll - Fired on scroll with position info
 */
export class BpVirtualList extends HTMLElement {
  static observedAttributes = ['item-height', 'item-count', 'item-buffer', 'height'];

  #internals: ElementInternals;
  #shadow: ShadowRoot;
  #viewport: HTMLElement;
  #spacer: HTMLElement;
  #content: HTMLElement;

  #rafId: number | null = null;
  #lastScrollTop = 0;
  #lastStart = -1;
  #lastEnd = -1;

  #itemHeight = 44;
  #itemCount = 0;
  #itemBuffer = 1;
  #height = 'auto';

  /** Fixed height per item in pixels (required for calculations) */
  get itemHeight(): number {
    return this.#itemHeight;
  }

  set itemHeight(value: number) {
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      this.#itemHeight = num;
      this.#updateLayout();
    }
  }

  /** Total number of items in the dataset */
  get itemCount(): number {
    return this.#itemCount;
  }

  set itemCount(value: number) {
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      this.#itemCount = num;
      this.#updateLayout();
    }
  }

  /** Buffer items rendered outside visible viewport (default: 3) */
  get itemBuffer(): number {
    return this.#itemBuffer;
  }

  set itemBuffer(value: number) {
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      this.#itemBuffer = num;
      this.#updateLayout();
    }
  }

  /** Container height as CSS value */
  get height(): string {
    return this.#height;
  }

  set height(value: string) {
    this.#height = value;
    this.style.setProperty('--height', value);
    // this.#updateLayout();
  }

  /** Current visible range (readonly) */
  get visibleRange(): { start: number; end: number } {
    return this.#calculateRange();
  }

  /** Promise that resolves when the component is stable (for test compatibility) */
  get updateComplete(): Promise<boolean> {
    return Promise.resolve(true);
  }

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.adoptedStyleSheets = [styleSheet];
    this.#internals = this.attachInternals();
    this.#internals.role = 'presentation';

    this.#viewport = document.createElement('div');
    this.#viewport.className = 'viewport';
    this.#viewport.role = 'presentation';

    this.#spacer = document.createElement('div');
    this.#spacer.className = 'spacer';
    this.#spacer.role = 'presentation';

    this.#content = document.createElement('div');
    this.#content.className = 'content';
    this.#content.role = 'presentation';
    this.#content.appendChild(document.createElement('slot'));

    this.#viewport.appendChild(this.#spacer);
    this.#viewport.appendChild(this.#content);
    this.#shadow.appendChild(this.#viewport);
  }

  connectedCallback() {
    this.#viewport.addEventListener('scroll', this.#handleScroll, { passive: true });
    this.#updateLayout();
    // Use microtask to emit initial range after consumer has chance to set up listeners
    queueMicrotask(() => {
      this.#emitRangeChange(true);
    });

    this.addEventListener('command', (e: Event) => {
      const { source, command } = e as CommandEvent;
      console.log(e);
      if (command === '--scroll-to-index') {
        this.scrollToIndex(Number((source as HTMLButtonElement).value));
      }
    });
  }

  disconnectedCallback() {
    this.#viewport.removeEventListener('scroll', this.#handleScroll);
    if (this.#rafId !== null) {
      cancelAnimationFrame(this.#rafId);
      this.#rafId = null;
    }
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'item-height':
        this.itemHeight = Number(newValue);
        break;
      case 'item-count':
        this.itemCount = Number(newValue);
        break;
      case 'item-buffer':
        this.itemBuffer = Number(newValue);
        break;
      case 'height':
        this.height = newValue;
        break;
    }
  }

  /** Scroll to a specific item index */
  scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
    const clampedIndex = Math.max(0, Math.min(index, this.#itemCount - 1));
    const targetScrollTop = clampedIndex * this.#itemHeight;
    this.#viewport.scrollTo({
      top: targetScrollTop,
      behavior
    });
  }

  /** Force recalculation and re-emit of visible range */
  refresh(): void {
    this.#lastStart = -1;
    this.#lastEnd = -1;
    this.#updateLayout();
    this.#emitRangeChange(true);
  }

  #handleScroll = () => {
    if (this.#rafId !== null) {
      return;
    }

    this.#rafId = requestAnimationFrame(() => {
      this.#rafId = null;
      this.#onScrollFrame();
    });
  };

  #onScrollFrame() {
    const scrollTop = this.#viewport.scrollTop;
    const direction = scrollTop > this.#lastScrollTop ? 'down' : scrollTop < this.#lastScrollTop ? 'up' : 'idle';
    this.#lastScrollTop = scrollTop;

    // Emit scroll event
    this.dispatchEvent(
      new CustomEvent('bp-virtual-scroll', {
        bubbles: true,
        detail: {
          scrollTop,
          direction
        }
      })
    );

    // Update content position and emit range change if needed
    this.#updateContentPosition();
    this.#emitRangeChange();
  }

  #calculateRange(): { start: number; end: number } {
    if (this.#itemCount === 0 || this.#itemHeight === 0) {
      return { start: 0, end: 0 };
    }

    const scrollTop = this.#viewport.scrollTop;
    const viewportHeight = this.#viewport.clientHeight;

    const startIndex = Math.floor(scrollTop / this.#itemHeight);
    const visibleCount = Math.ceil(viewportHeight / this.#itemHeight);

    const start = Math.max(0, startIndex - this.#itemBuffer);
    const end = Math.min(this.#itemCount, startIndex + visibleCount + this.#itemBuffer);

    return { start, end };
  }

  #updateLayout() {
    // Update spacer height to create scroll space
    const totalHeight = this.#itemCount * this.#itemHeight;
    this.#spacer.style.height = `${totalHeight}px`;
    this.#updateContentPosition();
  }

  #updateContentPosition() {
    const { start } = this.#calculateRange();
    const translateY = start * this.#itemHeight;
    this.#content.style.transform = `translateY(${translateY}px)`;
  }

  #emitRangeChange(force = false) {
    const { start, end } = this.#calculateRange();

    // Only emit if range actually changed (unless forced)
    if (!force && start === this.#lastStart && end === this.#lastEnd) {
      return;
    }

    this.#lastStart = start;
    this.#lastEnd = end;

    this.dispatchEvent(
      new CustomEvent('bp-virtual-change', {
        bubbles: true,
        composed: true,
        detail: {
          start,
          end,
          count: end - start
        }
      })
    );
  }
}
