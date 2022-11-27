import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { ariaNavigation } from '@blueprintui/components/internals';

@ariaNavigation<AriaNavigationControllerTestElement>()
@customElement('aria-navigation-controller-test-element')
class AriaNavigationControllerTestElement extends LitElement {
  _internals: ElementInternals;
}

describe('aria-navigation.controller', () => {
  let element: AriaNavigationControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<aria-navigation-controller-test-element></aria-navigation-controller-test-element>`
    );
    element = fixture.querySelectorAll<AriaNavigationControllerTestElement>('aria-navigation-controller-test-element')[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role navigation', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('navigation');
  });
});
