import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { typeMultiSelectable } from '@blueprintui/components/internals';

@typeMultiSelectable<TypeMultiSelectableControllerTestElement>()
@customElement('type-multi-selectable-controller-test-element')
class TypeMultiSelectableControllerTestElement extends LitElement {
  @property({ type: String }) accessor selectable: 'multi' | 'single' | null;
  declare _internals: ElementInternals;
}

describe('type-multi-selectable.controller', () => {
  let element: TypeMultiSelectableControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<type-multi-selectable-controller-test-element></type-multi-selectable-controller-test-element>`
    );
    element = fixture.querySelector<TypeMultiSelectableControllerTestElement>(
      'type-multi-selectable-controller-test-element'
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
