import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  I18nStrings,
  interactionClick,
  interactionStyles,
  stateActive,
  stateDisabled,
  stateReadonly
} from '@blueprintui/components/internals';
import { typeFormControl, TypeFormControl, TypeFormControlController } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

export interface BpSpeech extends TypeFormControl {} // eslint-disable-line

/**
 * ```typescript
 * import '@blueprintui/components/include/speech.js';
 * ```
 *
 * ```html
 * <bp-speech name="message"></bp-speech>
 * ```
 *
 * @summary The speech component captures voice input and converts it to text using the Web Speech API.
 * @element bp-speech
 * @since 2.11.0
 * @event {InputEvent} input - occurs on interim results (if interim=true)
 * @event {InputEvent} change - occurs on final recognized text
 * @event {CustomEvent} bp-start - recording started
 * @event {CustomEvent} bp-end - recording ended
 * @event {CustomEvent} bp-result - speech recognized (detail: { transcript, confidence, isFinal })
 * @event {CustomEvent} bp-error - recognition error (detail: { error, message })
 * @event {CustomEvent} bp-no-speech - no speech detected timeout
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border-color
 * @cssprop --icon-color
 * @cssprop --icon-color-recording
 * @cssprop --recording-color
 * @cssprop --recording-animation
 * @cssprop --background-hover
 * @cssprop --background-active
 * @cssprop --background-disabled
 * @cssprop --color-disabled
 */
@stateActive<BpSpeech>()
@stateDisabled<BpSpeech>()
@stateReadonly<BpSpeech>()
@typeFormControl<BpSpeech>()
@interactionClick<BpSpeech>()
@i18n<BpSpeech>({ key: 'actions' })
export class BpSpeech extends LitElement implements Pick<BpSpeech, 'value' | 'readonly' | 'disabled' | 'i18n'> {
  /** current recognized text value */
  @property({ type: String }) accessor value = '';

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled = false;

  /** determines if element is readonly */
  @property({ type: Boolean }) accessor readonly = false;

  /** determines if value is required for form validation */
  @property({ type: Boolean }) accessor required = false;

  /** BCP 47 language tag (e.g., 'en-US', 'es-ES') */
  @property({ type: String }) accessor language = 'en-US';

  /** keep listening after pause */
  @property({ type: Boolean }) accessor continuous = false;

  /** show interim results */
  @property({ type: Boolean }) accessor interim = true;

  /** number of recognition alternatives */
  @property({ type: Number, attribute: 'max-alternatives' }) accessor maxAlternatives = 1;

  /** read-only property reflecting recording state */
  @property({ type: Boolean, reflect: true }) accessor recording = false;

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n: I18nStrings['actions'] = I18nService.keys.actions;

  /** represents the name of the current <form> element as a string */
  declare name: string;

  static styles = [baseStyles, interactionStyles, styles];

  static formAssociated = true;

  declare private typeFormControlController: TypeFormControlController<this>;

  #recognition: any = null;
  #supported = false;

