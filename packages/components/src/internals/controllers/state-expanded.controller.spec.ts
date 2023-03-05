import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { stateExpanded } from '@blueprintui/components/internals';

@stateExpanded<StateExpandedControllerTestElement>()
@customElement('state-expanded-controller-test-element')
class StateExpandedControllerTestElement extends LitElement {
  @property({ type: Boolean }) expanded: boolean;
  @property({ type: Boolean }) readonly: boolean;
  declare _internals: ElementInternals;
}

describe('state-expanded.controller', () => {
  let element: StateExpandedControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-expanded-controller-test-element></state-expanded-controller-test-element>`
    );
    element = fixture.querySelector<StateExpandedControllerTestElement>('state-expanded-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize aria-expanded as null', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe(null);
    expect(element.matches(':--expanded')).toBe(false);
  });

  it('should initialize aria-expanded as null if expanded not applied', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe(null);
    expect(element.matches(':--expanded')).toBe(false);
  });

  it('should initialize aria-expanded as true if expanded applied', async () => {
    element.expanded = true;
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('true');
    expect(element.matches(':--expanded')).toBe(true);
  });

  it('should initialize aria-expanded as false if expanded=false applied', async () => {
    element.expanded = false;
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('false');
    expect(element.matches(':--expanded')).toBe(false);
  });

  it('should remove aria-expanded if readonly', async () => {
    element.expanded = true;
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('true');
    expect(element.matches(':--expanded')).toBe(true);

    element.readonly = true;
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe(null);
    expect(element.matches(':--expanded')).toBe(false);
  });
});
