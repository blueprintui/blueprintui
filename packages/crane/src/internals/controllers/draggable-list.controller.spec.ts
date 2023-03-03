import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable } from '../../test/index.js';

@customElement('draggable-list-controller-test-element')
class DraggableListControllerTestElement extends LitElement {
  render() {
    return html``;
  }
}

describe('draggable-list.controller', () => {
  let element: HTMLElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<draggable-list-controller-test-element></draggable-list-controller-test-element>`
    );
    element = fixture.querySelector<DraggableListControllerTestElement>('draggable-list-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });
});