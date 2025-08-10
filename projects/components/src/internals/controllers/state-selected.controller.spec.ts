import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { stateSelected } from '@blueprintui/components/internals';

@stateSelected<StateSelectedControllerTestElement>()
@customElement('state-selected-controller-test-element')
class StateSelectedControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor selected: boolean;
  declare _internals: ElementInternals;
}

describe('state-selected.controller', () => {
  let element: StateSelectedControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-selected-controller-test-element></state-selected-controller-test-element>`
    );
    element = fixture.querySelector<StateSelectedControllerTestElement>('state-selected-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize not set :state(selected) if property false', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaSelected).toBe(null);
    expect(element.matches(':state(selected)')).toBe(false);
  });

  it('should initialize :state(selected) if property true', async () => {
    element.selected = true;
    await elementIsStable(element);
    expect(element.matches(':state(selected)')).toBe(true);
  });

  it('should initialize aria-selected to null', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaSelected).toBe(null);
  });

  it('should set aria-selected on selected change', async () => {
    element.selected = true;
    await elementIsStable(element);
    expect(element._internals.ariaSelected).toBe('true');

    element.selected = false;
    await elementIsStable(element);
    expect(element._internals.ariaSelected).toBe('false');
  });
});
