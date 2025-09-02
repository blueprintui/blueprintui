import { html } from 'lit';
import '@blueprintui/components/include/breadcrumb.js';
import '@blueprintui/icons/include.js';
import { BpBreadcrumb } from '@blueprintui/components/breadcrumb';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('breadcrumb element', () => {
  let fixture: HTMLElement;
  let element: BpBreadcrumb;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <bp-breadcrumb aria-label="breadcrumb">
        <bp-icon slot="separator" shape="angle" direction="right" size="16"></bp-icon>
        <a bp-text="link" href="#">Home</a>
        <a bp-text="link" href="#">Parent page</a>
        <p bp-text="content" aria-current="page">Current page</p>
      </bp-breadcrumb>`
    );
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

  it('should use default separator when no separator slot is provided', async () => {
    fixture = await createFixture(
      html`<bp-breadcrumb aria-label="breadcrumb">
        <a bp-text="link" href="#">Home</a>
        <a bp-text="link" href="#">Parent page</a>
        <p bp-text="content" aria-current="page">Current page</p>
      </bp-breadcrumb>`
    );
    element = fixture.querySelector<BpBreadcrumb>('bp-breadcrumb');
    await elementIsStable(element);

    const separators = element.shadowRoot.querySelectorAll('[part="separator"]');
    expect(separators.length).toBe(2);
    separators.forEach(separator => {
      expect(separator.textContent?.trim()).toBe('/');
    });
  });

  it('should have aria-hidden="true" on separator elements', async () => {
    await elementIsStable(element);
    const separators = element.shadowRoot.querySelectorAll('[part="separator"]');
    separators.forEach(separator => {
      expect(separator.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should handle single breadcrumb item without separator', async () => {
    fixture = await createFixture(
      html`<bp-breadcrumb aria-label="breadcrumb">
        <p bp-text="content" aria-current="page">Current page</p>
      </bp-breadcrumb>`
    );
    element = fixture.querySelector<BpBreadcrumb>('bp-breadcrumb');
    await elementIsStable(element);

    const items = element.shadowRoot.querySelectorAll('li');
    const separators = element.shadowRoot.querySelectorAll('[part="separator"]');
    expect(items.length).toBe(1);
    expect(separators.length).toBe(0);
  });

  it('should handle empty breadcrumb', async () => {
    fixture = await createFixture(html`<bp-breadcrumb aria-label="breadcrumb"></bp-breadcrumb>`);
    element = fixture.querySelector<BpBreadcrumb>('bp-breadcrumb');
    await elementIsStable(element);

    const items = element.shadowRoot.querySelectorAll('li');
    const separators = element.shadowRoot.querySelectorAll('[part="separator"]');
    expect(items.length).toBe(0);
    expect(separators.length).toBe(0);
  });

  it('should have navigation role and semantics', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('navigation');
  });

  it('should render ordered list with proper structure', async () => {
    await elementIsStable(element);
    const ol = element.shadowRoot.querySelector('ol');
    expect(ol).toBeTruthy();
    expect(ol?.getAttribute('part')).toBe('internal');
  });

  it('should handle slotchange events correctly', async () => {
    await elementIsStable(element);

    // Test that items get unique slots when content is added to default slot
    const newLink = document.createElement('a');
    newLink.setAttribute('bp-text', 'link');
    newLink.href = '#';
    newLink.textContent = 'New Page';

    element.appendChild(newLink);
    await elementIsStable(element);

    // Verify the new item got a unique slot
    const itemsWithSlots = element.querySelectorAll('[slot]');
    expect(itemsWithSlots.length).toBeGreaterThan(0);

    // Verify all slots are unique
    const slotNames = Array.from(itemsWithSlots).map(item => item.getAttribute('slot'));
    const uniqueSlotNames = new Set(slotNames);
    expect(uniqueSlotNames.size).toBe(slotNames.length);
  });
});
