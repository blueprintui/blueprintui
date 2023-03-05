import { html } from 'lit';
import '@blueprintui/components/include/tooltip.js';
import { BpTooltip } from '@blueprintui/components/tooltip';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/components/test';

describe('bp-tooltip', () => {
  let fixture: HTMLElement;
  let element: BpTooltip;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-tooltip>content</bp-tooltip>`);
    element = fixture.querySelector<BpTooltip>('bp-tooltip');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tooltip')).toBe(BpTooltip);
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position top', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('top');
  });

  it('should render close button when closable', async () => {
    element.closable = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
  });

  it('should default role tooltip', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tooltip');
  });

  it('should dispatch a "close" event when the close button is clicked', async () => {
    element.closable = true;
    await elementIsStable(element);

    const event = onceEvent(element, 'close');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });
});
