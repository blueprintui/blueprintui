import { html } from 'lit';
import '@blueprintui/components/include/stepper.js';
import '@blueprintui/icons/include.js';
import { BpStepperItem } from '@blueprintui/components/stepper';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('stepper element', () => {
  let fixture: HTMLElement;
  let element: BpStepperItem;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-stepper-item></bp-stepper-item>`);
    element = fixture.querySelector<BpStepperItem>('bp-stepper-item');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    expect(element).toBeTruthy();
  });

  it('should register element', async () => {
    expect(customElements.get('bp-stepper-item')).toBe(BpStepperItem);
  });

  it('sets the role to "listitem"', async () => {
    expect(element._internals.role).toBe('listitem');
  });

  it('renders a badge with the index if no status is set', async () => {
    element._index = 1;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-badge').textContent).toBe('1');
  });

  it('renders an icon with the status if set', async () => {
    element.status = 'success';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').type).toBe('solid');
    expect(element.shadowRoot.querySelector('bp-icon').status).toBe('success');
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('success');
  });

  it('sets the layout to "horizontal" by default', async () => {
    expect(element._layout).toBe('horizontal');
  });
});
