import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { ariaRegion } from '@blueprintui/components/internals';

@ariaRegion<AriaRegionControllerTestElement>()
@customElement('aria-region-controller-test-element')
class AriaRegionControllerTestElement extends LitElement {
  @property({ type: Boolean }) region = false;
  @property({ type: Boolean }) readonly = false;
  _internals: ElementInternals;
}

describe('aria-region.controller', () => {
  let element: AriaRegionControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<aria-region-controller-test-element></aria-region-controller-test-element>`);
    element = fixture.querySelectorAll<AriaRegionControllerTestElement>('aria-region-controller-test-element')[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role region', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('region');
  });
});
