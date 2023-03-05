import { html } from 'lit';
import '@blueprintui/components/include/progress-circle.js';
import { BpProgressCircle } from '@blueprintui/components/progress-circle';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('progress circle element – ', () => {
  let fixture: HTMLElement;
  let element: BpProgressCircle;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-progress-circle></bp-progress-circle>`);
    element = fixture.querySelector<BpProgressCircle>('bp-progress-circle');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should not have aria attrs if value is not set', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe(null);
    expect((element as any)._internals.ariaValueMin).toBe('0');
    expect((element as any)._internals.ariaValueMax).toBe('1');
    expect((element as any)._internals.role).toBe('progressbar');
  });

  it('should set progressbar semantics if value set', async () => {
    element.value = 49;
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe('49');
    expect((element as any)._internals.ariaValueMin).toBe('0');
    expect((element as any)._internals.ariaValueMax).toBe('100');
    expect((element as any)._internals.role).toBe('progressbar');
  });

  it('should show indeterminate label if no label is set and there is no value', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.ariaLabel).toBe('loading');
  });

  it('should have class backstroke if value is not set', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).not.toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).toBe(null);
  });

  it('should have classname backstroke if value set but less than 100', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).not.toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).toBe(null);
  });

  it('should have classname of arcstroke if value is greater than 99', async () => {
    element.value = 100;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).not.toBe(null);
  });

  // it('updates loading i18n strings as expected', async () => {
  //   component.value = 75;
  //   await elementIsStable(component);
  //   component.i18n = { loading: '${value}' } as any;
  //   await elementIsStable(component);
  //   expect((component as any)._internals.ariaLabel).toBe('loading 75');
  // });
});
