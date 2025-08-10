import { html } from 'lit';
import { BpDialog } from '@blueprintui/components/dialog';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import '@blueprintui/components/include/dialog.js';

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

  it('should dispatch a "toggle" event when the close button is clicked', async () => {
    element.closable = true;
    element.showPopover();
    await elementIsStable(element);

    const event = onceEvent(element, 'toggle');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });
});

describe('bp-dialog - default open', () => {
  let fixture: HTMLElement;
  let element: BpDialog;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-dialog open>content</bp-dialog>`);
    element = fixture.querySelector<BpDialog>('bp-dialog');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should show dialog by default if "open" is set', async () => {
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);
  });
});
