
import { html } from 'lit';
import '@blueprintui/components/include/button-expand.js';
import { BpButtonExpand } from '@blueprintui/components/button-expand';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('button-expand element', () => {
  let fixture: HTMLElement;
  let element: BpButtonExpand;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-expand></bp-button-expand>`);
    element = fixture.querySelector<BpButtonExpand>('bp-button-expand');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-button-icon')).toBe(true);
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
    element.expanded = true;

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
    element.expanded = true;
    
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.action).toBe('horizontal');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('left');
  });
});
