import { html } from 'lit';
import '@blueprintui/components/include/toggletip.js';
import { BpToggletip } from '@blueprintui/components/toggletip';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-toggletip', () => {
  let fixture: HTMLElement;
  let element: BpToggletip;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-toggletip>content</bp-toggletip>`);
    element = fixture.querySelector<BpToggletip>('bp-toggletip');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-toggletip')).toBe(BpToggletip);
  });

  it('should default to position top', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('top');
  });

  it('should default role tooltip', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tooltip');
  });
});
