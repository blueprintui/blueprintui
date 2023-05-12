import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { stateActive } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

@stateActive<StateActiveControllerTestElement>()
@customElement('state-active-controller-test-element')
class StateActiveControllerTestElement extends LitElement {
  @property({ type: Boolean }) disabled = false;
}

describe('state-active.controller', () => {
  let element: StateActiveControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<state-active-controller-test-element></state-active-controller-test-element>`);
    element = fixture.querySelector<StateActiveControllerTestElement>('state-active-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should add active state on mousedown', async () => {
    expect(element.matches(':--active')).toBe(false);

    element.dispatchEvent(new MouseEvent('mousedown'));
    await elementIsStable(element);

    expect(element.matches(':--active')).toBe(true);

    await elementIsStable(element);
    element.dispatchEvent(new MouseEvent('mouseup'));
    expect(element.matches(':--active')).toBe(false);
  });

  it('should not add active state if element is disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.matches(':--active')).toBe(false);

    element.dispatchEvent(new MouseEvent('mousedown'));
    await elementIsStable(element);
    expect(element.matches(':--active')).toBe(false);
  });
});
