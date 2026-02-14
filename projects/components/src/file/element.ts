import { html, LitElement, nothing, PropertyValues } from 'lit';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import { FormControlMixin } from '@blueprintui/components/forms';
import { BpButton } from '@blueprintui/components/button';
import { i18n, I18nService, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/file.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>file</label>
 *   <bp-file></bp-file>
 * </bp-field>
 * ```
 *
 * @summary The file input component allows users to select and upload one or multiple files from their local device.
 * @element bp-file
 * @since 1.0.0
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@i18n<BpFile>({ key: 'actions' })
export class BpFile extends FormControlMixin(LitElement) {
  /** Provides internationalization strings for accessibility labels and screen reader announcements */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** Specifies the file types that the file input should accept, using MIME types or file extensions */
  @property({ type: String }) accessor accept: string;

  @state() private accessor buttonLabel = this.i18n.browse;

  get files() {
    return this.input?.files;
  }

  protected get input() {
    return this.shadowRoot?.querySelector<HTMLInputElement>('input');
  }

  get #button() {
    return this.shadowRoot?.querySelector<BpButton>('bp-button');
  }

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div part="internal">
        <input type="file" hidden .multiple=${this.multiple} accept=${this.accept} @change=${this.#change} />
        <div class="file-input">
          <bp-button
            size="sm"
            action="secondary"
            .disabled=${this.disabled}
            @click=${this.#showPicker}
            ?disabled=${this.matches(':state(disabled)')}>
            <bp-icon shape="folder" size="sm"></bp-icon>
            <span>${this.buttonLabel}</span>
          </bp-button>
          ${this.input?.files?.length && !this.matches(':state(disabled)')
            ? html`<bp-button-icon
                shape="close"
                action="inline"
                @click=${this.#clearFiles}
                aria-label=${this.i18n.removeFile}></bp-button-icon>`
            : nothing}
        </div>
      </div>
    `;
  }

  async firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this.input.addEventListener('change', e => {
      if (e.isTrusted) {
        this.#updateLabelAndFocus((e.target as HTMLInputElement).files);
      }
    });

    await this.updateComplete;
    this.#setControlWidth();
  }

  #showPicker() {
    this.input.showPicker();
  }

  #change(e: InputEvent) {
    if (e.isTrusted) {
      this.#updateLabelAndFocus((e.target as HTMLInputElement).files);
      this._onChange(e);
    }
  }

  #setControlWidth() {
    if (this.parentElement.tagName === 'BP-FIELD') {
      this.parentElement.style.setProperty('--control-width', `${this.#button.getBoundingClientRect().width}px`);
    }
  }

  #clearFiles(fireEvent = true) {
    this.buttonLabel = this.i18n.browse;
    this.input.value = '';

    if (fireEvent && this.input.dispatchEvent) {
      this.input.dispatchEvent(new Event('change'));
    }

    const browseButton = this.shadowRoot?.querySelector<BpButton>('bp-button');
    if (browseButton) {
      browseButton.focus();
    }
  }

  #updateLabelAndFocus(files?: FileList) {
    if (files && files.length) {
      this.buttonLabel = files.length > 1 ? `${files.length} ${this.i18n.files}` : files[0].name;
    } else {
      this.#clearFiles(false);
    }
  }
}
