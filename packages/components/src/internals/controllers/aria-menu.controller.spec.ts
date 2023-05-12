import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { ariaMenu, ariaMenuItem } from '@blueprintui/components/internals';

@ariaMenu<AriaMenuControllerTestElement>()
@customElement('aria-menu-controller-test-element')
class AriaMenuControllerTestElement extends LitElement {
  _internals: ElementInternals;
}

@ariaMenuItem<AriaMenuItemControllerTestElement>()
@customElement('aria-menu-item-controller-test-element')
class AriaMenuItemControllerTestElement extends LitElement {
  _internals: ElementInternals;
}

describe('aria-menu.controller', () => {
  let menu: AriaMenuControllerTestElement;
  let menuItem: AriaMenuItemControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <aria-menu-controller-test-element></aria-menu-controller-test-element>
        <aria-menu-item-controller-test-element></aria-menu-item-controller-test-element>`
    );
    menu = fixture.querySelector<AriaMenuControllerTestElement>('aria-menu-controller-test-element');
    menuItem = fixture.querySelector<AriaMenuControllerTestElement>('aria-menu-item-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role menu', async () => {
    await elementIsStable(menu);
    expect(menu._internals.role).toBe('menu');
  });

  it('should initialize role menuitem', async () => {
    await elementIsStable(menuItem);
    expect(menuItem._internals.role).toBe('menuitem');
  });
});
