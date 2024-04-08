import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { FormControl } from '@blueprintui/components/forms';
import '@blueprintui/components/include/forms.js';

@customElement('bp-control')
class Control extends FormControl {
  render() {
    return html`control`;
  }
}

describe('bp-control', () => {
  let element: Control;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>control</label>
        <bp-control value="initial"></bp-control>
      </bp-field>
    `);

    element = fixture.querySelector<Control>('bp-control');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
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

  it('should allow value to be set and retreived as number', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('initial');

    element.value = '123';
    await elementIsStable(element);
    expect(element.value).toBe('123');
    expect(element.valueAsNumber).toBe(123);

    element.valueAsNumber = 456;
    await elementIsStable(element);
    expect(element.value).toBe('456');
    expect(element.valueAsNumber).toBe(456);
  });

  it('should reset validity and value', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('initial');

    element.value = '123';
    element._internals.states.add('invalid');
    await elementIsStable(element);

    expect(element.value).toBe('123');
    expect(element.matches(':state(invalid)')).toBe(true);

    element.reset();
    await elementIsStable(element);
    expect(element.value).toBe('initial');
    expect(element.matches(':state(invalid)')).toBe(false);
  });
});
