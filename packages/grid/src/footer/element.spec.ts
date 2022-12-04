import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridFooter } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/footer.js';

describe('bp-grid-footer', () => {
  let component: BpGridFooter;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(html`<bp-grid-footer></bp-grid-footer>`);
    component = element.querySelector<BpGridFooter>('bp-grid-footer');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should create component', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should internalize a role gridcell', async () => {
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector('[part=internal]').getAttribute('role')).toBe('gridcell');
  });

  it('should assign to the footer slot', async () => {
    await elementIsStable(component);
    expect(component.getAttribute('slot')).toBe('footer');
  });
});
