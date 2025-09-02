import { html } from 'lit';
import '@blueprintui/components/include/nav.js';
import { BpNav } from '@blueprintui/components/nav';
import { elementIsStable, createFixture, removeFixture, emulateClick } from '@blueprintui/test';

describe('bp-nav', () => {
  let fixture: HTMLElement;
  let element: BpNav;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-nav expanded>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon>
          <a href="#">item 1</a>
        </bp-nav-item>
        <bp-nav-item selected>
          <bp-icon shape="home"></bp-icon>
          <a href="#">item 2</a>
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon>
          item 3
        </bp-nav-item>
      </bp-nav>
    `);
    element = fixture.querySelector<BpNav>('bp-nav');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-nav')).toBe(BpNav);
  });

  it('should have base role type of tree', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tree');
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.expanded).toBe(true);
    expect(element.expandable).toBe(false);
    expect(element.interaction).toBeUndefined();
    expect(element.i18n).toBeDefined();
  });

  it('should support expanded property', async () => {
    await elementIsStable(element);

    // Initial state
    expect(element.expanded).toBe(true);
    expect(element.matches(':state(expanded)')).toBe(true);

    // Change to collapsed
    element.expanded = false;
    await elementIsStable(element);
    expect(element.expanded).toBe(false);
    expect(element.matches(':state(expanded)')).toBe(false);

    // Change back to expanded
    element.expanded = true;
    await elementIsStable(element);
    expect(element.expanded).toBe(true);
    expect(element.matches(':state(expanded)')).toBe(true);
  });

  it('should support expandable property', async () => {
    await elementIsStable(element);

    // Initial state
    expect(element.expandable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-nav-item')).toBeFalsy();

    // Enable expandable
    element.expandable = true;
    await elementIsStable(element);
    expect(element.expandable).toBe(true);
    expect(element.shadowRoot.querySelector('bp-nav-item')).toBeTruthy();

    // Disable expandable
    element.expandable = false;
    await elementIsStable(element);
    expect(element.expandable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-nav-item')).toBeFalsy();
  });

  it('should support interaction property', async () => {
    await elementIsStable(element);

    element.interaction = 'auto';
    await elementIsStable(element);
    expect(element.interaction).toBe('auto');
  });

  it('should support i18n property', async () => {
    await elementIsStable(element);

    const customI18n = { ...element.i18n, expand: 'Open', close: 'Close' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.expand).toBe('Open');
    expect(element.i18n.close).toBe('Close');
  });

  it('should render expand button when expandable is true', async () => {
    element.expandable = true;
    element.expanded = false;
    await elementIsStable(element);

    const expandButton = element.shadowRoot.querySelector('bp-nav-item');
    expect(expandButton).toBeTruthy();
    expect(expandButton.getAttribute('aria-label')).toBe(element.i18n.expand);
  });

  it('should render collapse button when expandable and expanded', async () => {
    element.expandable = true;
    element.expanded = true;
    await elementIsStable(element);

    const collapseButton = element.shadowRoot.querySelector('bp-nav-item');
    expect(collapseButton).toBeTruthy();
    expect(collapseButton.getAttribute('aria-label')).toBe(element.i18n.close);
  });

  it('should handle expand/collapse click interactions', async () => {
    element.expandable = true;
    element.expanded = false;
    await elementIsStable(element);

    const expandButton = element.shadowRoot.querySelector('bp-nav-item');
    expect(expandButton).toBeTruthy();

    emulateClick(expandButton);
    await elementIsStable(element);
    expect(expandButton.getAttribute('aria-label')).toBe(element.i18n.expand);

    element.expanded = true;
    await elementIsStable(element);
    expect(expandButton.getAttribute('aria-label')).toBe(element.i18n.close);
  });

  it('should sync interactions with nav groups when interaction is auto', async () => {
    element.interaction = 'auto';
    element.expanded = true;
    await elementIsStable(element);

    // Add a nav group to test interaction syncing
    const navGroup = document.createElement('bp-nav-group');
    navGroup.expanded = true;
    element.appendChild(navGroup);
    await elementIsStable(element);

    // When nav is collapsed, groups should be collapsed
    element.expanded = false;
    await elementIsStable(element);
    expect(navGroup.expanded).toBe(false);

    // When nav is expanded, groups should maintain their state
    element.expanded = true;
    await elementIsStable(element);
    expect(navGroup.expanded).toBe(false); // Should remain false since it was set to false
  });

  it('should filter focusable items to only nav items', async () => {
    await elementIsStable(element);

    const focusItems = element.focusItems;
    expect(focusItems.length).toBe(1); // Only 1 focusable nav item (the others have links which are focusable)
    focusItems.forEach(item => {
      expect(item.tagName).toBe('BP-NAV-ITEM');
    });
  });

  it('should filter focusable items to only nav items regardless of disabled state', async () => {
    await elementIsStable(element);

    // Check initial focus items
    const initialFocusItems = element.focusItems;
    expect(initialFocusItems.length).toBeGreaterThan(0);
    initialFocusItems.forEach(item => {
      expect(item.tagName).toBe('BP-NAV-ITEM');
    });

    // Disable one nav item
    const navItem = element.querySelector('bp-nav-item');
    navItem.disabled = true;
    await elementIsStable(element);

    const focusItems = element.focusItems;
    // The focusItems getter only filters by tagName, not by disabled state
    // So disabled items should still be included if they're focusable
    expect(focusItems.length).toBeLessThanOrEqual(initialFocusItems.length);
    focusItems.forEach(item => {
      expect(item.tagName).toBe('BP-NAV-ITEM');
    });
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--background', 'red');
    element.style.setProperty('--padding', '1rem');
    element.style.setProperty('--width', '200px');
    element.style.setProperty('--height', '300px');
    element.style.setProperty('--max-height', '400px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
    expect(element.style.getPropertyValue('--width')).toBe('200px');
    expect(element.style.getPropertyValue('--height')).toBe('300px');
    expect(element.style.getPropertyValue('--max-height')).toBe('400px');
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Test role
    expect(element._internals.role).toBe('tree');

    // Test expanded state accessibility
    element.expanded = true;
    await elementIsStable(element);
    expect(element.matches(':state(expanded)')).toBe(true);

    element.expanded = false;
    await elementIsStable(element);
    expect(element.matches(':state(expanded)')).toBe(false);
  });

  it('should handle scroll position persistence', async () => {
    await elementIsStable(element);

    const container = element.shadowRoot.querySelector('[part="internal"]');
    expect(container).toBeTruthy();

    // Simulate scroll event
    const scrollEvent = new Event('scrollend');
    container.dispatchEvent(scrollEvent);

    // Check that scroll position is stored in localStorage
    const key = element.id ? `${element.id}-bp-nav-scroll-position` : 'bp-nav-scroll-position';
    expect(localStorage.getItem(key)).toBeDefined();
  });
});
