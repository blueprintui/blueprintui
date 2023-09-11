import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import { BpToast } from '@blueprintui/components/toast';
import '@blueprintui/components/include/toast.js';

describe('tag element', () => {
  let fixture: HTMLElement;
  let element: BpToast;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-toast>tag</bp-toast>`);
    element = fixture.querySelector<BpToast>('bp-toast');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-toast')).toBe(BpToast);
  });

  it('should default to status neutral (undefined)', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
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
