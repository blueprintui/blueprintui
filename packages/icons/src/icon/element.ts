import { LitElement, svg, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { IconService, Directions, isNumericString, BroadcastSubscription } from '@blueprintui/icons/internals/index.js';
import styles from './element.css' assert { type: 'css' };

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

  @property({ type: String, reflect: true }) size: string | 'sm' | 'md' | 'lg';

  @property({ type: String, reflect: true }) status: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

  @property({ type: String, reflect: true }) badge: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | '';

  @property({ type: String, reflect: true }) direction: Directions;

  @property({ type: Number, attribute: 'inner-offset' }) innerOffset: number; // Performance optimization: default to undefined so attr is not initially rendered
  
  static styles = [styles];

  @query('svg') private svg: SVGElement;

  #subscription: BroadcastSubscription;

  get #icon() {
    const icon = (IconService.registry[this.shape] ?? IconService.registry['unknown'] as any);
    return {
      // eslint-disable-next-line no-extra-boolean-cast
      svg: `${icon.type[!!this.type ? this.type : 'default'] ?? icon.type.default}${this.badge || this.badge === '' ? '<circle cx="30" cy="4" r="4" class="badge"></circle>' : ''}`,
      viewBox: icon.viewBox,
    };
  }

  render() {
    return svg`<svg .innerHTML=${this.#icon?.svg} viewBox="0 0 ${this.#icon?.viewBox} ${this.#icon?.viewBox}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`;
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);

    let prev = 'unknown';
    this.#subscription = IconService.stateUpdate.subscribe(update => {
      if (update.type === 'BpIconRegistry' && IconService.registry[this.shape] && prev !== this.shape) {
        prev = this.shape;
        this.requestUpdate('shape');
      }
    });
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    if (props.has('innerOffset') && this.innerOffset > 0) {
      this.#calculateInnerOffset();
    }

    if (props.has('size') && this.size !== props.get('size')) {
      this.#calculateSize();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#subscription?.unsubscribe();
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
