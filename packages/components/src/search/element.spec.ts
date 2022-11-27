import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpSearch } from '@blueprintui/components/search';
import '@blueprintui/components/include/search.js';

describe('bp-search', () => {
  let element: BpSearch;
  let fixture: HTMLElement;
  let input: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-search>
        <label>search</label>
        <input type="search" />
        <bp-field-message>message test</bp-field-message>
      </bp-search>
    `);

    element = fixture.querySelector<BpSearch>('bp-search');
    input = element.querySelector<HTMLElement>('input');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
    expect(input).toBeTruthy();
  });
});
