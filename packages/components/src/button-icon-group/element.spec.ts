import { html } from 'lit';
import '@blueprintui/components/include/button-icon-group.js';
import { BpButtonIconGroup } from '@blueprintui/components/button-icon-group';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('bp-button-icon-group', () => {
  let fixture: HTMLElement;
  let element: BpButtonIconGroup;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-button-icon-group>
        <bp-button-icon></bp-button-icon>
        <bp-button-icon></bp-button-icon>
        <bp-button-icon></bp-button-icon>
      </bp-button-icon-group>
    `);
    element = fixture.querySelector<BpButtonIconGroup>('bp-button-icon-group');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-icon-group')).toBe(BpButtonIconGroup);
  });
});
