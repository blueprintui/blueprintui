import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridColumn } from './grid-column.element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-column', () => {
  let component: BpGridColumn;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(html`<bp-grid-column></bp-grid-column>`);
    component = element.querySelector<BpGridColumn>('bp-grid-column');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should create component', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should initialize with no set width', async () => {
    await elementIsStable(component);
    expect(component.width).toBe(undefined);
  });

  it('should initialize with no set type', async () => {
    await elementIsStable(component);
    expect(component.type).toBe(undefined);
  });

  it('should initialize with default position', async () => {
    await elementIsStable(component);
    expect(component.position).toBe('');
  });

  it('should default to the column slot for host', async () => {
    await elementIsStable(component);
    expect(component.slot).toBe('columns');
  });

  it('the private host element should be a focusable type', async () => {
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector('[part=internal]').hasAttribute('focusable')).toBe(true);
  });

  /**
   * Role group prevents double label read when navigating cells with SRs
   * https://github.com/nvaccess/nvda/pull/12763
   * https://github.com/nvaccess/nvda/issues/12392
   * https://github.com/nvaccess/nvda/issues/11181
   * https://github.com/nvaccess/nvda/issues/10096
   * https://github.com/nvaccess/nvda/issues/9017
   * https://github.com/nvaccess/nvda/issues/6826
   */
  it('the private host element should have a role group to improve screen reader readability', async () => {
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector('[part=internal]').getAttribute('role')).toBe('group');
  });
});
