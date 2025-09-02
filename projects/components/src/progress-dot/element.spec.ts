import { html } from 'lit';
import '@blueprintui/components/include/progress-dot.js';
import { BpProgressDot } from '@blueprintui/components/progress-dot';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-progress-dot', () => {
  let fixture: HTMLElement;
  let element: BpProgressDot;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-progress-dot></bp-progress-dot>`);
    element = fixture.querySelector<BpProgressDot>('bp-progress-dot');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', () => {
    expect(customElements.get('bp-progress-dot')).toBe(BpProgressDot);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
    expect(element.tagName.toLowerCase()).toBe('bp-progress-dot');
  });

  it('should have a default role of progressbar', () => {
    expect(element._internals.role).toBe('progressbar');
  });

  it('should provide a default aria label', () => {
    expect(element._internals.ariaLabel).toBe('loading');
  });

  it('should provide a detault aria value now of 0 to indicate indeterminate state', () => {
    expect(element._internals.ariaValueNow).toBe('0');
  });

  it('should have a default size of medium (undefined)', () => {
    expect(element.size).toBe(undefined);
  });

  it('should reflect size attribute to element DOM', async () => {
    expect(element.getAttribute('size')).toBe(null);

    element.size = 'sm';
    await elementIsStable(element);
    expect(element.getAttribute('size')).toBe('sm');

    element.size = 'lg';
    await elementIsStable(element);
    expect(element.getAttribute('size')).toBe('lg');
  });

  it('should have default i18n property', () => {
    expect(element.i18n).toBeDefined();
    expect(element.i18n).toEqual(jasmine.any(Object));
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should render SVG with correct structure', async () => {
    await elementIsStable(element);
    const svg = element.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('viewBox')).toBe('0 0 36 36');
    expect(svg.getAttribute('aria-hidden')).toBe('true');

    const circles = svg.querySelectorAll('circle');
    expect(circles.length).toBe(3);

    // Check circle positions
    expect(circles[0].getAttribute('cx')).toBe('31.1');
    expect(circles[0].getAttribute('cy')).toBe('18');
    expect(circles[0].getAttribute('r')).toBe('2.9');

    expect(circles[1].getAttribute('cx')).toBe('18');
    expect(circles[1].getAttribute('cy')).toBe('18');
    expect(circles[1].getAttribute('r')).toBe('2.9');

    expect(circles[2].getAttribute('cx')).toBe('4.9');
    expect(circles[2].getAttribute('cy')).toBe('18');
    expect(circles[2].getAttribute('r')).toBe('2.9');
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--color', 'red');
    element.style.setProperty('--width', '50px');
    element.style.setProperty('--height', '50px');
    element.style.setProperty('--animation-duration', '2s');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--color')).toBe('red');
    expect(element.style.getPropertyValue('--width')).toBe('50px');
    expect(element.style.getPropertyValue('--height')).toBe('50px');
    expect(element.style.getPropertyValue('--animation-duration')).toBe('2s');
  });
});
