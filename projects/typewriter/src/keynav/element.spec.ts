import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpKeynavList } from './element.js';

customElements.get('bp-keynav-list') ?? customElements.define('bp-keynav-list', BpKeynavList);

describe('bp-keynav-list', () => {
  let element: BpKeynavList;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-keynav-list>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
      </bp-keynav-list>
    `);
    element = fixture.querySelector<BpKeynavList>('bp-keynav-list')!;
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should be registered as a custom element', () => {
    expect(customElements.get('bp-keynav-list')).toBe(BpKeynavList);
  });

  it('should have role="presentation" via internals', async () => {
    const slot = element.shadowRoot!.querySelector('slot');
    expect(slot!.getAttribute('role')).toBe('presentation');
  });

  it('should default layout to grid', () => {
    expect(element.layout).toBe('grid');
  });

  it('should reflect layout attribute', async () => {
    element.layout = 'inline';
    await elementIsStable(element);
    expect(element.getAttribute('layout')).toBe('inline');

    element.layout = 'block';
    await elementIsStable(element);
    expect(element.getAttribute('layout')).toBe('block');
  });

  it('should support columns property', async () => {
    element.columns = 3;
    await elementIsStable(element);
    expect(element.columns).toBe(3);
  });

  it('should support loop property', async () => {
    element.loop = true;
    await elementIsStable(element);
    expect(element.loop).toBe(true);
  });

  it('should return a flat array for inline layout grid', async () => {
    element.layout = 'inline';
    await elementIsStable(element);
    const grid = element.grid;
    expect(grid.length).toBe(1);
    expect(grid[0].length).toBe(6);
  });

  it('should return a 2D array for grid layout', async () => {
    element.columns = 3;
    await elementIsStable(element);
    const grid = element.grid;
    expect(grid.length).toBe(2);
    expect(grid[0].length).toBe(3);
    expect(grid[1].length).toBe(3);
  });

  it('should render a slot with role="presentation"', async () => {
    const slot = element.shadowRoot!.querySelector('slot');
    expect(slot).not.toBeNull();
    expect(slot!.getAttribute('role')).toBe('presentation');
  });

  it('should use display contents style', async () => {
    expect(getComputedStyle(element).display).toBe('contents');
  });
});
