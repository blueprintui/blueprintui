import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionTextChange } from '@blueprintui/components/internals';
import { createFixture, onceEvent, removeFixture } from '@blueprintui/test';

@interactionTextChange<InteractionTextChangeControllerTestElement>()
@customElement('interaction-text-change-controller-test-element')
export class InteractionTextChangeControllerTestElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

describe('responsive.controller', () => {
  let element: HTMLElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<interaction-text-change-controller-test-element></interaction-text-change-controller-test-element>`
    );
    element = fixture.querySelector('interaction-text-change-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should notify of host text node update', async () => {
    const event = onceEvent(element, 'bp-textchange');
    element.textContent = 'foo';
    expect(await event).toBeTruthy();
  });
});
