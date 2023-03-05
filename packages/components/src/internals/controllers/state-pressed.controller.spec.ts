import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { statePressed } from '@blueprintui/components/internals';

@statePressed<StatePressedControllerTestElement>()
@customElement('state-pressed-controller-test-element')
class StatePressedControllerTestElement extends LitElement {
  @property({ type: Boolean }) pressed: boolean;
  @property({ type: Boolean }) readonly: boolean;
  _internals: ElementInternals;
}

describe('state-pressed.controller', () => {
  let element: StatePressedControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-pressed-controller-test-element></state-pressed-controller-test-element>`
    );
    element = fixture.querySelector<StatePressedControllerTestElement>('state-pressed-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize aria-pressed as null', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe(null);
    expect(element.matches(':--pressed')).toBe(false);
  });

  it('should initialize aria-pressed as null if pressed not applied', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe(null);
    expect(element.matches(':--pressed')).toBe(false);
  });

  it('should initialize aria-pressed as true if pressed applied', async () => {
    element.pressed = true;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('true');
    expect(element.matches(':--pressed')).toBe(true);
  });

  it('should initialize aria-pressed as false if pressed=false applied', async () => {
    element.pressed = false;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');
    expect(element.matches(':--pressed')).toBe(false);
  });

  it('should remove aria-pressed if readonly', async () => {
    element.pressed = true;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('true');
    expect(element.matches(':--pressed')).toBe(true);

    element.readonly = true;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe(null);
    expect(element.matches(':--pressed')).toBe(false);
  });
});
