import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { stateTextContent } from '@blueprintui/components/internals';

@stateTextContent<StateTextContentControllerTestElement>()
@customElement('state-text-content-controller-test-element')
class StateTextContentControllerTestElement extends LitElement {
  @property({ type: Boolean }) selected: boolean;
  declare _internals: ElementInternals;
}

describe('state-selected.controller', () => {
  let element: StateTextContentControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-text-content-controller-test-element></state-text-content-controller-test-element>`
    );
    element = fixture.querySelector<StateTextContentControllerTestElement>(
      'state-text-content-controller-test-element'
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize not set :--text-content if no slotted content exists', async () => {
    await elementIsStable(element);
    expect(element.matches(':--text-content')).toBe(false);
  });

  it('should initialize :--text-content if slotted texted content exists', async () => {
    element.textContent = 'test';
    await elementIsStable(element);
    expect(element.matches(':--text-content')).toBe(true);
  });

  it('should update :--text-content if slotted texted content is added', async () => {
    expect(element.matches(':--text-content')).toBe(false);
    element.textContent = 'test';
    await elementIsStable(element);
    expect(element.matches(':--text-content')).toBe(true);
  });
});
