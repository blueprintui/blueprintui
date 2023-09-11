import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { stateChecked } from '@blueprintui/components/internals';

@stateChecked<StateCheckedControllerTestElement>()
@customElement('state-checked-controller-test-element')
class StateCheckedControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor checked: boolean;
  _internals: ElementInternals;
}

describe('state-checked.controller', () => {
  let element: StateCheckedControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-checked-controller-test-element></state-checked-controller-test-element>`
    );
    element = fixture.querySelector<StateCheckedControllerTestElement>('state-checked-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize aria-checked as null', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe(null);
    expect(element.matches(':--checked')).toBe(false);
  });

  it('should initialize aria-checked as null if checked not applied', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe(null);
    expect(element.matches(':--Checked')).toBe(false);
  });

  it('should initialize aria-checked as true if checked applied', async () => {
    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('true');
    expect(element.matches(':--checked')).toBe(true);
  });

  it('should initialize aria-checked as false if checked=false applied', async () => {
    element.checked = false;
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('false');
    expect(element.matches(':--checked')).toBe(false);
  });
});
