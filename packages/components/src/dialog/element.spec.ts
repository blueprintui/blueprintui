import { html } from 'lit';
import '@blueprintui/components/include/dialog.js';
import { BpDialog } from '@blueprintui/components/dialog';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/components/test';

describe('bp-dialog', () => {
  let fixture: HTMLElement;
  let element: BpDialog;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-dialog>content</bp-dialog>`);
    element = fixture.querySelector<BpDialog>('bp-dialog');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-dialog')).toBe(BpDialog);
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position center', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('center');
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
