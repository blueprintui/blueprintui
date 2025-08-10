import { html } from 'lit';
import '@blueprintui/components/include/card.js';
import { BpCard } from '@blueprintui/components/card';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('card element', () => {
  let fixture: HTMLElement;
  let card: BpCard;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-card>
        <div slot="header">header</div>
        content
        <div slot="footer">footer</div>
      </bp-card>
    `);
    card = fixture.querySelector<BpCard>('bp-card');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should default to aria role region', async () => {
    await elementIsStable(card);
    expect((card as any)._internals.role).toBe('region');
  });
});
