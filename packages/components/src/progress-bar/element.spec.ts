import { html } from 'lit';
import '@blueprintui/components/include/progress-bar.js';
import { BpProgressBar } from '@blueprintui/components/progress-bar';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('progress bar element – ', () => {
  let fixture: HTMLElement;
  let element: BpProgressBar;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-progress-bar></bp-progress-bar>`);
    element = fixture.querySelector<BpProgressBar>('bp-progress-bar');
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
});
