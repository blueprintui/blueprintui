import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { typeRegion } from '@blueprintui/components/internals';

@typeRegion<TypeRegionControllerTestElement>()
@customElement('type-region-controller-test-element')
class TypeRegionControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor region = false;
  @property({ type: Boolean }) accessor readonly = false;
  _internals: ElementInternals;
}

describe('type-region.controller', () => {
  let element: TypeRegionControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<type-region-controller-test-element></type-region-controller-test-element>`);
    element = fixture.querySelectorAll<TypeRegionControllerTestElement>('type-region-controller-test-element')[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role region', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('region');
  });
});
