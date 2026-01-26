import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import {
  attachInternals,
  associateInputAndLabel,
  associateAriaDescribedBy,
  associateInputToDatalist,
  associateAriaLabel,
  associateFieldNames
} from '@blueprintui/components/internals';

@customElement('element-internals-test-element')
class ElementInternalTestElement extends LitElement {
  declare _internals: ElementInternals;

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
  }
}

describe('attachInternals', () => {
  let element: ElementInternalTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<element-internals-test-element></element-internals-test-element>`);
    element = fixture.querySelector<ElementInternalTestElement>('element-internals-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should attach element internals object', async () => {
    await elementIsStable(element);
    expect(element._internals).toBeTruthy();
  });
});

describe('associateInputAndLabel', () => {
  it('should associate the label and input using a id and for attribute', async () => {
    const input = (await createFixture()) as HTMLInputElement;
    const label = (await createFixture()) as HTMLLabelElement;
    input.id = 'test-id';
    associateInputAndLabel(input, label);

    expect(input.id).toBe('test-id');
    expect(label.getAttribute('for')).toBe('test-id');

    input.id = '';
    associateInputAndLabel(input, label);
    expect(input.id.includes('_')).toBe(true);
    expect(label.getAttribute('for')).toBe(input.id);
    removeFixture(input);
    removeFixture(label);
  });

  it('should focus input when label is clicked', async () => {
    const input = (await createFixture()) as HTMLInputElement;
    const label = (await createFixture()) as HTMLLabelElement;
    associateInputAndLabel(input, label);
    expect(document.activeElement).toBe(document.body);
    // emulateClick(label);
    // expect(document.activeElement).toBe(input);
  });
});

describe('associateAriaDescribedBy', () => {
  it('should', async () => {
    const input = (await createFixture()) as HTMLInputElement;
    const span = (await createFixture()) as HTMLElement;
    const spanTwo = (await createFixture()) as HTMLElement;

    associateAriaDescribedBy(input, [span, spanTwo]);
    expect(input.getAttribute('aria-describedby')).toBe(`${span.id} ${spanTwo.id}`);

    span.id = 'one';
    spanTwo.id = 'two';

    associateAriaDescribedBy(input, [span, spanTwo]);
    expect(input.getAttribute('aria-describedby')).toBe(`one two`);

    removeFixture(input);
    removeFixture(span);
    removeFixture(spanTwo);
  });
});

describe('associateInputToDatalist', () => {
  it('should associate a datalist to given input', () => {
    const input = document.createElement('input');
    const datalist = document.createElement('datalist');
    input.id = 'test-id';

    associateInputToDatalist(input, datalist);

    expect(datalist.id).toBe('test-id-datalist');
    expect(input.getAttribute('list')).toBe('test-id-datalist');

    input.id = '';
    associateInputToDatalist(input, datalist);
    expect(input.id.includes('_')).toBe(true);
    expect(datalist.id).toBe(`${input.id}-datalist`);
    input.remove();
    datalist.remove();
  });
});

describe('associateAriaLabel', () => {
  it('should associate label with IDREF to input', async () => {
    const input = document.createElement('input');
    const label = document.createElement('label');

    expect(label.getAttribute('aria-labelledby')).toBe(null);
    associateAriaLabel(input, label);
    expect(label.getAttribute('aria-labelledby')).toBe(input.id);

    input.remove();
    label.remove();
  });
});

describe('associateFieldNames', () => {
  it('should create a name and associate inputs', async () => {
    const inputs = [document.createElement('input'), document.createElement('input')];

    associateFieldNames(inputs);
    expect(inputs[0].name.includes('_')).toBe(true);
    expect(inputs[0].name).toBe(inputs[1].name);

    inputs.forEach(i => i.remove());
  });

  it('should not override existing name values', async () => {
    const inputs = [document.createElement('input'), document.createElement('input')];
    inputs.forEach(i => (i.name = 'test-name'));
    inputs[0].name = null;
    inputs[0].setAttribute('name', 'test-name');

    associateFieldNames(inputs);
    expect(inputs[0].name).toBe('test-name');
    expect(inputs[0].name).toBe(inputs[1].name);

    inputs.forEach(i => i.remove());
  });

  it('should set name attribute directly, not just the property', async () => {
    const inputs = [document.createElement('input'), document.createElement('input')];

    associateFieldNames(inputs);

    // Verify both property and attribute are set
    expect(inputs[0].name).toBeTruthy();
    expect(inputs[0].getAttribute('name')).toBeTruthy();
    expect(inputs[0].name).toBe(inputs[0].getAttribute('name'));
    expect(inputs[1].getAttribute('name')).toBe(inputs[0].getAttribute('name'));

    inputs.forEach(i => i.remove());
  });

  it('should work with elements that have property descriptors', async () => {
    const inputs = [document.createElement('input'), document.createElement('input')];

    // Simulate a component that defines name property via descriptor (like bp-radio)
    Object.defineProperty(inputs[0], 'name', {
      get: () => inputs[0].getAttribute('name'),
      set: (value: string) => inputs[0].setAttribute('name', value),
      configurable: true
    });

    Object.defineProperty(inputs[1], 'name', {
      get: () => inputs[1].getAttribute('name'),
      set: (value: string) => inputs[1].setAttribute('name', value),
      configurable: true
    });

    associateFieldNames(inputs);

    // Should set attribute directly, which then makes property work via descriptor
    expect(inputs[0].name).toBeTruthy();
    expect(inputs[0].name.includes('_')).toBe(true);
    expect(inputs[0].getAttribute('name')).toBeTruthy();
    expect(inputs[0].name).toBe(inputs[1].name);
    expect(inputs[0].getAttribute('name')).toBe(inputs[1].getAttribute('name'));

    inputs.forEach(i => i.remove());
  });

  it('should work when property descriptor is not yet defined', async () => {
    const inputs = [document.createElement('input'), document.createElement('input')];

    // Simulate timing issue where name property descriptor hasn't been defined yet
    // In this case, setting via setAttribute should still work
    delete (inputs[0] as any).name;
    delete (inputs[1] as any).name;

    associateFieldNames(inputs);

    // Attribute should be set regardless
    expect(inputs[0].getAttribute('name')).toBeTruthy();
    expect(inputs[1].getAttribute('name')).toBeTruthy();
    expect(inputs[0].getAttribute('name')).toBe(inputs[1].getAttribute('name'));
    expect(inputs[0].getAttribute('name').includes('_')).toBe(true);

    inputs.forEach(i => i.remove());
  });
});
