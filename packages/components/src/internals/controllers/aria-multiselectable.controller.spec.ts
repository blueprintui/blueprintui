import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { ariaMultiSelectable } from '@blueprintui/components/internals';

@ariaMultiSelectable<AriaMultiSelectableControllerTestElement>()
@customElement('aria-multi-selectable-controller-test-element')
class AriaMultiSelectableControllerTestElement extends LitElement {
  @property({ type: String }) selectable: 'multi' | 'single' | null;
  declare _internals: ElementInternals;
}

describe('aria-multi-selectable.controller', () => {
  let element: AriaMultiSelectableControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<aria-multi-selectable-controller-test-element></aria-multi-selectable-controller-test-element>`
    );
    element = fixture.querySelector<AriaMultiSelectableControllerTestElement>(
      'aria-multi-selectable-controller-test-element'
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role multi-selectable as null', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaMultiSelectable).toBe(null);
  });

  it('should initialize role multi-selectable as false if selectable=false', async () => {
    element.selectable = 'single';
    await elementIsStable(element);
    expect(element._internals.ariaMultiSelectable).toBe('false');
  });

  it('should initialize role multi-selectable as true if selectable=true', async () => {
    element.selectable = 'multi';
    await elementIsStable(element);
    expect(element._internals.ariaMultiSelectable).toBe('true');
  });
});
