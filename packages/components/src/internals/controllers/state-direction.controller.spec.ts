import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { stateDirection } from '@blueprintui/components/internals';
import { createFixture, elementIsStable, removeFixture } from '@blueprintui/components/test';

@stateDirection<StateDirectionControllerTestElement>()
@customElement('state-direction-controller-test-element')
export class StateDirectionControllerTestElement extends LitElement {
  declare dir: 'ltr' | 'rtl' | 'auto' | '';
  declare _internals: ElementInternals;

  render() {
    return html``;
  }
}

describe('state-direction.controller', () => {
  let element: StateDirectionControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-direction-controller-test-element></state-direction-controller-test-element>`
    );
    element = fixture.querySelector('state-direction-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set the direction CSS state based on host or parent "dir" state', async () => {
    await elementIsStable(element);
    expect(element.matches(':--dir-ltr')).toBe(false);
    expect(element.matches(':--dir-rtl')).toBe(false);
    expect(element.matches(':--dir-auto')).toBe(false);

    element.dir = 'ltr';
    element.requestUpdate();
    await elementIsStable(element);
    expect(element.getAttribute('dir')).toBe('ltr');
    expect(element.matches(':--dir-ltr')).toBe(true);
    expect(element.matches(':--dir-rtl')).toBe(false);
    expect(element.matches(':--dir-auto')).toBe(false);
  });
});
