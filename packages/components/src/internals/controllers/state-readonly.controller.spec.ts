import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { stateReadonly } from '@blueprintui/components/internals';

@stateReadonly<StateReadonlyControllerTestElement>()
@customElement('state-readonly-controller-test-element')
class StateReadonlyControllerTestElement extends LitElement {
  @property({ type: Boolean }) readonly: boolean;
  declare _internals: ElementInternals;
}

describe('state-readonly.controller', () => {
  let element: StateReadonlyControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<state-readonly-controller-test-element></state-readonly-controller-test-element>`);
    element = fixture.querySelector<StateReadonlyControllerTestElement>('state-readonly-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize not set :--readonly if property false', async () => {
    await elementIsStable(element);
    expect(element.matches(':--readonly')).toBe(false);
  });

  it('should initialize :--readonly  if property true', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':--readonly')).toBe(true);
  });
});
