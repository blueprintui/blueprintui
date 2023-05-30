import { LitElement, svg, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { Directions, isNumericString, mergeObjects, IconDefinition } from '@blueprintui/icons/internals/index.js';
import styles from './element.css' assert { type: 'css' };

const unknown: IconDefinition = {
  name: 'unknown',
  viewBox: 24,
  type: {
    default:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>'
  }
};

/**
 * Icon
 *
 * ```typescript
 * import '@blueprintui/icons/include.js';
 * import '@blueprintui/icons/shapes/user.js';
 * ```
 *
 * ```html
 * <bp-icon shape="user"></bp-icon>
 * ```
 *
 * @element bp-icon
 * @cssprop --color
 * @cssprop --badge-color
 */
export class BpIcon extends LitElement {
  @property({ type: String }) shape = 'unknown';

  @property({ type: String }) type: '' | 'solid';

  /** determine the visual size state */
  @property({ type: String, reflect: true }) size: string | 'sm' | 'md' | 'lg';

  /** determine the visual status state */
  @property({ type: String, reflect: true }) status: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

  @property({ type: String, reflect: true }) badge: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | '';

  @property({ type: String, reflect: true }) direction: Directions;

  @property({ type: Number, attribute: 'inner-offset' }) innerOffset: number; // Performance optimization: default to undefined so attr is not initially rendered

  static styles = [styles];

  @query('svg') private svg: SVGElement;

  get #icon() {
    const icon = BpIcon._icons[this.shape] ?? unknown;
    return {
      // eslint-disable-next-line no-extra-boolean-cast
      svg: `${icon.type[!!this.type ? this.type : 'default'] ?? icon.type.default}${
        this.badge || this.badge === '' ? '<circle cx="30" cy="4" r="4" class="badge"></circle>' : ''
      }`,
      viewBox: icon.viewBox
    };
  }

  static _icons: any = {};

  static add(...shapes: IconDefinition[]) {
    const Icon: any = customElements.get('bp-icon');
    Icon._icons = mergeObjects(Icon._icons, {
      ...Object.fromEntries(shapes.filter(s => !Icon._icons[s.name]).map(s => [s.name, s]))
    }) as any;
    shapes.forEach(s => document.body.dispatchEvent(new CustomEvent(`bp-icon-update-${s.name}`)));
  }

  #internals = this.attachInternals();

  render() {
    return svg`<svg .innerHTML=${this.#icon?.svg} viewBox="0 0 ${this.#icon?.viewBox} ${
      this.#icon?.viewBox
    }" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#listenForShapeUpdate();
    this.#internals.role = 'img';
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    if (props.has('innerOffset') && this.innerOffset > 0) {
      this.#calculateInnerOffset();
    }

    if (props.has('size') && this.size !== props.get('size')) {
      this.#calculateSize();
    }

    if (props.has('shape')) {
      this.#listenForShapeUpdate();
    }
  }

  #listenForShapeUpdate() {
    document.body.addEventListener(`bp-icon-update-${this.shape}`, () => this.requestUpdate(), { once: true });
  }

  #calculateSize() {
    if (isNumericString(this.size as string)) {
      this.style.setProperty('--width', `${this.size}px`);
      this.style.setProperty('--height', `${this.size}px`);
    } else {
      this.style.removeProperty('--width');
      this.style.removeProperty('--height');
    }
  }

  #calculateInnerOffset() {
    const val = `${-1 * this.innerOffset}px`;
    const dimension = `calc(100% + ${this.innerOffset * 2}px)`;
    this.svg.style.width = dimension;
    this.svg.style.height = dimension;
    this.svg.style.margin = `${val} 0 0 ${val}`;
  }
}
