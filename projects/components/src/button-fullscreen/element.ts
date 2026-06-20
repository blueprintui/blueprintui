import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { stateDisabled, stateReadonly, baseStyles, attachInternals } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/button-fullscreen.js';
 * ```
 *
 * ```html
 * <bp-button-fullscreen aria-label="enter fullscreen"></bp-button-fullscreen>
 * ```
 *
 * @summary The button fullscreen component provides a toggle control for entering and exiting fullscreen mode using the Fullscreen API.
 * @element bp-button-fullscreen
 * @since 2.11.0
 * @event {Event} change - occurs when the checked state changes (after user interaction)
 * @event {InputEvent} input - occurs when the checked state changes (during user interaction)
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border-color
 * @cssprop --border-radius
 * @cssprop --padding
 * @cssprop --background-hover
 * @cssprop --background-pressed
 * @cssprop --color-pressed
 * @cssprop --border-color-pressed
 * @csspart button - the internal button element
 * @csspart icon - the icon container
 */
@stateDisabled<BpButtonFullscreen>()
@stateReadonly<BpButtonFullscreen>()
export class BpButtonFullscreen extends LitElement {
  static styles = [baseStyles, styles];
  static formAssociated = true;

  /** Fullscreen state. true = fullscreen, false = normal */
  @property({ type: Boolean }) accessor checked = false;

  /** Disables the button, preventing all interaction */
  @property({ type: Boolean }) accessor disabled = false;

  /** Prevents state changes while allowing focus */
  @property({ type: Boolean }) accessor readonly = false;

  /** ID of the element to make fullscreen. If not provided, uses closest parent container */
  @property({ type: String }) accessor target: string | undefined;

  /** Form control name for form participation */
  @property({ type: String }) accessor name: string | undefined;

  /** Value submitted with form when checked */
  @property({ type: String }) accessor value = 'on';

  /** @private */
  declare _internals: ElementInternals;

  #fullscreenChangeHandler = this.#handleFullscreenChange.bind(this);

  render() {
    return html`
      <button
        part="button"
        type="button"
        role="button"
        aria-pressed="${this.checked}"
        tabindex="0"
        @click=${this.#handleClick}
        @keydown=${this.#handleKeydown}
        ?disabled=${this.disabled}>
        <div part="icon">
          <slot>
            <bp-icon
              .shape=${this.checked ? 'fullscreen-exit' : 'fullscreen'}
              size="sm"></bp-icon>
          </slot>
        </div>
      </button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'button';

    // Listen for browser fullscreen changes (e.g., user pressing Esc)
    document.addEventListener('fullscreenchange', this.#fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', this.#fullscreenChangeHandler);
    document.addEventListener('mozfullscreenchange', this.#fullscreenChangeHandler);
    document.addEventListener('MSFullscreenChange', this.#fullscreenChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('fullscreenchange', this.#fullscreenChangeHandler);
    document.removeEventListener('webkitfullscreenchange', this.#fullscreenChangeHandler);
    document.removeEventListener('mozfullscreenchange', this.#fullscreenChangeHandler);
    document.removeEventListener('MSFullscreenChange', this.#fullscreenChangeHandler);
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);

    if (props.has('checked')) {
      this.#updateFormValue();
      this.#updateState();
    }

    if (props.has('disabled') || props.has('readonly')) {
      this.tabIndex = this.disabled ? -1 : 0;
    }
  }

  async #handleClick(e: Event) {
    if (this.disabled || this.readonly) {
      e.preventDefault();
      return;
    }

    await this.#toggle();
  }

  #handleKeydown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      this.#toggle();
    }
  }

  async #toggle() {
    const newChecked = !this.checked;

    // Fire input event before state change
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    try {
      if (newChecked) {
        await this.#enterFullscreen();
      } else {
        await this.#exitFullscreen();
      }

      // Only update checked state if fullscreen operation succeeded
      this.checked = newChecked;

      // Fire change event after state change
      this.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (err) {
      console.error('Fullscreen error:', err);
      // Don't change the checked state if the operation failed
    }
  }

  async #enterFullscreen() {
    const element = this.#getTargetElement();
    if (!element) {
      throw new Error('No target element found for fullscreen');
    }

    // Handle browser prefixes
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      await (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      await (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      await (element as any).msRequestFullscreen();
    } else {
      throw new Error('Fullscreen API not supported');
    }
  }

  async #exitFullscreen() {
    // Handle browser prefixes
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      await (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      await (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      await (document as any).msExitFullscreen();
    }
  }

  #getTargetElement(): HTMLElement | null {
    if (this.target) {
      return document.getElementById(this.target);
    }

    // Find closest parent container element
    let parent = this.parentElement;
    while (parent) {
      // Skip if parent is the body or html element
      if (parent.tagName === 'BODY' || parent.tagName === 'HTML') {
        break;
      }
      // Look for a container-like element
      if (
        parent.classList.contains('container') ||
        parent.hasAttribute('id') ||
        parent.tagName === 'DIV' ||
        parent.tagName === 'SECTION' ||
        parent.tagName === 'ARTICLE'
      ) {
        return parent;
      }
      parent = parent.parentElement;
    }

    // Fallback to document element (entire page)
    return document.documentElement;
  }

  #handleFullscreenChange() {
    // Sync button state with browser fullscreen state
    const fullscreenElement =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;

    const targetElement = this.#getTargetElement();
    const isFullscreen = fullscreenElement === targetElement;

    // Only update if state has changed
    if (this.checked !== isFullscreen) {
      this.checked = isFullscreen;
      // Fire change event when browser fullscreen state changes externally
      this.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  #updateFormValue() {
    if (this.name) {
      const value = typeof this.value === 'number' ? `${this.value}` : this.value;
      this._internals.setFormValue(this.checked ? value : null);
    }
  }

  #updateState() {
    this._internals.ariaPressed = this.checked ? 'true' : 'false';

    if (this.checked) {
      this._internals.states.add('checked');
    } else {
      this._internals.states.delete('checked');
    }
  }

  // Public methods
  click() {
    this.shadowRoot?.querySelector('button')?.click();
  }

  focus() {
    this.shadowRoot?.querySelector('button')?.focus();
  }

  blur() {
    this.shadowRoot?.querySelector('button')?.blur();
  }
}
