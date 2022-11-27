import { html } from 'lit';
import '@blueprintui/components/include/dialog.js';
import { BpDialogFooter } from '@blueprintui/components/dialog';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('bp-dialog-footer', () => {
  let fixture: HTMLElement;
  let element: BpDialogFooter;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-dialog>
        <bp-dialog-footer>footer</bp-dialog-footer>
      </bp-dialog>
    `);
    element = fixture.querySelector<BpDialogFooter>('bp-dialog-footer');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-dialog-footer')).toBe(BpDialogFooter);
  });

  it('should assign default slot of footer', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('footer');
  });
});
