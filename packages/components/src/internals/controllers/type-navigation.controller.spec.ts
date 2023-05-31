import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { typeNavigation } from '@blueprintui/components/internals';

@typeNavigation<TypeNavigationControllerTestElement>()
@customElement('type-navigation-controller-test-element')
class TypeNavigationControllerTestElement extends LitElement {
  _internals: ElementInternals;
}

describe('type-navigation.controller', () => {
  let element: TypeNavigationControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<type-navigation-controller-test-element></type-navigation-controller-test-element>`
    );
    element = fixture.querySelectorAll<TypeNavigationControllerTestElement>(
      'type-navigation-controller-test-element'
    )[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role navigation', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('navigation');
  });
});
