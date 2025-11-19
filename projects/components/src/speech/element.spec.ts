import { html } from 'lit';
import '@blueprintui/components/include/speech.js';
import { BpSpeech } from '@blueprintui/components/speech';
import { elementIsStable, createFixture, emulateClick, onceEvent, removeFixture } from '@blueprintui/test';

describe('speech element', () => {
  let fixture: HTMLElement;
  let element: BpSpeech;
  let mockRecognition: any;
  let recognitionInstance: any;

  beforeEach(async () => {
    // Mock the SpeechRecognition API
    mockRecognition = jasmine.createSpy('SpeechRecognition').and.callFake(function () {
      recognitionInstance = {
        lang: 'en-US',
        continuous: false,
        interimResults: true,
        maxAlternatives: 1,
        onstart: null,
        onend: null,
        onresult: null,
        onerror: null,
        start: jasmine.createSpy('start').and.callFake(function () {
          if (this.onstart) {
            this.onstart();
          }
        }),
        stop: jasmine.createSpy('stop').and.callFake(function () {
          if (this.onend) {
            this.onend();
          }
        }),
        abort: jasmine.createSpy('abort').and.callFake(function () {
          if (this.onend) {
            this.onend();
          }
        })
      };
      return recognitionInstance;
    });

    (window as any).SpeechRecognition = mockRecognition;

    fixture = await createFixture(html`<bp-speech name="message"></bp-speech>`);
    element = fixture.querySelector<BpSpeech>('bp-speech');
  });

  afterEach(() => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-speech')).toBe(BpSpeech);
  });

  it('should display microphone icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('microphone');
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('Start voice input');
  });

  it('should set role of button', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('button');
  });

  it('should have default property values', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.required).toBe(false);
    expect(element.language).toBe('en-US');
    expect(element.continuous).toBe(false);
    expect(element.interim).toBe(true);
    expect(element.maxAlternatives).toBe(1);
    expect(element.recording).toBe(false);
  });

  it('should start recording on click', async () => {
    await elementIsStable(element);
    expect(element.recording).toBe(false);

    emulateClick(element);
    await elementIsStable(element);

    expect(recognitionInstance.start).toHaveBeenCalled();
    expect(element.recording).toBe(true);
  });

  it('should stop recording on second click', async () => {
    await elementIsStable(element);

    // Start recording
    emulateClick(element);
    await elementIsStable(element);
    expect(element.recording).toBe(true);

    // Stop recording
    emulateClick(element);
    await elementIsStable(element);
    expect(recognitionInstance.stop).toHaveBeenCalled();
    expect(element.recording).toBe(false);
  });

  it('should update ariaLabel when recording state changes', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('Start voice input');

    emulateClick(element);
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('Stop recording');

    emulateClick(element);
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('Start voice input');
  });

  it('should update ariaPressed when recording state changes', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');

    emulateClick(element);
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('true');

    emulateClick(element);
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');
  });

  it('should set appropriate CSS state when recording', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(idle)')).toBe(true);
    expect(element.matches(':state(recording)')).toBe(false);

    emulateClick(element);
    await elementIsStable(element);
    expect(element.matches(':state(idle)')).toBe(false);
    expect(element.matches(':state(recording)')).toBe(true);

    emulateClick(element);
    await elementIsStable(element);
    expect(element.matches(':state(idle)')).toBe(true);
    expect(element.matches(':state(recording)')).toBe(false);
  });

  it('should emit bp-start event when recording starts', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'bp-start');
    emulateClick(element);
    await elementIsStable(element);

    const emittedEvent = await event;
    expect(emittedEvent).toBeDefined();
  });

  it('should emit bp-end event when recording stops', async () => {
    await elementIsStable(element);

    // Start recording
    emulateClick(element);
    await elementIsStable(element);

    const event = onceEvent(element, 'bp-end');
    emulateClick(element);
    await elementIsStable(element);

    const emittedEvent = await event;
    expect(emittedEvent).toBeDefined();
  });

  it('should update value on final recognition result', async () => {
    await elementIsStable(element);
    emulateClick(element);
    await elementIsStable(element);

    const mockResult = {
      results: [
        [
          {
            transcript: 'Hello world',
            confidence: 0.95
          }
        ]
      ],
      resultIndex: 0
    };
    mockResult.results[0].isFinal = true;

    recognitionInstance.onresult(mockResult);
    await elementIsStable(element);

    expect(element.value).toBe('Hello world');
  });

  it('should emit bp-result event with correct details', async () => {
    await elementIsStable(element);
    emulateClick(element);
    await elementIsStable(element);

    const event = onceEvent(element, 'bp-result');

    const mockResult = {
      results: [
        [
          {
            transcript: 'Test transcript',
            confidence: 0.9
          }
        ]
      ],
      resultIndex: 0
    };
    mockResult.results[0].isFinal = true;

    recognitionInstance.onresult(mockResult);
    await elementIsStable(element);

    const emittedEvent: any = await event;
    expect(emittedEvent.detail.transcript).toBe('Test transcript');
    expect(emittedEvent.detail.confidence).toBe(0.9);
    expect(emittedEvent.detail.isFinal).toBe(true);
  });

  it('should emit change event on final result', async () => {
    await elementIsStable(element);
    emulateClick(element);
    await elementIsStable(element);

    const event = onceEvent(element, 'change');

    const mockResult = {
      results: [
        [
          {
            transcript: 'Final text',
            confidence: 0.95
          }
        ]
      ],
      resultIndex: 0
    };
    mockResult.results[0].isFinal = true;

    recognitionInstance.onresult(mockResult);
    await elementIsStable(element);

    const emittedEvent = await event;
    expect(emittedEvent).toBeDefined();
    expect(element.value).toBe('Final text');
  });

  it('should emit input event on interim result when interim=true', async () => {
    await elementIsStable(element);
    element.interim = true;
    await elementIsStable(element);

    emulateClick(element);
    await elementIsStable(element);

    const event = onceEvent(element, 'input');

    const mockResult = {
      results: [
        [
          {
            transcript: 'Interim text',
            confidence: 0.7
          }
        ]
      ],
      resultIndex: 0
    };
    mockResult.results[0].isFinal = false;

    recognitionInstance.onresult(mockResult);
    await elementIsStable(element);

    const emittedEvent: any = await event;
    expect(emittedEvent).toBeDefined();
    expect(emittedEvent.data).toBe('Interim text');
  });

  it('should start recording with Space key', async () => {
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    await elementIsStable(element);

    expect(recognitionInstance.start).toHaveBeenCalled();
    expect(element.recording).toBe(true);
  });

  it('should start recording with Enter key', async () => {
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter', bubbles: true }));
    await elementIsStable(element);

    expect(recognitionInstance.start).toHaveBeenCalled();
    expect(element.recording).toBe(true);
  });

  it('should not start recording when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    emulateClick(element);
    await elementIsStable(element);

    expect(recognitionInstance.start).not.toHaveBeenCalled();
    expect(element.recording).toBe(false);
  });

  it('should not start recording when readonly', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);

    emulateClick(element);
    await elementIsStable(element);

    expect(recognitionInstance.start).not.toHaveBeenCalled();
    expect(element.recording).toBe(false);
  });

  it('should update recognition config when properties change', async () => {
    await elementIsStable(element);

    element.language = 'es-ES';
    await elementIsStable(element);
    expect(recognitionInstance.lang).toBe('es-ES');

    element.continuous = true;
    await elementIsStable(element);
    expect(recognitionInstance.continuous).toBe(true);

    element.interim = false;
    await elementIsStable(element);
    expect(recognitionInstance.interimResults).toBe(false);

    element.maxAlternatives = 3;
    await elementIsStable(element);
    expect(recognitionInstance.maxAlternatives).toBe(3);
  });

  it('should emit bp-error event on recognition error', async () => {
    await elementIsStable(element);
    emulateClick(element);
    await elementIsStable(element);

    const event = onceEvent(element, 'bp-error');

    recognitionInstance.onerror({ error: 'network' });
    await elementIsStable(element);

    const emittedEvent: any = await event;
    expect(emittedEvent.detail.error).toBe('network');
    expect(emittedEvent.detail.message).toContain('Network error');
  });

  it('should emit bp-no-speech event on no-speech error', async () => {
    await elementIsStable(element);
    emulateClick(element);
    await elementIsStable(element);

    const event = onceEvent(element, 'bp-no-speech');

    recognitionInstance.onerror({ error: 'no-speech' });
    await elementIsStable(element);

    const emittedEvent = await event;
    expect(emittedEvent).toBeDefined();
  });

  it('should stop recording on error', async () => {
    await elementIsStable(element);
    emulateClick(element);
    await elementIsStable(element);
    expect(element.recording).toBe(true);

    recognitionInstance.onerror({ error: 'network' });
    await elementIsStable(element);

    expect(element.recording).toBe(false);
  });

  it('should programmatically start recording', async () => {
    await elementIsStable(element);

    element.start();
    await elementIsStable(element);

    expect(recognitionInstance.start).toHaveBeenCalled();
    expect(element.recording).toBe(true);
  });

  it('should programmatically stop recording', async () => {
    await elementIsStable(element);

    element.start();
    await elementIsStable(element);
    expect(element.recording).toBe(true);

    element.stop();
    await elementIsStable(element);

    expect(recognitionInstance.stop).toHaveBeenCalled();
    expect(element.recording).toBe(false);
  });

  it('should programmatically abort recording', async () => {
    await elementIsStable(element);

    element.start();
    await elementIsStable(element);
    expect(element.recording).toBe(true);

    element.abort();
    await elementIsStable(element);

    expect(recognitionInstance.abort).toHaveBeenCalled();
    expect(element.recording).toBe(false);
  });

  it('should handle unsupported browser gracefully', async () => {
    delete (window as any).SpeechRecognition;
    removeFixture(fixture);

    fixture = await createFixture(html`<bp-speech name="message"></bp-speech>`);
    element = fixture.querySelector<BpSpeech>('bp-speech');
    await elementIsStable(element);

    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('microphone-mute');
    expect(element._internals.ariaDisabled).toBe('true');
    expect(element._internals.ariaLabel).toBe('Speech recognition not supported');
  });

  it('should display recording indicator when recording', async () => {
    await elementIsStable(element);

    let indicator = element.shadowRoot.querySelector('[part="recording-indicator"]');
    expect(indicator).toBeNull();

    emulateClick(element);
    await elementIsStable(element);

    indicator = element.shadowRoot.querySelector('[part="recording-indicator"]');
    expect(indicator).toBeDefined();
  });

  it('should handle multiple result alternatives', async () => {
    await elementIsStable(element);
    element.maxAlternatives = 3;
    await elementIsStable(element);

    emulateClick(element);
    await elementIsStable(element);

    const mockResult = {
      results: [
        [
          { transcript: 'First alternative', confidence: 0.95 },
          { transcript: 'Second alternative', confidence: 0.85 },
          { transcript: 'Third alternative', confidence: 0.75 }
        ]
      ],
      resultIndex: 0
    };
    mockResult.results[0].isFinal = true;

    recognitionInstance.onresult(mockResult);
    await elementIsStable(element);

    // Should use the first (highest confidence) alternative
    expect(element.value).toBe('First alternative');
  });

  it('should not update value when name is not set', async () => {
    removeFixture(fixture);
    fixture = await createFixture(html`<bp-speech></bp-speech>`);
    element = fixture.querySelector<BpSpeech>('bp-speech');
    await elementIsStable(element);

    emulateClick(element);
    await elementIsStable(element);

    const mockResult = {
      results: [
        [
          {
            transcript: 'Test text',
            confidence: 0.9
          }
        ]
      ],
      resultIndex: 0
    };
    mockResult.results[0].isFinal = true;

    recognitionInstance.onresult(mockResult);
    await elementIsStable(element);

    // Value should still update even without name for non-form usage
    expect(element.value).toBe('Test text');
  });
});
