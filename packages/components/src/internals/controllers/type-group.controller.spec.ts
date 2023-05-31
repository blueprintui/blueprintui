import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { typeGroup } from '@blueprintui/components/internals';

@typeGroup<TypeGroupControllerTestElement>()
@customElement('type-group-controller-test-element')
class TypeGroupControllerTestElement extends LitElement {
  @property({ type: Boolean }) group = false;
  @property({ type: Boolean }) readonly = false;
  _internals: ElementInternals;
}

describe('type-group.controller', () => {
  let element: TypeGroupControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<type-group-controller-test-element></type-group-controller-test-element>`);
    element = fixture.querySelectorAll<TypeGroupControllerTestElement>('type-group-controller-test-element')[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role group', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('group');
  });
});
