import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { stateDisabled } from '@blueprintui/components/internals';

@stateDisabled<StateDisabledControllerTestElement>()
@customElement('state-disabled-controller-test-element')
class StateDisabledControllerTestElement extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  declare _internals: ElementInternals;
}

describe('state-disabled.controller', () => {
  let element: StateDisabledControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-disabled-controller-test-element></state-disabled-controller-test-element>`
    );
    element = fixture.querySelector<StateDisabledControllerTestElement>('state-disabled-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize aria disabled', async () => {
    element.disabled = false;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');
    expect(element.matches(':--disabled')).toBe(false);
  });

  it('should update aria-disabled when disabled API is updated', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('true');
    expect(element.matches(':--disabled')).toBe(true);

    element.disabled = false;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');
    expect(element.matches(':--disabled')).toBe(false);
  });

  it('should remove aria disabled if readonly', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe(null);
    expect(element.matches(':--disabled')).toBe(false);
  });
});
