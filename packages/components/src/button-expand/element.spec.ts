import { html } from 'lit';
import '@blueprintui/components/include/button-expand.js';
import { BpButtonExpand } from '@blueprintui/components/button-expand';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('button-expand element', () => {
  let fixture: HTMLElement;
  let element: BpButtonExpand;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-expand name="expand"></bp-button-expand>`);
    element = fixture.querySelector<BpButtonExpand>('bp-button-expand');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-expand')).toBe(BpButtonExpand);
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('expand');
  });

  it('should set role of switch', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('switch');
  });

  it('should default to vertical action', async () => {
    await elementIsStable(element);
    expect(element.action).toBe('vertical');
  });

  it('should display colapsed vertical angle icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.action).toBe('vertical');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('right');
  });

  it('should display expanded vertical angle icon', async () => {
    element.checked = true;

    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.action).toBe('vertical');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('down');
  });

  it('should display colapsed horizontal angle icon', async () => {
    element.action = 'horizontal';
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.action).toBe('horizontal');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('right');
  });

  it('should display expanded horizontal angle icon', async () => {
    element.action = 'horizontal';
    element.checked = true;

    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.action).toBe('horizontal');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('left');
  });

  it('should not have a tabindex if readonly or disabled', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });
});
