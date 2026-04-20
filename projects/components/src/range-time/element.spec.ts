import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpRangeTime } from '@blueprintui/components/range-time';
import '@blueprintui/components/include/range-time.js';

describe('bp-range-time', () => {
  let element: BpRangeTime;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-range-time></bp-range-time>`);
    element = fixture.querySelector<BpRangeTime>('bp-range-time');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-range-time')).toBe(BpRangeTime);
  });

  it('should have default property values', async () => {
    await elementIsStable(element);
    expect(element.value).toBe(0);
    expect(element.max).toBe(100);
    expect(element.min).toBe(0);
    expect(element.step).toBe(0.1);
    expect(element.buffered).toEqual([]);
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.name).toBeUndefined();
  });

  it('should update value property', async () => {
    element.value = 50;
    await elementIsStable(element);
    expect(element.value).toBe(50);

    element.value = 75.5;
    await elementIsStable(element);
    expect(element.value).toBe(75.5);
  });

  it('should update max property', async () => {
    element.max = 200;
    await elementIsStable(element);
    expect(element.max).toBe(200);
  });

  it('should update min property', async () => {
    element.min = 10;
    await elementIsStable(element);
    expect(element.min).toBe(10);
  });

  it('should update step property', async () => {
    element.step = 1;
    await elementIsStable(element);
    expect(element.step).toBe(1);
  });

  it('should set disabled state', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);
    expect(element.tabIndex).toBe(-1);
  });

  it('should set readonly state', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    expect(element.matches(':state(readonly)')).toBe(true);
  });

  it('should handle name property for form integration', async () => {
    element.name = 'video-time';
    element.value = 45;
    await elementIsStable(element);
    expect(element.name).toBe('video-time');
  });

  it('should set buffered ranges from array', async () => {
    const buffered = [
      { start: 0, end: 30 },
      { start: 45, end: 90 }
    ];
    element.buffered = buffered;
    await elementIsStable(element);
    expect(element.buffered).toEqual(buffered);
  });

  it('should set buffered ranges using setBufferedRanges with TimeRanges', async () => {
    // Mock TimeRanges object
    const mockTimeRanges = {
      length: 2,
      start: (i: number) => (i === 0 ? 0 : 45),
      end: (i: number) => (i === 0 ? 30 : 90)
    } as TimeRanges;

    element.setBufferedRanges(mockTimeRanges);
    await elementIsStable(element);

    expect(element.buffered.length).toBe(2);
    expect(element.buffered[0]).toEqual({ start: 0, end: 30 });
    expect(element.buffered[1]).toEqual({ start: 45, end: 90 });
  });

  it('should set buffered ranges using setBufferedRanges with array', async () => {
    const buffered = [
      { start: 10, end: 50 },
      { start: 60, end: 100 }
    ];
    element.setBufferedRanges(buffered);
    await elementIsStable(element);

    expect(element.buffered).toEqual(buffered);
  });

  it('should have correct ARIA attributes', async () => {
    element.value = 30;
    element.max = 120;
    element.min = 0;
    await elementIsStable(element);

    const internals = (element as any)._internals as ElementInternals;
    expect(internals.role).toBe('slider');
    expect(internals.ariaValueNow).toBe('30');
    expect(internals.ariaValueMin).toBe('0');
    expect(internals.ariaValueMax).toBe('120');
    expect(internals.ariaValueText).toContain('30 seconds');
    expect(internals.ariaValueText).toContain('2 minutes 0 seconds');
  });

  it('should update ARIA attributes when value changes', async () => {
    element.value = 90;
    element.max = 180;
    await elementIsStable(element);

    const internals = (element as any)._internals as ElementInternals;
    expect(internals.ariaValueNow).toBe('90');
    expect(internals.ariaValueText).toContain('1 minute 30 seconds');
  });

  it('should handle disabled ARIA state', async () => {
    element.disabled = true;
    await elementIsStable(element);

    const internals = (element as any)._internals as ElementInternals;
    expect(internals.ariaDisabled).toBe('true');
  });

  it('should handle readonly ARIA state', async () => {
    element.readonly = true;
    await elementIsStable(element);

    const internals = (element as any)._internals as ElementInternals;
    expect(internals.ariaReadOnly).toBe('true');
  });

  it('should be focusable when not disabled', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should not be focusable when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });

  it('should dispatch input event on keyboard navigation', async () => {
    await elementIsStable(element);

    let inputFired = false;
    element.addEventListener('input', () => (inputFired = true));

    element.value = 50;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(inputFired).toBe(true);
  });

  it('should dispatch change event on keyboard navigation', async () => {
    await elementIsStable(element);

    let changeFired = false;
    element.addEventListener('change', () => (changeFired = true));

    element.value = 50;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(changeFired).toBe(true);
  });

  it('should dispatch seek event on keyboard navigation', async () => {
    await elementIsStable(element);

    let seekFired = false;
    let seekTime = 0;
    element.addEventListener('seek', (e: any) => {
      seekFired = true;
      seekTime = e.detail.time;
    });

    element.value = 50;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(seekFired).toBe(true);
    expect(seekTime).toBeGreaterThan(50);
  });

  it('should handle ArrowRight key to increase value', async () => {
    element.value = 50;
    element.step = 1;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(51);
  });

  it('should handle ArrowLeft key to decrease value', async () => {
    element.value = 50;
    element.step = 1;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(49);
  });

  it('should handle ArrowUp key to increase value', async () => {
    element.value = 50;
    element.step = 1;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(51);
  });

  it('should handle ArrowDown key to decrease value', async () => {
    element.value = 50;
    element.step = 1;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(49);
  });

  it('should handle Home key to jump to minimum', async () => {
    element.value = 50;
    element.min = 0;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(0);
  });

  it('should handle End key to jump to maximum', async () => {
    element.value = 50;
    element.max = 100;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(100);
  });

  it('should handle PageUp key to skip forward 10%', async () => {
    element.value = 50;
    element.max = 100;
    element.min = 0;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(60);
  });

  it('should handle PageDown key to skip backward 10%', async () => {
    element.value = 50;
    element.max = 100;
    element.min = 0;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(40);
  });

  it('should not exceed max value with ArrowRight', async () => {
    element.value = 99.9;
    element.max = 100;
    element.step = 1;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(100);
  });

  it('should not go below min value with ArrowLeft', async () => {
    element.value = 0.1;
    element.min = 0;
    element.step = 1;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(0);
  });

  it('should not handle keyboard events when disabled', async () => {
    element.value = 50;
    element.disabled = true;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(50);
  });

  it('should not handle keyboard events when readonly', async () => {
    element.value = 50;
    element.readonly = true;
    await elementIsStable(element);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.value).toBe(50);
  });

  it('should render track, thumb, and track-fill parts', async () => {
    await elementIsStable(element);

    const track = element.shadowRoot.querySelector('[part="track"]');
    const thumb = element.shadowRoot.querySelector('[part="thumb"]');
    const trackFill = element.shadowRoot.querySelector('[part="track-fill"]');

    expect(track).toBeTruthy();
    expect(thumb).toBeTruthy();
    expect(trackFill).toBeTruthy();
  });

  it('should render buffered ranges', async () => {
    element.buffered = [
      { start: 0, end: 30 },
      { start: 45, end: 90 }
    ];
    await elementIsStable(element);

    const bufferElements = element.shadowRoot.querySelectorAll('[part="track-buffer"]');
    expect(bufferElements.length).toBe(2);
  });

  it('should have valueAsNumber getter and setter', async () => {
    await elementIsStable(element);

    element.valueAsNumber = 45.5;
    expect(element.valueAsNumber).toBe(45.5);
    expect(element.value).toBe(45.5);
  });

  it('should have formAssociated property', () => {
    expect(BpRangeTime.formAssociated).toBe(true);
  });

  it('should support focus() method', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should support blur() method', async () => {
    await elementIsStable(element);
    element.focus();
    element.blur();
    expect(document.activeElement).not.toBe(element);
  });

  it('should handle CSS custom properties', async () => {
    element.style.setProperty('--height', '8px');
    element.style.setProperty('--track-color', 'blue');
    element.style.setProperty('--thumb-size', '20px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--height')).toBe('8px');
    expect(element.style.getPropertyValue('--track-color')).toBe('blue');
    expect(element.style.getPropertyValue('--thumb-size')).toBe('20px');
  });

  it('should handle step values correctly', async () => {
    element.min = 0;
    element.max = 10;
    element.step = 0.5;
    element.value = 5;
    await elementIsStable(element);

    expect(element.step).toBe(0.5);
    expect(element.value).toBe(5);
  });

  it('should handle large time ranges', async () => {
    element.min = 0;
    element.max = 7200; // 2 hours
    element.value = 3600; // 1 hour
    await elementIsStable(element);

    const internals = (element as any)._internals as ElementInternals;
    expect(internals.ariaValueText).toContain('1 hour');
  });

  it('should format time correctly for values under 1 hour', async () => {
    element.value = 125; // 2:05
    element.max = 300;
    await elementIsStable(element);

    const internals = (element as any)._internals as ElementInternals;
    expect(internals.ariaValueText).toContain('2 minutes 5 seconds');
  });

  it('should format time correctly for values over 1 hour', async () => {
    element.value = 3665; // 1:01:05
    element.max = 7200;
    await elementIsStable(element);

    const internals = (element as any)._internals as ElementInternals;
    expect(internals.ariaValueText).toContain('1 hour 1 minute 5 seconds');
  });

  it('should handle form participation with name attribute', async () => {
    element.name = 'playback-position';
    element.value = 120;
    await elementIsStable(element);

    expect(element.name).toBe('playback-position');
  });

  it('should update form value when value changes', async () => {
    element.name = 'test-time';
    element.value = 50;
    await elementIsStable(element);

    element.value = 75;
    await elementIsStable(element);

    expect(element.value).toBe(75);
  });

  it('should handle zero value', async () => {
    element.value = 0;
    await elementIsStable(element);

    expect(element.value).toBe(0);
    const internals = (element as any)._internals as ElementInternals;
    expect(internals.ariaValueNow).toBe('0');
  });

  it('should handle decimal values', async () => {
    element.value = 45.75;
    await elementIsStable(element);

    expect(element.value).toBe(45.75);
  });

  it('should render container with correct part attribute', async () => {
    await elementIsStable(element);

    const container = element.shadowRoot.querySelector('[part="container"]');
    expect(container).toBeTruthy();
  });
});
