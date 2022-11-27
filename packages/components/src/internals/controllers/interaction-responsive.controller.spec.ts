import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionResponsive } from '@blueprintui/components/internals';
import { createFixture, onceEvent, removeFixture } from '@blueprintui/components/test';

@interactionResponsive<ResponsiveControllerTestElement>()
@customElement('responsive-controller-test-element')
export class ResponsiveControllerTestElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 200px;
        height: 200px;
      }
    `,
  ];

  render() {
    return html`...`;
  }
}

describe('responsive.controller', () => {
  let element: HTMLElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<responsive-controller-test-element></responsive-controller-test-element>`);
    element = fixture.querySelector('responsive-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should notify of host resize', done => {
    let event: any;

    onceEvent(element, 'bpResizeChange').then(e => {
      event = e;
      expect(event.detail.width).toBe(500);
      done();
    });

    element.style.width = '500px';
  });
});
