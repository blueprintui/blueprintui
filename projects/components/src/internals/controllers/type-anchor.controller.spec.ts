import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { attachInternals, typeAnchor } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, emulateClick, removeFixture } from '@blueprintui/test';

@typeAnchor<TypeAnchorTestElement>()
@customElement('type-anchor-controller-test-element')
class TypeAnchorTestElement extends LitElement {
  @property({ type: Boolean }) accessor disabled = false;
  @property({ type: Boolean }) accessor readonly = false;
  @property({ type: String }) accessor href = '#';

  declare _internals: ElementInternals;

  render() {
    return html`<a href=${this.href}>anchor</a>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    attachInternals(this);
  }
}

describe('type-anchor.controller', () => {
  let fixture: HTMLElement;
  let element: TypeAnchorTestElement;
  let anchor: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<type-anchor-controller-test-element></type-anchor-controller-test-element>`);
    element = fixture.querySelector<TypeAnchorTestElement>('type-anchor-controller-test-element');
    anchor = element.shadowRoot.querySelector<HTMLElement>('a');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should prevent click event if disabled', async () => {
    let count = 0;

    await elementIsStable(element);
    anchor.addEventListener('click', () => count++);

    emulateClick(anchor);
    expect(count).toBe(1);

    element.disabled = true;
    await elementIsStable(element);
    emulateClick(anchor);

    expect(count).toBe(2);
  });

  it('should initialize :state(anchor) state if anchor exists', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(anchor)')).toBe(true);
  });
});
