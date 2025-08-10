import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, emulateClick } from '@blueprintui/test';
import { BpRating } from '@blueprintui/components/rating';
import '@blueprintui/components/include/rating.js';

describe('bp-rating', () => {
  let element: BpRating;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>rating</label>
        <bp-rating></bp-rating>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpRating>('bp-rating');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-rating')).toBe(BpRating);
  });

  it('should update the value when a given star is clicked', async () => {
    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));
    expect(element.value).toBe(0);

    emulateClick(stars[2]);
    await elementIsStable(element);
    expect(element.value).toBe(3);
  });

  it('should update the value when range is used for keynav selection', async () => {
    const range = element.shadowRoot.querySelector<HTMLInputElement>('input');
    expect(element.value).toBe(0);
    range.valueAsNumber = 2;
    range.dispatchEvent(new Event('input'));
    await elementIsStable(element);
    expect(element.value).toBe(2);
  });

  it('should update star selection from value', async () => {
    element.value = 3;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(3);
  });

  it('should set value to 0 if selected rating is toggled', async () => {
    element.value = 3;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(3);

    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));
    emulateClick(stars[2]);
    await elementIsStable(element);
    expect(element.value).toBe(0);
  });
});
