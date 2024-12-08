import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachInternals,
  baseStyles,
  BpTypeElement,
  I18nService,
  stateTextContent
} from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/progress-dot.js';
 * ```
 *
 * ```html
 * <bp-progress-dot></bp-progress-dot>
 * ```
 *
 * @summary The Progress dot component is designed to indicate that a process is ongoing. It gives users feedback that the system is processing the task and that they need to wait.
 * @element bp-progress-dot
 * @since 1.0.0
 * @cssprop --color
 * @cssprop --width
 * @cssprop --height
 * @cssprop --animation-duration
 */
@stateTextContent<BpProgressDot>()
export class BpProgressDot extends LitElement implements Pick<BpTypeElement, keyof BpProgressDot> {
  /** determine the visual size state */
  @property({ type: String, reflect: true }) accessor size: 'sm' | 'lg';

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="31.1" cy="18" r="2.9"></circle>
          <circle cx="18" cy="18" r="2.9"></circle>
          <circle cx="4.9" cy="18" r="2.9"></circle>
        </svg>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'progressbar';
    this._internals.ariaValueNow = '0';
    this._internals.ariaLabel = this.i18n.loading;
  }
}
