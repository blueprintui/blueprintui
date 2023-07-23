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

  it('should sync the layout to child steps on layout change', async () => {
    await elementIsStable(element);
    expect(element.layout).toBe('horizontal');
    expect(items[0].matches(':--layout-horizontal')).toBe(true);
    expect(items[1].matches(':--layout-horizontal')).toBe(true);
    expect(items[2].matches(':--layout-horizontal')).toBe(true);

    element.layout = 'vertical';
    await elementIsStable(element);
    await elementIsStable(items[0]);
    expect(element.layout).toBe('vertical');
    expect(items[0].matches(':--layout-vertical')).toBe(true);
    expect(items[1].matches(':--layout-vertical')).toBe(true);
    expect(items[2].matches(':--layout-vertical')).toBe(true);
  });

  it('should sync the layout to child steps on slotchange', async () => {
    element.layout = 'vertical';
    await elementIsStable(element);
    expect(element.layout).toBe('vertical');
    expect(items[0].matches(':--layout-vertical')).toBe(true);
    expect(items[1].matches(':--layout-vertical')).toBe(true);
    expect(items[2].matches(':--layout-vertical')).toBe(true);

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
});
