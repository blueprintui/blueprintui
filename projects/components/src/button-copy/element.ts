import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { I18nService, i18n } from '@blueprintui/components/internals';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/button-copy.js';
 * ```
 *
 * ```html
 * <bp-button-copy aria-label="Copy to clipboard" value="Hello World"></bp-button-copy>
 * ```
 *
 * @summary The button copy component provides a simple way to copy text to the clipboard with visual feedback.
 * @element bp-button-copy
 * @since 2.8.0
 * @event {CustomEvent<{ value: string, error?: Error }>} copy - Fires when copy is initiated
 * @slot - Icon shown in default/rest state
 * @slot success - content shown after successful copy
 * @slot error - content shown after copy error
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --padding
 * @cssprop --min-width
 * @cssprop --font-size
 */
@i18n<BpButtonIcon>({ key: 'actions' })
export class BpButtonCopy extends BpButtonIcon {
  /** The text value to copy to clipboard */
  @property({ type: String }) accessor value = '';

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  #feedbackState: '' | 'success' | 'error' = '';
  #feedbackTimer: number | null = null;

  static get styles() {
    return [...super.styles, styles];
  }

  render() {
    return html`
      <div popovertarget="tooltip" id="internal" part="internal" interaction interaction-after>
        <slot name=${this.#feedbackState}>
          <bp-icon
            part="icon"
            size="sm"
            .shape=${this.#feedbackState === 'success'
              ? 'check'
              : this.#feedbackState === 'error'
                ? 'error'
                : 'copy'}></bp-icon>
        </slot>
      </div>
      <bp-tooltip id="tooltip">${this.ariaLabel ?? this.i18n.copy}</bp-tooltip>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#handleClick);
    this.addEventListener('command', this.#handleCommand);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#handleClick);
    this.removeEventListener('command', this.#handleCommand);
    if (this.#feedbackTimer !== null) {
      clearTimeout(this.#feedbackTimer);
    }
  }

  async copy() {
    if (!this.disabled && !this.readonly) {
      try {
        await navigator.clipboard.writeText(this.value);
        this.#setFeedbackState('success');
        this.#dispatchCopyEvent('success');
        return true;
      } catch (error) {
        this.#setFeedbackState('error');
        this.#dispatchCopyEvent('error');
        console.error(error);
        return false;
      }
    } else {
      return false;
    }
  }

  #dispatchCopyEvent(status: 'success' | 'error') {
    this.dispatchEvent(
      new CustomEvent('copy', { detail: { value: this.value, status }, bubbles: true, composed: true })
    );
  }

  #setFeedbackState(state: 'success' | 'error') {
    this.#feedbackState = state;
    this.requestUpdate();

    if (this.#feedbackTimer !== null) {
      clearTimeout(this.#feedbackTimer);
    }

    this.#feedbackTimer = globalThis.setTimeout(() => {
      this.#feedbackState = '';
      this.#feedbackTimer = null;
      this.requestUpdate();
    }, 1000);
  }

  #handleClick = () => {
    this.copy();
  };

  #handleCommand = (e: CommandEvent) => {
    if (e.command === 'copy') {
      this.copy();
    }
  };
}
