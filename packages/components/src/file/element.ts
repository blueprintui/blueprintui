import { html, PropertyValues } from 'lit';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import { FormControl } from '@blueprintui/components/forms';
import { BpButton } from '@blueprintui/components/button';
import { i18n, I18nService, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * File Input
 *
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
 * @element bp-file
 * @slot - For projecting file input and label
 */
@i18n<BpFile>({ key: 'actions' })
export class BpFile extends FormControl {
  @property({ type: Object }) i18n = I18nService.keys.actions;

  @property({ type: String }) accept: string;

  @state() private buttonLabel = this.i18n.browse;

  get files() {
    return this.inputControl.files;
  }

  get inputControl() {
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
    <input type="file" hidden .multiple=${this.multiple} accept=${this.accept} @change=${(e: Event) => this.#change(e)} />
    <div class="file-input">
      <bp-button size="sm" action="outline" .disabled=${this.disabled} @click=${() => this.inputControl.showPicker()} ?disabled=${this.matches(':--disabled')}>
        <bp-icon shape="folder" size="sm"></bp-icon>
        <span>${this.buttonLabel}</span>
      </bp-button>
      ${this.inputControl?.files?.length && !this.matches(':--disabled') ? html`<bp-button-icon shape="close" @click=${() => this.#clearFiles()} aria-label=${this.i18n.removeFile}></bp-button-icon>`: ''}
    </div>
  `;
  }

  async firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this.inputControl.addEventListener('change', e => {
      if (e.isTrusted) {
        this.#updateLabelAndFocus((e.target as any).files);
      }
    });
    
    await this.updateComplete;
    this.#setControlWidth();
  }

  #change(e: any) {
    if (e.isTrusted) {
      this.#updateLabelAndFocus((e.target as any).files);
      this.onChange(e);
    }
  }

  #setControlWidth() {
    if (this.parentElement.tagName === 'BP-FIELD') {
      this.parentElement.style.setProperty('--control-width', `${this.#button.getBoundingClientRect().width}px`);
    }
  }

  #clearFiles(fireEvent = true) {
    this.buttonLabel = this.i18n.browse;
    this.inputControl.value = '';

    if (fireEvent && this.inputControl.dispatchEvent) {
      (this.inputControl as Element).dispatchEvent(new Event('change'));
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
