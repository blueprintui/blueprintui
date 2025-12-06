import { html, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles, BpTypeControl, attachInternals, popoverStyles } from '@blueprintui/components/internals';
import { BpOption } from '@blueprintui/components/select';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/combobox.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>combobox</label>
 *   <bp-combobox>
 *     <bp-option value="1">Option One</bp-option>
 *     <bp-option value="2">Option Two</bp-option>
 *     <bp-option value="3">Option Three</bp-option>
 *   </bp-combobox>
 * </bp-field>
 * ```
 *
 * @summary The combobox component provides an accessible autocomplete form control with internal filtering, async option support, and three selection modes.
 * @element bp-combobox
 * @since 2.18.0
 * @slot - bp-option elements
 * @slot prefix - Before input (search icon, etc.)
 * @slot suffix - After input (clear button, dropdown arrow)
 * @slot empty - Shown when filter yields no results
 * @slot loading - Custom loading indicator
 * @event {InputEvent} input - occurs when the text input value changes
 * @event {InputEvent} change - occurs when the selection is committed
 * @event {CustomEvent} bp-filter - fires before filtering (cancelable for async)
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --border-radius
 * @cssprop --outline
 * @cssprop --outline-offset
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --line-height
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --width
 * @cssprop --listbox-max-height
 */
export class BpCombobox
  extends FormControl
  implements Pick<BpTypeControl, keyof Omit<BpCombobox, 'mode' | 'filter' | 'loading' | 'open'>>
{
  /** Selection behavior mode */
  @property({ type: String, reflect: true }) accessor mode: 'autocomplete' | 'single' | 'multiple' = 'single';

  /** Filtering strategy */
  @property({ type: String }) accessor filter: 'startswith' | 'contains' | 'none' = 'contains';

  /** Shows loading indicator (for async) */
  @property({ type: Boolean }) accessor loading = false;

  /** Reflects popup state */
  @property({ type: Boolean, reflect: true }) accessor open = false;

  /** Defines the current value of the input for form submission */
  @property({ type: String }) accessor value: string | FormData = '';

  @state() private accessor inputValue = '';
  @state() private accessor activeIndex = -1;

  static styles = [baseStyles, popoverStyles, styles];

  declare _internals: ElementInternals;

  #observer: MutationObserver;

  get #options(): BpOption[] {
    return Array.from(this.querySelectorAll<BpOption>('bp-option'));
  }

  get #visibleOptions(): BpOption[] {
    return this.#options.filter(o => !o.hidden);
  }

  get #input(): HTMLInputElement | null {
    return this.shadowRoot?.querySelector<HTMLInputElement>('input[part="input"]');
  }

  get #listbox(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>('[part="listbox"]');
  }

  get #selectedValues(): string[] {
    if (this.mode === 'multiple') {
      return (this.value as string).split(',').filter(v => v);
    }
    return this.value ? [this.value as string] : [];
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.states.add('bp-layer');

    // Watch for dynamic option changes
    this.#observer = new MutationObserver(() => this.requestUpdate());
    this.#observer.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer?.disconnect();
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <slot name="prefix"></slot>
        ${this.mode === 'multiple' ? this.#renderTags() : nothing}
        <input
          part="input"
          input
          type="text"
          role="combobox"
          autocomplete="off"
          aria-autocomplete="list"
          aria-expanded=${this.open}
          aria-controls="listbox"
          aria-activedescendant=${this.activeIndex >= 0 ? `option-${this.activeIndex}` : nothing}
          .ariaLabel=${this.composedLabel}
          .value=${this.inputValue}
          .disabled=${this.disabled}
          .placeholder=${this.placeholder ?? ''}
          ?readonly=${this.readonly}
          @input=${this.#onInputChange}
          @focus=${this.#onInputFocus}
          @blur=${this.#onInputBlur}
          @keydown=${this.#onKeydown} />
        <slot name="suffix">
          <bp-button-expand .checked=${this.open} readonly @click=${this.#togglePopover}></bp-button-expand>
        </slot>
      </div>
      <div
        id="listbox"
        part="listbox"
        role="listbox"
        aria-multiselectable=${this.mode === 'multiple'}
        popover="manual"
        ?hidden=${!this.open}>
        ${this.loading
          ? html`<slot name="loading"><div part="loading">Loading...</div></slot>`
          : this.#visibleOptions.length === 0
            ? html`<slot name="empty"><div part="empty">No results found</div></slot>`
            : nothing}
        ${repeat(
          this.#options,
          o => o.value,
          (option, index) => html`
            <div
              id="option-${index}"
              part="option"
              role="option"
              aria-selected=${this.#isSelected(option)}
              aria-disabled=${option.hasAttribute('disabled')}
              ?hidden=${option.hidden}
              ?data-active=${index === this.activeIndex}
              @click=${() => this.#selectOption(option)}
              @pointerenter=${() => (this.activeIndex = index)}>
              ${this.mode === 'multiple'
                ? html`<bp-checkbox .checked=${this.#isSelected(option)} readonly></bp-checkbox>`
                : nothing}
              <span>${option.textContent}</span>
            </div>
          `
        )}
        <slot hidden @slotchange=${() => this.requestUpdate()}></slot>
      </div>
    `;
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);

    if (props.has('value') && this.value !== undefined) {
      this.#syncInputFromValue();
    }

    if (props.has('open')) {
      this.#updatePopoverState();
      if (this.open) {
        this._internals.states.add('open');
      } else {
        this._internals.states.delete('open');
      }
    }

    if (props.has('loading')) {
      if (this.loading) {
        this._internals.states.add('loading');
      } else {
        this._internals.states.delete('loading');
      }
    }

    if (props.has('mode')) {
      if (this.mode === 'multiple') {
        this._internals.states.add('multiple');
      } else {
        this._internals.states.delete('multiple');
      }
    }
  }

  #renderTags() {
    const selectedOptions = this.#options.filter(o => this.#selectedValues.includes(o.value));
    if (selectedOptions.length === 0) return nothing;

    return html`
      <div part="tags">
        ${selectedOptions.map(
          o => html`
            <bp-tag
              part="tag"
              closable
              @close=${(e: Event) => {
                e.stopPropagation();
                this.#removeValue(o.value);
              }}>
              ${o.textContent}
            </bp-tag>
          `
        )}
      </div>
    `;
  }

  #syncInputFromValue() {
    if (this.mode === 'multiple') {
      this.inputValue = '';
    } else if (this.value) {
      const selectedOption = this.#options.find(o => o.value === this.value);
      if (selectedOption) {
        this.inputValue = selectedOption.textContent?.trim() ?? '';
      }
    } else {
      this.inputValue = '';
    }
  }

  #onInputChange(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.inputValue = input.value;

    if (!this.open) {
      this.open = true;
    }

    const filterEvent = new CustomEvent('bp-filter', {
      detail: { query: this.inputValue },
      bubbles: true,
      cancelable: true
    });
    this.dispatchEvent(filterEvent);

    if (!filterEvent.defaultPrevented && this.filter !== 'none') {
      this.#filterOptions();
    }

    this.activeIndex = this.#visibleOptions.length > 0 ? 0 : -1;

    // For autocomplete mode, update value as user types
    if (this.mode === 'autocomplete') {
      this.value = this.inputValue;
    }

    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #filterOptions() {
    const query = this.inputValue.toLowerCase().trim();

    this.#options.forEach(option => {
      const text = option.textContent?.toLowerCase() ?? '';
      let matches = true;

      if (query) {
        if (this.filter === 'startswith') {
          matches = text.startsWith(query);
        } else if (this.filter === 'contains') {
          matches = text.includes(query);
        }
      }

      option.hidden = !matches;
    });
  }

  #onInputFocus() {
    if (!this.readonly) {
      this.open = true;
    }
  }

  #onInputBlur(e: FocusEvent) {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const listbox = this.#listbox;

    // Don't close if clicking within the listbox
    if (listbox?.contains(relatedTarget)) {
      return;
    }

    // Delay to allow click events to fire on options
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.#closeAndCommit();
      }
    }, 150);
  }

  #closeAndCommit() {
    this.open = false;

    // In single mode, if input doesn't match an option, clear or revert
    if (this.mode === 'single') {
      const matchingOption = this.#options.find(
        o => o.textContent?.toLowerCase().trim() === this.inputValue.toLowerCase().trim()
      );

      if (matchingOption) {
        this.value = matchingOption.value;
        this.inputValue = matchingOption.textContent?.trim() ?? '';
      } else if (this.inputValue && !this.value) {
        // Clear invalid input
        this.inputValue = '';
      } else {
        // Revert to current value
        this.#syncInputFromValue();
      }
    }

    this.#resetFilter();
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #resetFilter() {
    this.#options.forEach(o => (o.hidden = false));
    this.activeIndex = -1;
  }

  #onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) {
          this.open = true;
        } else {
          this.#navigateOptions(1);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (this.open) {
          this.#navigateOptions(-1);
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (this.open && this.activeIndex >= 0) {
          const option = this.#visibleOptions[this.activeIndex];
          if (option && !this.#isDisabled(option)) {
            this.#selectOption(option);
            if (this.mode !== 'multiple') {
              this.open = false;
            }
          }
        }
        break;

      case ' ':
        // Space toggles selection in multiple mode
        if (this.mode === 'multiple' && this.open && this.activeIndex >= 0) {
          e.preventDefault();
          const option = this.#visibleOptions[this.activeIndex];
          if (option && !this.#isDisabled(option)) {
            this.#selectOption(option);
          }
        }
        break;

      case 'Escape':
        e.preventDefault();
        if (this.open) {
          this.open = false;
          if (this.mode === 'single') {
            this.#syncInputFromValue();
          }
          this.#resetFilter();
        }
        break;

      case 'Tab':
        if (this.open) {
          this.#closeAndCommit();
        }
        break;

      case 'Backspace':
        // Remove last tag in multiple mode when input is empty
        if (this.mode === 'multiple' && !this.inputValue && this.#selectedValues.length > 0) {
          const lastValue = this.#selectedValues[this.#selectedValues.length - 1];
          this.#removeValue(lastValue);
        }
        break;
    }
  }

  #navigateOptions(direction: number) {
    const options = this.#visibleOptions;
    if (options.length === 0) return;

    let newIndex = this.activeIndex + direction;

    // Skip disabled options
    while (newIndex >= 0 && newIndex < options.length && this.#isDisabled(options[newIndex])) {
      newIndex += direction;
    }

    if (newIndex < 0) {
      newIndex = options.length - 1;
      // Find last non-disabled
      while (newIndex >= 0 && this.#isDisabled(options[newIndex])) {
        newIndex--;
      }
    } else if (newIndex >= options.length) {
      newIndex = 0;
      // Find first non-disabled
      while (newIndex < options.length && this.#isDisabled(options[newIndex])) {
        newIndex++;
      }
    }

    if (newIndex >= 0 && newIndex < options.length) {
      this.activeIndex = newIndex;
      this.#scrollOptionIntoView(newIndex);
    }
  }

  #scrollOptionIntoView(index: number) {
    const optionEl = this.shadowRoot?.querySelector(`[id="option-${index}"]`);
    optionEl?.scrollIntoView({ block: 'nearest' });
  }

  #selectOption(option: BpOption) {
    if (this.#isDisabled(option)) return;

    if (this.mode === 'multiple') {
      this.#toggleValue(option.value);
      this.inputValue = '';
      this.#input?.focus();
    } else {
      this.value = option.value;
      this.inputValue = option.textContent?.trim() ?? '';
      this.open = false;
      this.#resetFilter();
    }

    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #isSelected(option: BpOption): boolean {
    return this.#selectedValues.includes(option.value);
  }

  #isDisabled(option: BpOption): boolean {
    return option.hasAttribute('disabled');
  }

  #toggleValue(value: string) {
    const values = this.#selectedValues;
    const index = values.indexOf(value);

    if (index >= 0) {
      values.splice(index, 1);
    } else {
      values.push(value);
    }

    this.value = values.join(',');
  }

  #removeValue(value: string) {
    const values = this.#selectedValues.filter(v => v !== value);
    this.value = values.join(',');
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #togglePopover() {
    if (!this.readonly && !this.disabled) {
      this.open = !this.open;
      if (this.open) {
        this.#input?.focus();
      }
    }
  }

  #updatePopoverState() {
    const listbox = this.#listbox;
    if (!listbox) return;

    if (this.open) {
      listbox.showPopover();
    } else {
      listbox.hidePopover();
    }
  }
}
