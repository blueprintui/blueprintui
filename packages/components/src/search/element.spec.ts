import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpSearch } from '@blueprintui/components/search';
import '@blueprintui/components/include/search.js';

describe('bp-search', () => {
  let element: BpSearch;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>search</label>
        <bp-search></bp-search>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpSearch>('bp-search');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-search')).toBe(BpSearch);
  });

  it('should default its input type to "search"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('search');
  });

  it('should render the search icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    expect(icon.shape).toBe('search');
    expect(icon.readonly).toBe(true);
  });
});
