import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { FormControl } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

// export interface BpRating extends SwitchControl {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * ```typescript
 * import '@blueprintui/components/include/rating.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>rating</label>
 *   <bp-rating min="0" max="5" value="3" step="1"></bp-rating>
 * </bp-field>
 * ```
 *
 * @element bp-rating
 * @cssprop --background
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpRating extends FormControl {
  static formAssociated = true;

  static styles = [baseStyles, styles];

  @property({ type: String, reflect: true }) value = '0';

  @property({ type: String }) min = 0;

  @property({ type: String }) max = 5;

  render() {
    return html`
      <div input>
        ${Array(this.max)
          .fill(0)
          .map(
            (_, i) => html` <bp-icon
              @mouseenter=${() => this.#mouseenter(i)}
              @mouseleave=${() => this.#mouseleave()}
              @click=${() => (this.value = (i + 1).toString())}
              .type=${i <= parseInt(this.value) - 1 ? 'solid' : ''}
              .value=${i + 1}
              aria-label=${i}
              shape="favorite">
            </bp-icon>`
          )}
      </div>
    `;
  }

  #mouseenter(index: number) {
    const icons = this.shadowRoot.querySelectorAll('bp-icon');
    icons.forEach((icon: any) => {
      icon.type = icon.value <= index + 1 ? 'solid' : '';
    });
  }

  #mouseleave() {
    const icons = this.shadowRoot.querySelectorAll('bp-icon');
    icons.forEach((icon: any) => {
      icon.type = icon.value <= parseInt(this.value) ? 'solid' : '';
    });
  }
}
