import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
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
  it('should', async () => {
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
});
