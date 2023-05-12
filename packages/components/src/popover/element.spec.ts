import { html } from 'lit';
import '@blueprintui/components/include/popover.js';
import { BpPopover } from '@blueprintui/components/popover';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

describe('bp-popover', () => {
  let fixture: HTMLElement;
  let element: BpPopover;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-popover>content</bp-popover>`);
    element = fixture.querySelector<BpPopover>('bp-popover');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-popover')).toBe(BpPopover);
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position bottom', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('bottom');
  });

  it('should render close button when closable', async () => {
    element.closable = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
  });

  it('should dispatch a "close" event when the close button is clicked', async () => {
    element.closable = true;
    await elementIsStable(element);

    const event = onceEvent(element, 'close');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });
});
