import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { interactionScrollVisibility } from '@blueprintui/grid/internals';

@interactionScrollVisibility<ScrollableListVisibilityTestElement>()
@customElement('scrollable-list-visibility-test-element')
class ScrollableListVisibilityTestElement extends LitElement {
  gridBody: HTMLElement;
  static styles = [
    css`
      :host {
        --row-content-visibility: auto;
      }
    `
  ];
}

describe('scrollable-list-visibility.controller', () => {
  let element: ScrollableListVisibilityTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<scrollable-list-visibility-test-element></scrollable-list-visibility-test-element>`
    );
    element = fixture.querySelector<ScrollableListVisibilityTestElement>('scrollable-list-visibility-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set content visibility when scroll detected', async () => {
    await elementIsStable(element);
    expect(element.style.getPropertyValue('--row-content-visibility')).toBe('');

    element.shadowRoot.dispatchEvent(new Event('scroll', { bubbles: true }));
    await elementIsStable(element);
    expect(element.style.getPropertyValue('--row-content-visibility')).toBe('visibile');
  });

  it('should set content visibility when pointerdown event detected', async () => {
    await elementIsStable(element);
    expect(element.style.getPropertyValue('--row-content-visibility')).toBe('');

    element.shadowRoot.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await elementIsStable(element);
    expect(element.style.getPropertyValue('--row-content-visibility')).toBe('visibile');
  });
});
