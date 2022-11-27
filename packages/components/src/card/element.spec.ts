
import { html } from 'lit';
import '@blueprintui/components/include/card.js';
import { BpCard, BpCardFooter, BpCardHeader } from '@blueprintui/components/card';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('card element', () => {
  let fixture: HTMLElement;
  let card: BpCard;
  let header: BpCardHeader;
  let footer: BpCardFooter;

  beforeEach(async () => {
    fixture = await createFixture(html`
    <bp-card>
      <bp-card-header>header</bp-card-header>
      content
      <bp-card-footer>footer</bp-card-footer>
    </bp-card>
    `);
    card = fixture.querySelector<BpCard>('bp-card');
    header = fixture.querySelector<BpCardHeader>('bp-card-header');
    footer = fixture.querySelector<BpCardFooter>('bp-card-footer');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should default to aria role region', async () => {
    await elementIsStable(card);
    expect((card as any)._internals.role).toBe('region');
  });

  it('should support system elevation styles', async () => {
    await elementIsStable(card);
    expect(card.shadowRoot.querySelector('[elevation]')).toBeTruthy();
  });

  it('should set slot for card header', async () => {
    await elementIsStable(header);
    expect(header.slot).toBe('header');
  });

  it('should set slot for card footer', async () => {
    await elementIsStable(footer);
    expect(footer.slot).toBe('footer');
  });
});
