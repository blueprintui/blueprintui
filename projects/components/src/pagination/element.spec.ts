import { html } from 'lit';
import '@blueprintui/components/include/input.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/pagination.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { BpPagination } from '@blueprintui/components/pagination';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-pagination', () => {
  let fixture: HTMLElement;
  let element: BpPagination;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-pagination aria-label="pagination">
        <bp-button-icon slot="first"></bp-button-icon>
        <bp-button-icon slot="prev"></bp-button-icon>
        <bp-field novalidate>
          <bp-input type="number" value="1" size="2" min="1" max="99" aria-label="current page"></bp-input>
          <bp-field-message>/ 3</bp-field-message>
        </bp-field>
        <bp-button-icon slot="next"></bp-button-icon>
        <bp-button-icon slot="last"></bp-button-icon>
      </bp-pagination>
    `);
    element = fixture.querySelector<BpPagination>('bp-pagination');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-pagination')).toBe(BpPagination);
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
  });

  it('should assign field styles if pagination input given', async () => {
    await elementIsStable(element);
    const field = element.querySelector('bp-field');
    expect(field.controlWidth).toBe('shrink');
    expect(field.layout).toBe('compact');
  });

  it('should assign proper styles to slotted icon buttons', async () => {
    await elementIsStable(element);

    const first = fixture.querySelector<BpButtonIcon>('[slot=first]');
    const last = fixture.querySelector<BpButtonIcon>('[slot=last]');
    const prev = fixture.querySelector<BpButtonIcon>('[slot=prev]');
    const next = fixture.querySelector<BpButtonIcon>('[slot=next]');

    expect(first.ariaLabel).toBe('first');
    expect(first.shape).toBe('step-forward-2');
    expect(first.direction).toBe('down');

    expect(last.ariaLabel).toBe('last');
    expect(last.shape).toBe('step-forward-2');
    expect(last.direction).toBe('up');

    expect(prev.ariaLabel).toBe('previous');
    expect(prev.shape).toBe('angle');
    expect(prev.direction).toBe('left');

    expect(next.ariaLabel).toBe('next');
    expect(next.shape).toBe('angle');
    expect(next.direction).toBe('right');
  });

  it('should assign flat action to all slotted icon buttons', async () => {
    await elementIsStable(element);

    const first = fixture.querySelector<BpButtonIcon>('[slot=first]');
    const last = fixture.querySelector<BpButtonIcon>('[slot=last]');
    const prev = fixture.querySelector<BpButtonIcon>('[slot=prev]');
    const next = fixture.querySelector<BpButtonIcon>('[slot=next]');

    expect(first.action).toBe('flat');
    expect(last.action).toBe('flat');
    expect(prev.action).toBe('flat');
    expect(next.action).toBe('flat');
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should handle missing field gracefully', async () => {
    // Create a fixture without the field
    const noFieldFixture = await createFixture(html`
      <bp-pagination aria-label="pagination">
        <bp-button-icon slot="first"></bp-button-icon>
        <bp-button-icon slot="prev"></bp-button-icon>
        <bp-button-icon slot="next"></bp-button-icon>
        <bp-button-icon slot="last"></bp-button-icon>
      </bp-pagination>
    `);
    const noFieldElement = noFieldFixture.querySelector<BpPagination>('bp-pagination');

    await elementIsStable(noFieldElement);
    // Should not throw error when no field is present
    expect(noFieldElement).toBeTruthy();

    removeFixture(noFieldFixture);
  });

  it('should handle missing button slots gracefully', async () => {
    // Create a fixture with only some buttons
    const partialFixture = await createFixture(html`
      <bp-pagination aria-label="pagination">
        <bp-button-icon slot="prev"></bp-button-icon>
        <bp-field novalidate>
          <bp-input type="number" value="1" size="2" min="1" max="99" aria-label="current page"></bp-input>
          <bp-field-message>/ 3</bp-field-message>
        </bp-field>
        <bp-button-icon slot="next"></bp-button-icon>
      </bp-pagination>
    `);
    const partialElement = partialFixture.querySelector<BpPagination>('bp-pagination');

    await elementIsStable(partialElement);
    // Should not throw error when some buttons are missing
    expect(partialElement).toBeTruthy();

    removeFixture(partialFixture);
  });

  it('should use i18n property for button aria labels', async () => {
    await elementIsStable(element);

    const prev = fixture.querySelector<BpButtonIcon>('[slot=prev]');
    const next = fixture.querySelector<BpButtonIcon>('[slot=next]');

    // Verify buttons use the i18n property values
    expect(prev.ariaLabel).toBe(element.i18n.previous);
    expect(next.ariaLabel).toBe(element.i18n.next);
  });
});
