import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  I18nStrings,
  interactionClick,
  interactionStyles,
  stateActive
} from '@blueprintui/components/internals';
import { typeFormCheckbox, typeFormControl, TypeFormControl } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

export interface BpButtonPip extends TypeFormControl {} // eslint-disable-line

/**
 * ```typescript
 * import '@blueprintui/components/include/button-pip.js';
 * ```
 *
 * ```html
 * <bp-button-pip aria-label="enter picture-in-picture"></bp-button-pip>
 * ```
 *
 * @summary The button picture-in-picture (PiP) component provides a toggle control for enabling and disabling Picture-in-Picture mode.
 * @element bp-button-pip
 * @since 2.11.0
 * @slot - slot for custom bp-icon
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 * @cssprop --background - background color
 * @cssprop --color - icon color
 * @cssprop --border-color - border color
 * @cssprop --border-radius - border radius
 * @cssprop --padding - internal padding
 * @cssprop --background-hover - background on hover
 * @cssprop --background-pressed - background when checked (PiP active)
 * @cssprop --color-pressed - icon color when checked (PiP active)
 * @cssprop --border-color-pressed - border color when checked (PiP active)
 */
@stateActive<BpButtonPip>()
@typeFormControl<BpButtonPip>()
@interactionClick<BpButtonPip>()
@i18n<BpButtonPip>({ key: 'actions' })
@typeFormCheckbox<BpButtonPip>({ requireName: true })
export class BpButtonPip
  extends LitElement
  implements Pick<BpButtonPip, 'value' | 'checked' | 'readonly' | 'disabled' | 'target' | 'i18n'>
{
  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked (PiP active) */
  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled: boolean;

  /** ID of the video element to make PiP. If not provided, uses closest parent video element */
  @property({ type: String }) accessor target: string | undefined;

  /** represents the name of the current <form> element as a string. */
  declare name: string;

  @property({ type: Object }) accessor i18n: I18nStrings['actions'] = I18nService.keys.actions;

  static formAssociated = true;

  static styles = [baseStyles, interactionStyles, styles];

  private _videoElement: HTMLVideoElement | null = null;
  private _syncInProgress = false;
  private _pipChangeHandler = () => this.#syncPipState();

  get #iconShape() {
    return this.checked ? 'picture' : 'picture';
  }

  render() {
    return html`
      <div part="internal" interaction-after>
        <slot><bp-icon role="presentation" shape=${this.#iconShape} size="sm"></bp-icon></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#findVideoElement();
    this.#setupPipListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#removePipListeners();
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this._internals.role = 'button';
    this._internals.ariaLabel ??= 'picture in picture';
    this.#checkPipSupport();
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    if (props.has('target')) {
      this.#findVideoElement();
    }
    if (props.has('checked')) {
      this._internals.ariaPressed = this.checked ? 'true' : 'false';
      // Only trigger PiP if the change was user-initiated (not from sync)
      if (!this._syncInProgress) {
        this.#togglePip();
      }
    }
  }

  #findVideoElement() {
    this._videoElement = null;

    if (this.target) {
      // Use getElementById to find target video
      this._videoElement = document.getElementById(this.target) as HTMLVideoElement;
    } else {
      // Traverse up to find closest parent video element
      let parent = this.parentElement;
      while (parent) {
        const video = parent.querySelector('video');
        if (video) {
          this._videoElement = video;
          break;
        }
        parent = parent.parentElement;
      }
    }

    this.#checkPipSupport();
  }

  #checkPipSupport() {
    // Disable if PiP is not supported or no video element found
    if (!document.pictureInPictureEnabled || !this._videoElement) {
      this.disabled = true;
    }
  }

  #setupPipListeners() {
    if (this._videoElement) {
      this._videoElement.addEventListener('enterpictureinpicture', this._pipChangeHandler);
      this._videoElement.addEventListener('leavepictureinpicture', this._pipChangeHandler);
    }
  }

  #removePipListeners() {
    if (this._videoElement) {
      this._videoElement.removeEventListener('enterpictureinpicture', this._pipChangeHandler);
      this._videoElement.removeEventListener('leavepictureinpicture', this._pipChangeHandler);
    }
  }

  #syncPipState() {
    // Sync button state with actual PiP state
    const isPip = document.pictureInPictureElement === this._videoElement;
    if (this.checked !== isPip) {
      this._syncInProgress = true;
      this.checked = isPip;
      this._syncInProgress = false;
    }
  }

  async #togglePip() {
    if (!this._videoElement || this.readonly || this.disabled) {
      return;
    }

    try {
      if (this.checked) {
        // Enter PiP mode
        await this._videoElement.requestPictureInPicture();
      } else {
        // Exit PiP mode
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        }
      }
    } catch (err) {
      console.error('PiP error:', err);
      // Revert checked state on error
      this.checked = !this.checked;
    }
  }
}
