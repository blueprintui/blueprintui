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
});
