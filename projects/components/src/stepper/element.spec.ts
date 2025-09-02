import { html } from 'lit';
import '@blueprintui/components/include/stepper.js';
import '@blueprintui/icons/include.js';
import { BpStepper, BpStepperItem } from '@blueprintui/components/stepper';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('stepper element', () => {
  let fixture: HTMLElement;
  let element: BpStepper;
  let items: BpStepperItem[];

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-stepper aria-label="stepper">
        <bp-stepper-item current><a href="#">Step 1</a></bp-stepper-item>
        <bp-stepper-item>Step 2</bp-stepper-item>
        <bp-stepper-item>Step 3</bp-stepper-item>
      </bp-stepper>
    `);
    element = fixture.querySelector<BpStepper>('bp-stepper');
    items = Array.from(element.querySelectorAll<BpStepperItem>('bp-stepper-item'));
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    expect(element).toBeTruthy();
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-stepper')).toBe(BpStepper);
  });

  it('should default to aria role list', async () => {
    expect((element as any)._internals.role).toBe('list');
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.layout).toBe('horizontal');
  });

  it('should support inherited properties', async () => {
    await elementIsStable(element);

    // Test reflected properties
    element.layout = 'vertical';
    await elementIsStable(element);
    expect(element.layout).toBe('vertical');
    expect(element.getAttribute('layout')).toBe('vertical');
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Test ARIA attributes
    expect(element._internals.role).toBe('list');

    // Test that items have proper listitem role
    items.forEach(item => {
      expect(item._internals.role).toBe('listitem');
    });
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--font-size', '16px');
    element.style.setProperty('--font-weight', 'bold');
    element.style.setProperty('--color', 'blue');
    element.style.setProperty('--gap', '1rem');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--font-size')).toBe('16px');
    expect(element.style.getPropertyValue('--font-weight')).toBe('bold');
    expect(element.style.getPropertyValue('--color')).toBe('blue');
    expect(element.style.getPropertyValue('--gap')).toBe('1rem');
  });

  it('should handle slotchange events', async () => {
    await elementIsStable(element);

    // Add a new item to trigger slotchange
    const newItem = document.createElement('bp-stepper-item');
    newItem.textContent = 'Step 4';
    element.appendChild(newItem);

    await elementIsStable(element);
    await elementIsStable(newItem);

    // Verify the new item was properly initialized
    expect(newItem._index).toBe(4);
    expect(newItem._layout).toBe('horizontal');
  });

  it('should handle empty stepper', async () => {
    const emptyFixture = await createFixture(html`<bp-stepper aria-label="empty"></bp-stepper>`);
    const emptyElement = emptyFixture.querySelector<BpStepper>('bp-stepper');

    await elementIsStable(emptyElement);
    expect(emptyElement.items.length).toBe(0);

    removeFixture(emptyFixture);
  });

  it('should handle single item stepper', async () => {
    const singleFixture = await createFixture(html`
      <bp-stepper aria-label="single">
        <bp-stepper-item>Step 1</bp-stepper-item>
      </bp-stepper>
    `);
    const singleElement = singleFixture.querySelector<BpStepper>('bp-stepper');
    const singleItem = singleElement.querySelector<BpStepperItem>('bp-stepper-item');

    await elementIsStable(singleElement);
    expect(singleElement.items.length).toBe(1);
    expect(singleItem._index).toBe(1);
    expect(singleItem._layout).toBe('horizontal');

    removeFixture(singleFixture);
  });

  it('should sync the layout to child steps on layout change', async () => {
    await elementIsStable(element);
    expect(element.layout).toBe('horizontal');
    expect(items[0].matches(':state(layout-horizontal)')).toBe(true);
    expect(items[1].matches(':state(layout-horizontal)')).toBe(true);
    expect(items[2].matches(':state(layout-horizontal)')).toBe(true);

    element.layout = 'vertical';
    await elementIsStable(element);
    await elementIsStable(items[0]);
    expect(element.layout).toBe('vertical');
    expect(items[0].matches(':state(layout-vertical)')).toBe(true);
    expect(items[1].matches(':state(layout-vertical)')).toBe(true);
    expect(items[2].matches(':state(layout-vertical)')).toBe(true);
  });

  it('should sync the layout to child steps on slotchange', async () => {
    element.layout = 'vertical';
    await elementIsStable(element);
    expect(element.layout).toBe('vertical');
    expect(items[0].matches(':state(layout-vertical)')).toBe(true);
    expect(items[1].matches(':state(layout-vertical)')).toBe(true);
    expect(items[2].matches(':state(layout-vertical)')).toBe(true);

    const item = document.createElement('bp-stepper-item');
    item.textContent = 'Step 4';
    element.appendChild(item);
    await elementIsStable(element);
    await elementIsStable(item);
    expect(element.layout).toBe('vertical');
    expect(Array.from(element.querySelectorAll<BpStepperItem>('bp-stepper-item'))[3]._layout).toBe('vertical');
  });

  it('should sync the index to each item', async () => {
    await elementIsStable(element);
    expect(items[0]._index).toBe(1);
    expect(items[1]._index).toBe(2);
    expect(items[2]._index).toBe(3);
  });

  it('should update indices when items are removed', async () => {
    await elementIsStable(element);
    expect(items[0]._index).toBe(1);
    expect(items[1]._index).toBe(2);
    expect(items[2]._index).toBe(3);

    // Remove the first item
    element.removeChild(items[0]);
    await elementIsStable(element);

    const remainingItems = Array.from(element.querySelectorAll<BpStepperItem>('bp-stepper-item'));
    expect(remainingItems[0]._index).toBe(1);
    expect(remainingItems[1]._index).toBe(2);
  });

  it('should handle dynamic item addition and removal', async () => {
    await elementIsStable(element);
    expect(element.items.length).toBe(3);

    // Add item
    const newItem = document.createElement('bp-stepper-item');
    newItem.textContent = 'Step 4';
    element.appendChild(newItem);
    await elementIsStable(element);
    expect(element.items.length).toBe(4);
    expect(newItem._index).toBe(4);

    // Remove item
    element.removeChild(newItem);
    await elementIsStable(element);
    expect(element.items.length).toBe(3);
  });

  it('should handle layout changes after item removal', async () => {
    await elementIsStable(element);

    // Set to vertical layout
    element.layout = 'vertical';
    await elementIsStable(element);
    expect(items[0]._layout).toBe('vertical');

    // Remove an item
    element.removeChild(items[1]);
    await elementIsStable(element);

    // Verify remaining items still have correct layout and updated indices
    const remainingItems = Array.from(element.querySelectorAll<BpStepperItem>('bp-stepper-item'));
    expect(remainingItems[0]._layout).toBe('vertical');
    expect(remainingItems[0]._index).toBe(1);
    expect(remainingItems[1]._layout).toBe('vertical');
    expect(remainingItems[1]._index).toBe(2);
  });

  it('should handle multiple rapid layout changes', async () => {
    await elementIsStable(element);

    element.layout = 'vertical';
    await elementIsStable(element);
    expect(items[0]._layout).toBe('vertical');

    element.layout = 'horizontal';
    await elementIsStable(element);
    expect(items[0]._layout).toBe('horizontal');

    element.layout = 'vertical';
    await elementIsStable(element);
    expect(items[0]._layout).toBe('vertical');
  });

  it('should maintain proper indices when items are reordered', async () => {
    await elementIsStable(element);
    expect(items[0]._index).toBe(1);
    expect(items[1]._index).toBe(2);
    expect(items[2]._index).toBe(3);

    // Move first item to end
    element.appendChild(items[0]);
    await elementIsStable(element);

    const reorderedItems = Array.from(element.querySelectorAll<BpStepperItem>('bp-stepper-item'));
    expect(reorderedItems[0]._index).toBe(1);
    expect(reorderedItems[1]._index).toBe(2);
    expect(reorderedItems[2]._index).toBe(3);
  });
});
