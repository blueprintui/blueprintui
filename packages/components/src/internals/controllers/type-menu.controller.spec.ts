import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { ariaMenu, ariaMenuItem } from '@blueprintui/components/internals';

@ariaMenu<AriaMenuControllerTestElement>()
@customElement('type-menu-controller-test-element')
class AriaMenuControllerTestElement extends LitElement {
  _internals: ElementInternals;
}

@ariaMenuItem<TypeMenuItemControllerTestElement>()
@customElement('type-menu-item-controller-test-element')
class TypeMenuItemControllerTestElement extends LitElement {
  _internals: ElementInternals;
}

describe('type-menu.controller', () => {
  let menu: AriaMenuControllerTestElement;
  let menuItem: TypeMenuItemControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <type-menu-controller-test-element></type-menu-controller-test-element>
        <type-menu-item-controller-test-element></type-menu-item-controller-test-element>`
    );
    menu = fixture.querySelector<AriaMenuControllerTestElement>('type-menu-controller-test-element');
    menuItem = fixture.querySelector<AriaMenuControllerTestElement>('type-menu-item-controller-test-element');
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
