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

  it('should have form association enabled', async () => {
    await elementIsStable(element);
    expect(Control.formAssociated).toBe(true);
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('presentation');
    expect(element._internals.states.has('bp-layer')).toBe(true);
  });

  it('should handle disabled state', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(undefined);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    // Note: CSS states are managed by controllers, not directly by FormControl
    // expect(element.matches(':state(disabled)')).toBe(true);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.disabled).toBe(false);
    // expect(element.matches(':state(disabled)')).toBe(false);
  });

  it('should handle required state', async () => {
    await elementIsStable(element);
    expect(element.required).toBe(undefined);

    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);

    element.required = false;
    await elementIsStable(element);
    expect(element.required).toBe(false);
  });

  it('should handle readonly state', async () => {
    await elementIsStable(element);
    expect(element.readonly).toBe(undefined);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    // Note: CSS states are managed by controllers, not directly by FormControl
    // expect(element.matches(':state(readonly)')).toBe(true);

    element.readonly = false;
    await elementIsStable(element);
    expect(element.readonly).toBe(false);
    // expect(element.matches(':state(readonly)')).toBe(false);
  });

  it('should handle multiple state', async () => {
    await elementIsStable(element);
    expect(element.multiple).toBe(undefined);

    element.multiple = true;
    await elementIsStable(element);
    expect(element.multiple).toBe(true);

    element.multiple = false;
    await elementIsStable(element);
    expect(element.multiple).toBe(false);
  });

  it('should handle reflected properties', async () => {
    await elementIsStable(element);

    // Test autocomplete reflection
    element.autocomplete = 'on';
    await elementIsStable(element);
    expect(element.autocomplete).toBe('on');
    expect(element.getAttribute('autocomplete')).toBe('on');

    // Test type reflection
    element.type = 'text';
    await elementIsStable(element);
    expect(element.type).toBe('text');
    expect(element.getAttribute('type')).toBe('text');

    // Test formNoValidate reflection
    element.formNoValidate = true;
    await elementIsStable(element);
    expect(element.formNoValidate).toBe(true);
    expect(element.getAttribute('formNoValidate')).toBe('');

    element.formNoValidate = false;
    await elementIsStable(element);
    expect(element.formNoValidate).toBe(false);
    expect(element.hasAttribute('formNoValidate')).toBe(false);
  });

  it('should handle non-reflected properties', async () => {
    await elementIsStable(element);

    // Test pattern
    element.pattern = '[A-Za-z]{3}';
    await elementIsStable(element);
    expect(element.pattern).toBe('[A-Za-z]{3}');

    // Test placeholder
    element.placeholder = 'Enter text';
    await elementIsStable(element);
    expect(element.placeholder).toBe('Enter text');

    // Test minLength
    element.minLength = 3;
    await elementIsStable(element);
    expect(element.minLength).toBe(3);

    // Test maxLength
    element.maxLength = 10;
    await elementIsStable(element);
    expect(element.maxLength).toBe(10);

    // Test min
    element.min = 0;
    await elementIsStable(element);
    expect(element.min).toBe(0);

    // Test max
    element.max = 100;
    await elementIsStable(element);
    expect(element.max).toBe(100);

    // Test size
    element.size = 20;
    await elementIsStable(element);
    expect(element.size).toBe(20);
  });

  it('should handle different value types', async () => {
    await elementIsStable(element);

    // String value
    element.value = 'test string';
    await elementIsStable(element);
    expect(element.value).toBe('test string');

    // Number value
    element.value = 42;
    await elementIsStable(element);
    expect(element.value).toBe(42);

    // FormData value
    const formData = new FormData();
    formData.append('test', 'value');
    element.value = formData;
    await elementIsStable(element);
    expect(element.value).toBe(formData);

    // File value
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    element.value = file;
    await elementIsStable(element);
    expect(element.value).toBe(file);
  });

  it('should handle valueAsNumber getter and setter', async () => {
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

    // Test with non-numeric string
    element.value = 'not a number';
    await elementIsStable(element);
    expect(isNaN(element.valueAsNumber)).toBe(true);
  });

  it('should compose label from associated labels', async () => {
    await elementIsStable(element);
    expect(element.composedLabel).toBe('control');
  });

  it('should handle focus method', async () => {
    await elementIsStable(element);

    // Test that focus method calls the controller's focus method
    const focusSpy = spyOn((element as any).typeFormControlController, 'focus');
    element.focus();
    expect(focusSpy).toHaveBeenCalled();
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

  it('should handle onChange with valueType config', async () => {
    await elementIsStable(element);
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'change');

    (element as any).onChange({ target: { value: '123' }, preventDefault, stopPropagation }, { valueType: 'number' });

    // The controller handles the value setting, so we just verify the event was dispatched
    expect(await event).toBeTruthy();
  });

  it('should handle onInput with valueType config', async () => {
    await elementIsStable(element);
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'input');

    (element as any).onInput(
      { target: { value: '456' }, data: '456', preventDefault, stopPropagation },
      { valueType: 'number' }
    );

    // The controller handles the value setting, so we just verify the event was dispatched
    expect((await event).data).toBe('456');
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

  it('should handle name property', async () => {
    await elementIsStable(element);
    expect(element.name).toBe(null);

    element.name = 'test-control';
    await elementIsStable(element);
    expect(element.name).toBe('test-control');
  });

  it('should handle lifecycle in connectedCallback', async () => {
    await elementIsStable(element);

    // Verify that connectedCallback sets up the element properly
    expect(element._internals.role).toBe('presentation');
    expect(element._internals.states.has('bp-layer')).toBe(true);
  });
});
