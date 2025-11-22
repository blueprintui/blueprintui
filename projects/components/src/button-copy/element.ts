import { html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { I18nService, i18n, BpTypeButton } from '@blueprintui/components/internals';
import { BpButton } from '@blueprintui/components/button';
import type { BpIcon } from '@blueprintui/icons';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/button-copy.js';
 * ```
 *
 * ```html
 * <bp-button-copy value="Hello World"></bp-button-copy>
 * ```
 *
 * @summary The button copy component provides a simple way to copy text to the clipboard with visual feedback.
 * @element bp-button-copy
 * @since 2.8.0
 * @event {CustomEvent<{ value: string }>} copy - Fires when copy is initiated
 * @event {CustomEvent<{ value: string }>} copy-success - Fires when copy succeeds
 * @event {CustomEvent<{ error: Error }>} copy-error - Fires when copy fails
 * @slot copy-icon - Icon shown in default/rest state
 * @slot success-icon - Icon shown after successful copy
 * @slot error-icon - Icon shown after copy error
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --padding
 * @cssprop --min-width
 * @cssprop --font-size
 */
@i18n<BpButtonCopy>({ key: 'actions' })
export class BpButtonCopy
  extends BpButton
  implements
    Pick<
      BpTypeButton,
      keyof Omit<
        BpButtonCopy,
        'value' | 'feedbackDuration' | 'copyLabel' | 'successLabel' | 'errorLabel' | 'copy' | 'icon' | 'i18n'
      >
    >
{
  /** The text value to copy to clipboard */
  @property({ type: String }) accessor value = '';

  /** Duration in ms to show success/error feedback */
  @property({ type: Number, attribute: 'feedback-duration' }) accessor feedbackDuration = 1000;

  /** Tooltip text before copying */
  @property({ type: String, attribute: 'copy-label' }) accessor copyLabel = 'Copy';

  /** Tooltip text after successful copy */
  @property({ type: String, attribute: 'success-label' }) accessor successLabel = 'Copied!';

  /** Tooltip text when copy fails */
  @property({ type: String, attribute: 'error-label' }) accessor errorLabel = 'Copy failed';

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  #feedbackState: 'idle' | 'success' | 'error' = 'idle';
  #feedbackTimer: number | null = null;

  static get styles() {
    return [...super.styles, styles];
  }

  get icon() {
    return this.shadowRoot?.querySelector<BpIcon>('bp-icon');
  }

  /** Programmatically trigger copy action */
  async copy(): Promise<void> {
    if (this.disabled || this.readonly) {
      return;
    }

    this.dispatchEvent(new CustomEvent('copy', { detail: { value: this.value }, bubbles: true, composed: true }));

    try {
      await navigator.clipboard.writeText(this.value);
      this.#setFeedbackState('success');
      this.dispatchEvent(
        new CustomEvent('copy-success', { detail: { value: this.value }, bubbles: true, composed: true })
      );
    } catch (error) {
      this.#setFeedbackState('error');
      this.dispatchEvent(
        new CustomEvent('copy-error', { detail: { error: error as Error }, bubbles: true, composed: true })
      );
    }
  }

  #setFeedbackState(state: 'success' | 'error') {
    this.#feedbackState = state;
    this.#updateAriaLabel();
    this.requestUpdate();

    if (this.#feedbackTimer !== null) {
      clearTimeout(this.#feedbackTimer);
    }

    this.#feedbackTimer = window.setTimeout(() => {
      this.#feedbackState = 'idle';
      this.#updateAriaLabel();
      this.#feedbackTimer = null;
      this.requestUpdate();
    }, this.feedbackDuration);
  }

  render() {
    return html`
      <div part="internal" interaction interaction-after>
        <slot
          name=${this.#feedbackState === 'success'
            ? 'success-icon'
            : this.#feedbackState === 'error'
              ? 'error-icon'
              : 'copy-icon'}>
          <bp-icon
            part="icon"
            .shape=${this.#feedbackState === 'success' ? 'check' : this.#feedbackState === 'error' ? 'error' : 'copy'}
            size="sm"
            inner-offset="1"></bp-icon>
        </slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-button-copy', '');
    this.addEventListener('click', this.#handleClick);
    this.#updateAriaLabel();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#handleClick);
    if (this.#feedbackTimer !== null) {
      clearTimeout(this.#feedbackTimer);
    }
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);

    if (props.has('copyLabel') || props.has('successLabel') || props.has('errorLabel')) {
      this.#updateAriaLabel();
    }
  }

  #handleClick = () => {
    this.copy();
  };

  #updateAriaLabel() {
    const label =
      this.#feedbackState === 'success'
        ? this.successLabel
        : this.#feedbackState === 'error'
          ? this.errorLabel
          : this.copyLabel;
    this._internals.ariaLabel = label;
  }
}
