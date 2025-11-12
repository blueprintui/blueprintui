import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { GlobalStateService } from './global.service.js';
import { i18n } from './i18n.controller.js';
import { I18nService } from './i18n.service.js';

@i18n<I18nControllerTestElement>({ key: 'actions' })
@customElement('compass-i18n-controller-test-element')
class I18nControllerTestElement extends LitElement {
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  render() {
    return html`<p>${this.i18n.close}</p>`;
  }
}

describe('i18n.controller', () => {
  let element: I18nControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<compass-i18n-controller-test-element></compass-i18n-controller-test-element>`);
    element = fixture.querySelector<I18nControllerTestElement>('compass-i18n-controller-test-element');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should render property from i18n service', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('p').innerText).toBe('close');
  });

  it('should re-render property from i18n service when a update is issued', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('p').innerText).toBe('close');

    const event = new Promise(r => GlobalStateService.stateUpdate.subscribe(() => r('')));
    I18nService.keys = { actions: { close: 'close2' } };
    await event;
    await elementIsStable(element);

    expect(element.shadowRoot.querySelector('p').innerText).toBe('close2');
    I18nService.keys = { actions: { close: 'close' } };
  });
});
