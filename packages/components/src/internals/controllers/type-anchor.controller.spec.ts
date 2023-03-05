import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { typeAnchor } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, emulateClick, removeFixture } from '@blueprintui/components/test';

@typeAnchor<TypeAnchorTestElement>()
@customElement('type-anchor-controller-test-element')
class TypeAnchorTestElement extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;

  @property({ type: String }) href = '#';

  render() {
    return html`<a href=${this.href}>anchor</a>`;
  }
}

describe('type-anchor.controller', () => {
  it('should prevent click event if disabled', async () => {
    const fixture = await createFixture(
      html`<type-anchor-controller-test-element></type-anchor-controller-test-element>`
    );
    const element = fixture.querySelector<TypeAnchorTestElement>('type-anchor-controller-test-element');
    const anchor = element.shadowRoot.querySelector<HTMLElement>('a');
    let count = 0;

    await elementIsStable(element);
    anchor.addEventListener('click', () => count++);

    emulateClick(anchor);
    expect(count).toBe(1);

    element.disabled = true;
    await elementIsStable(element);
    emulateClick(anchor);

    expect(count).toBe(2);
    removeFixture(fixture);
  });
});
