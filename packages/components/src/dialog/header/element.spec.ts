import { html } from 'lit';
import '@blueprintui/components/include/dialog.js';
import { BpDialogHeader } from '@blueprintui/components/dialog';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('bp-dialog-header', () => {
  let fixture: HTMLElement;
  let element: BpDialogHeader;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-dialog>
        <bp-dialog-header>header</bp-dialog-header>
      </bp-dialog>
    `);
    element = fixture.querySelector<BpDialogHeader>('bp-dialog-header');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-dialog-header')).toBe(BpDialogHeader);
  });

  it('should assign default slot of header', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('header');
  });
});