  get #SpeechRecognition() {
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  }

  render() {
    if (!this.#supported) {
      return html`
        <div part="internal" interaction-after>
          <bp-icon shape="microphone-mute" status="warning"></bp-icon>
        </div>
      `;
    }

    return html`
      <div part="internal" interaction interaction-after>
        <slot>
          <bp-icon
            part="icon"
            .shape=${this.recording ? 'microphone' : 'microphone'}
            .type=${this.recording ? 'solid' : ''}
            size="sm"
            inner-offset="1"></bp-icon>
        </slot>
        ${this.recording ? html`<div part="recording-indicator"></div>` : ''}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = 0;
    this._internals.role = 'button';
    this.#supported = !!this.#SpeechRecognition;

    if (this.#supported) {
      this.#setupRecognition();
      this.addEventListener('click', () => this.#toggleRecording());
      this.addEventListener('keydown', (e: KeyboardEvent) => this.#keydown(e));
    } else {
      this._internals.ariaDisabled = 'true';
      this._internals.ariaLabel = 'Speech recognition not supported';
    }

    this.#updateAriaLabel();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.#recognition) {
      this.#recognition.abort();
    }
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);

    if (props.has('language') && this.#recognition) {
      this.#recognition.lang = this.language;
    }

    if (props.has('continuous') && this.#recognition) {
      this.#recognition.continuous = this.continuous;
    }

    if (props.has('interim') && this.#recognition) {
      this.#recognition.interimResults = this.interim;
    }

    if (props.has('maxAlternatives') && this.#recognition) {
      this.#recognition.maxAlternatives = this.maxAlternatives;
    }

    if (props.has('recording')) {
      this.#updateAriaLabel();
      this.#updateStates();
    }
  }

  /** start speech recognition */
  start() {
    if (!this.readonly && !this.disabled && this.#supported && !this.recording) {
      try {
        this.#recognition.start();
      } catch {
        // Already started, ignore
      }
    }
  }

  /** stop and finalize recognition */
  stop() {
    if (this.#supported && this.recording) {
      this.#recognition.stop();
    }
  }

  /** cancel recognition without finalizing */
  abort() {
    if (this.#supported && this.recording) {
      this.#recognition.abort();
    }
  }

  #setupRecognition() {
    this.#recognition = new this.#SpeechRecognition();
    this.#recognition.lang = this.language;
    this.#recognition.continuous = this.continuous;
    this.#recognition.interimResults = this.interim;
    this.#recognition.maxAlternatives = this.maxAlternatives;

    this.#recognition.onstart = () => {
      this.recording = true;
      this.dispatchEvent(new CustomEvent('bp-start', { bubbles: true, composed: true }));
    };

    this.#recognition.onend = () => {
      this.recording = false;
      this.dispatchEvent(new CustomEvent('bp-end', { bubbles: true, composed: true }));
    };

    this.#recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      const isFinal = result.isFinal;

      // Update value for both interim and final results
      if (this.name) {
        this.value = transcript;
      }

      // Dispatch custom result event
      this.dispatchEvent(
        new CustomEvent('bp-result', {
          bubbles: true,
          composed: true,
          detail: { transcript, confidence, isFinal }
        })
      );

      // Dispatch input for interim, change for final
      if (isFinal) {
        this.#dispatchChange();
      } else if (this.interim) {
        this.#dispatchInput(transcript);
      }
    };

    this.#recognition.onerror = (event: any) => {
      const error = event.error;
      let message = 'Speech recognition error';

      switch (error) {
        case 'no-speech':
          message = 'No speech detected';
          this.dispatchEvent(new CustomEvent('bp-no-speech', { bubbles: true, composed: true }));
          break;
        case 'audio-capture':
          message = 'No microphone available';
          break;
        case 'not-allowed':
          message = 'Microphone permission denied';
          break;
        case 'network':
          message = 'Network error';
          break;
        default:
          message = `Speech recognition error: ${error}`;
      }

      this.dispatchEvent(
        new CustomEvent('bp-error', {
          bubbles: true,
          composed: true,
          detail: { error, message }
        })
      );

      this.recording = false;
    };
  }

  #toggleRecording() {
    if (!this.readonly && !this.disabled && this.#supported) {
      if (this.recording) {
        this.stop();
      } else {
        this.start();
      }
    }
  }

  #keydown(event: KeyboardEvent) {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this.#toggleRecording();
    }
  }

  #updateAriaLabel() {
    if (this.#supported) {
      this._internals.ariaLabel = this.recording ? 'Stop recording' : 'Start voice input';
      this._internals.ariaPressed = this.recording ? 'true' : 'false';
    }
  }

  #updateStates() {
    this._internals.states.delete('recording');
    this._internals.states.delete('idle');
    this._internals.states.add(this.recording ? 'recording' : 'idle');
  }

  #dispatchInput(data: string) {
    this.typeFormControlController.dispatchInput(new InputEvent('input', { bubbles: true, composed: true, data }));
  }

  #dispatchChange() {
    this.typeFormControlController.dispatchChange(new InputEvent('change', { bubbles: true, composed: true }));
  }
}
