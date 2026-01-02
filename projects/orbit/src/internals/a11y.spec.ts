import { LitElement, html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { attachInternals } from './a11y.js';

class ElementInternalTestElement extends LitElement {
  declare _internals: ElementInternals;

  connectedCallback() {
    attachInternals(this);
  }
}

customElements.define('element-internals-test-element', ElementInternalTestElement);

describe('attachInternals', () => {
  let element: ElementInternalTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<element-internals-test-element></element-internals-test-element>`);
    element = fixture.querySelector<ElementInternalTestElement>('element-internals-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should attach element internals object', async () => {
    await elementIsStable(element);
    expect(element._internals).toBeTruthy();
  });
});
