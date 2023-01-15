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
  let component: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(
      html`<draggable-list-controller-test-element></draggable-list-controller-test-element>`
    );
    component = element.querySelector<DraggableListControllerTestElement>('draggable-list-controller-test-element');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });
});