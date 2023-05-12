import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { ariaGroup } from '@blueprintui/components/internals';

@ariaGroup<AriaGroupControllerTestElement>()
@customElement('aria-group-controller-test-element')
class AriaGroupControllerTestElement extends LitElement {
  @property({ type: Boolean }) group = false;
  @property({ type: Boolean }) readonly = false;
  _internals: ElementInternals;
}

describe('aria-group.controller', () => {
  let element: AriaGroupControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<aria-group-controller-test-element></aria-group-controller-test-element>`);
    element = fixture.querySelectorAll<AriaGroupControllerTestElement>('aria-group-controller-test-element')[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role group', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('group');
  });
});
