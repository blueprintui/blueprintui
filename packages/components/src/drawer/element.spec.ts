import { html } from 'lit';
import '@blueprintui/components/include/drawer.js';
import { BpDrawer } from '@blueprintui/components/drawer';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/components/test';

describe('bp-drawer', () => {
  let fixture: HTMLElement;
  let element: BpDrawer;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-drawer>content</bp-drawer>`);
    element = fixture.querySelector<BpDrawer>('bp-drawer');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-drawer')).toBe(BpDrawer);
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position left', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('left');
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
    expect((await event)).toBeTruthy();
  });
});
