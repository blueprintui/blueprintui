import { html } from 'lit';
import '@blueprintui/components/include/breadcrumb.js';
import '@blueprintui/icons/include.js';
import { BpBreadcrumb } from '@blueprintui/components/breadcrumb';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('breadcrumb element', () => {
  let fixture: HTMLElement;
  let element: BpBreadcrumb;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-breadcrumb aria-label="breadcrumb">
      <bp-icon slot="separator" shape="angle" direction="right" size="16"></bp-icon>
      <a bp-text="link" href="#">Home</a>
      <a bp-text="link" href="#">Parent page</a>
      <p bp-text="content" aria-current="page">Current page</p>
    </bp-breadcrumb>`);
    element = fixture.querySelector<BpBreadcrumb>('bp-breadcrumb');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should assign a unique slot to each item', async () => {
    await elementIsStable(element);
    const items = element.querySelectorAll('[slot]');
    expect(items.length).toBe(4);
  });

  it('should create a list item for each breadcrumb item in the slot', async () => {
    await elementIsStable(element);
    const items = element.shadowRoot.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  it('should create a separator between each breadcrumb item in the slot', async () => {
    await elementIsStable(element);
    const separators = element.shadowRoot.querySelectorAll('[part="separator"]');
    expect(separators.length).toBe(2);
  });
});
