import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionClick } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

@interactionClick<InteractionClickControllerTestElement>()
@customElement('interaction-click-controller-test-element')
class InteractionClickControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor readonly: boolean;
  @property({ type: Boolean }) accessor disabled: boolean;
  declare _internals: ElementInternals;
}

describe('interaction-click.controller', () => {
  let element: InteractionClickControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<interaction-click-controller-test-element></interaction-click-controller-test-element>`
    );
    element = fixture.querySelectorAll<InteractionClickControllerTestElement>(
      'interaction-click-controller-test-element'
    )[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize tabindex 0', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should remove tabindex if disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });

  it('should remove tabindex if readonly', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });

  it('should add or remove button event listeners when readonly updates', async () => {
    await elementIsStable(element);
    expect(element.readonly).toBe(undefined);

    spyOn(element, 'removeEventListener').and.callThrough();
    element.readonly = true;
    await elementIsStable(element);
    expect(element.removeEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(element.removeEventListener).toHaveBeenCalledWith('keyup', jasmine.any(Function));

    spyOn(element, 'addEventListener').and.callThrough();
    element.readonly = false;
    await elementIsStable(element);
    expect(element.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(element.addEventListener).toHaveBeenCalledWith('keyup', jasmine.any(Function));
  });
});
