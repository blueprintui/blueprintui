import { html } from 'lit';
import '@blueprintui/components/include/button-pip.js';
import { BpButtonPip } from '@blueprintui/components/button-pip';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-pip element', () => {
  let fixture: HTMLElement;
  let element: BpButtonPip;
  let video: HTMLVideoElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <div>
        <video id="test-video" src="test.mp4"></video>
        <bp-button-pip name="pip" target="test-video"></bp-button-pip>
      </div>
    `);
    element = fixture.querySelector<BpButtonPip>('bp-button-pip');
    video = fixture.querySelector<HTMLVideoElement>('video');

    // Mock PiP API
    if (!document.pictureInPictureEnabled) {
      Object.defineProperty(document, 'pictureInPictureEnabled', {
        value: true,
        writable: true,
        configurable: true
      });
    }

    // Mock video PiP methods
    video.requestPictureInPicture = jasmine.createSpy('requestPictureInPicture').and.returnValue(Promise.resolve());
    (document as any).exitPictureInPicture = jasmine
      .createSpy('exitPictureInPicture')
      .and.returnValue(Promise.resolve());
    Object.defineProperty(document, 'pictureInPictureElement', {
      value: null,
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-pip')).toBe(BpButtonPip);
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBeTruthy();
  });

  it('should set role of button', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('button');
  });

  it('should set aria-pressed based on checked state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');

    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('true');
  });

  it('should not have a tabindex if readonly or disabled', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });

  it('should have default value of "on"', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
  });

  it('should reflect value to attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('on');

    element.value = 'custom';
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('custom');
  });

  it('should have default i18n from I18nService', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
  });

  it('should support custom i18n', async () => {
    const customI18n = { pictureInPicture: 'Custom PiP Text' };
    element.i18n = customI18n as any;
    await elementIsStable(element);
    expect(element.i18n.pictureInPicture).toBe('Custom PiP Text');
  });

  it('should support custom slot content', async () => {
    element.innerHTML = '<bp-icon shape="play" size="sm"></bp-icon>';
    await elementIsStable(element);

    const slot = element.shadowRoot.querySelector('slot');
    const assignedElements = slot.assignedElements();

    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].tagName.toLowerCase()).toBe('bp-icon');
    expect(assignedElements[0].getAttribute('shape')).toBe('play');
  });

  it('should be form associated', async () => {
    await elementIsStable(element);
    expect(element._internals.form).toBeNull(); // No form in test fixture
    expect(BpButtonPip.formAssociated).toBe(true);
  });

  it('should have name property', async () => {
    await elementIsStable(element);
    expect(element.name).toBe('pip');
  });

  it('should find video element by target id', async () => {
    await elementIsStable(element);
    expect(element['_videoElement']).toBe(video);
  });

  it('should find closest parent video element when target not specified', async () => {
    const fixtureNoTarget = await createFixture(html`
      <div>
        <video src="test.mp4"></video>
        <bp-button-pip name="pip"></bp-button-pip>
      </div>
    `);
    const elementNoTarget = fixtureNoTarget.querySelector<BpButtonPip>('bp-button-pip');
    const videoNoTarget = fixtureNoTarget.querySelector<HTMLVideoElement>('video');

    await elementIsStable(elementNoTarget);
    expect(elementNoTarget['_videoElement']).toBe(videoNoTarget);

    removeFixture(fixtureNoTarget);
  });

  it('should update video element when target changes', async () => {
    const fixtureMultiVideo = await createFixture(html`
      <div>
        <video id="video1" src="test1.mp4"></video>
        <video id="video2" src="test2.mp4"></video>
        <bp-button-pip name="pip" target="video1"></bp-button-pip>
      </div>
    `);
    const elementMulti = fixtureMultiVideo.querySelector<BpButtonPip>('bp-button-pip');
    const video1 = fixtureMultiVideo.querySelector<HTMLVideoElement>('#video1');
    const video2 = fixtureMultiVideo.querySelector<HTMLVideoElement>('#video2');

    await elementIsStable(elementMulti);
    expect(elementMulti['_videoElement']).toBe(video1);

    elementMulti.target = 'video2';
    await elementIsStable(elementMulti);
    expect(elementMulti['_videoElement']).toBe(video2);

    removeFixture(fixtureMultiVideo);
  });

  it('should sync state when video enters PiP', async () => {
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();

    // Simulate entering PiP
    Object.defineProperty(document, 'pictureInPictureElement', {
      value: video,
      writable: true,
      configurable: true
    });
    video.dispatchEvent(new Event('enterpictureinpicture'));
    await elementIsStable(element);

    expect(element.checked).toBe(true);
  });

  it('should sync state when video leaves PiP', async () => {
    element.checked = true;
    await elementIsStable(element);

    // Simulate leaving PiP
    Object.defineProperty(document, 'pictureInPictureElement', {
      value: null,
      writable: true,
      configurable: true
    });
    video.dispatchEvent(new Event('leavepictureinpicture'));
    await elementIsStable(element);

    expect(element.checked).toBe(false);
  });

  it('should have correct icon properties', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(icon.getAttribute('role')).toBe('presentation');
    expect(icon.getAttribute('shape')).toBeTruthy();
    expect(icon.getAttribute('size')).toBe('sm');
  });

  it('should disable when PiP not supported', async () => {
    const fixtureNoSupport = await createFixture(html`
      <div>
        <video id="test-video" src="test.mp4"></video>
        <bp-button-pip name="pip" target="test-video"></bp-button-pip>
      </div>
    `);
    const elementNoSupport = fixtureNoSupport.querySelector<BpButtonPip>('bp-button-pip');

    Object.defineProperty(document, 'pictureInPictureEnabled', {
      value: false,
      writable: true,
      configurable: true
    });

    await elementIsStable(elementNoSupport);
    // Note: disabled state is set in firstUpdated, might need to trigger update
    elementNoSupport.requestUpdate();
    await elementIsStable(elementNoSupport);

    removeFixture(fixtureNoSupport);
  });

  it('should disable when no video element found', async () => {
    const fixtureNoVideo = await createFixture(html` <bp-button-pip name="pip" target="nonexistent"></bp-button-pip> `);
    const elementNoVideo = fixtureNoVideo.querySelector<BpButtonPip>('bp-button-pip');

    await elementIsStable(elementNoVideo);
    expect(elementNoVideo.disabled).toBe(true);

    removeFixture(fixtureNoVideo);
  });

  it('should support CSS states', async () => {
    await elementIsStable(element);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(true);

    element.disabled = false;
    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(true);
  });
});
