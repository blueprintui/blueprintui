import { html } from 'lit';
import { BpInput } from '@blueprintui/components/input';
import '@blueprintui/components/include/input.js';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { BpFieldMessage } from '../forms';

describe('bp-input', () => {
  let element: BpInput;
  let label: HTMLLabelElement;
  let message: BpFieldMessage;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <bp-input></bp-input>
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpInput>('bp-input');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    label = fixture.querySelector<HTMLLabelElement>('label');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-input')).toBe(BpInput);
  });

  it('should allow change events dispatched by component', async () => {
    await elementIsStable(element);
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'change');

    (element as any).onChange({ target: { value: 'hello' }, preventDefault, stopPropagation });

    expect(element.value).toBe('hello');
    expect(await event).toBeTruthy();
  });

  it('should allow input events dispatched by component', async () => {
    await elementIsStable(element);
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'input');

    (element as any).onInput({ target: { value: 'hello' }, data: 'hello', preventDefault, stopPropagation });

    expect(element.value).toBe('hello');
    expect((await event).data).toBe('hello');
  });

  it('should associate input and label', async () => {
    await elementIsStable(element);
    expect(element.id).toBe(label.htmlFor);
    expect(label.htmlFor).toBe(element.id);
    expect(element.id.includes('_')).toBe(true);
  });

  it('should associate message and input', async () => {
    await elementIsStable(element);
    expect(element.id.includes('_')).toBe(true);
    expect(element.getAttribute('aria-describedby')).toBe(message.id);
  });
});
