import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridFooter } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/footer.js';

describe('bp-grid-footer', () => {
  let element: BpGridFooter;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-grid-footer></bp-grid-footer>`);
    element = fixture.querySelector<BpGridFooter>('bp-grid-footer');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should internalize a role gridcell', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').getAttribute('role')).toBe('gridcell');
  });

  it('should assign to the footer slot', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('slot')).toBe('footer');
  });
});
