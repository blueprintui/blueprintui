import { html } from 'lit';
import '@blueprintui/components/include/button-icon.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-icon element', () => {
  let fixture: HTMLElement;
  let element: BpButtonIcon;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-icon>button action</bp-button-icon>`);
    element = fixture.querySelector<BpButtonIcon>('bp-button-icon');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('button action');
  });

  it('should default to placeholder icon', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('ellipsis-vertical');
  });

  it('should support custom icon shapes', async () => {
    element.shape = 'test';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('test');
  });

  it('should set solid state icon if pressed', async () => {
    element.pressed = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').type).toBe('solid');
  });

  it('should set solid state icon if expanded', async () => {
    element.expanded = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').type).toBe('solid');
  });
});
