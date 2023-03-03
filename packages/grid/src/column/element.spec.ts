import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpGridColumn } from './grid-column.element.js';
import '@blueprintui/grid/include/core.js';

describe('bp-grid-column', () => {
  let element: BpGridColumn;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-grid-column></bp-grid-column>`);
    element = fixture.querySelector<BpGridColumn>('bp-grid-column');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should initialize with no set width', async () => {
    await elementIsStable(element);
    expect(element.width).toBe(undefined);
  });

  it('should initialize with no set type', async () => {
    await elementIsStable(element);
    expect(element.type).toBe(undefined);
  });

  it('should initialize with default position', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('');
  });

  it('should default to the column slot for host', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('columns');
  });

  it('the private host element should be a focusable type', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').hasAttribute('focusable')).toBe(true);
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
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').getAttribute('role')).toBe('group');
  });
});
