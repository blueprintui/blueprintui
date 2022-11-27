import { html, LitElement } from 'lit';
import { queryAll } from 'lit/decorators/query-all.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { keyList } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

@keyList<KeyNavigationListControllerTestElement>(host => ({ items: host.items}))
@customElement('key-navigation-list-controller-test-element')
class KeyNavigationListControllerTestElement extends LitElement {
  @queryAll('section > div') items: NodeListOf<HTMLElement>;

  render() {
    return html`
      <section>
        <div><button>0</button></div>
        <div><button>1</button></div>
        <div><button>2</button></div>
        <div><button>3</button></div>
        <div><button>4</button></div>
        <div><button>5</button></div>
      </section>
    `;
  }
}

describe('key-navigation-list.controller', () => {
  let element: KeyNavigationListControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<key-navigation-list-controller-test-element></key-navigation-list-controller-test-element>`);
    element = fixture.querySelector<KeyNavigationListControllerTestElement>('key-navigation-list-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize first item if focus management is enabled', async () => {
    await elementIsStable(element);
    expect(element.items[0].tabIndex).toBe(0);
    expect(element.items[1].tabIndex).toBe(-1);
  });

  it('should set activate a item on click', async () => {
    await elementIsStable(element);
    element.items[2].click();
    expect(element.items[0].getAttribute('tabindex')).toBe('-1');
    expect(element.items[1].getAttribute('tabindex')).toBe('-1');
    expect(element.items[2].getAttribute('tabindex')).toBe('0');
  });

  it('should support horizontal arrow key navigation', async () => {
    await elementIsStable(element);
    element.items[0].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
    element.items[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));

    await elementIsStable(element);
    expect(element.items[0].getAttribute('tabindex')).toBe('-1');
    expect(element.items[1].getAttribute('tabindex')).toBe('-1');
    expect(element.items[2].getAttribute('tabindex')).toBe('0');

    element.items[2].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.items[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    await elementIsStable(element);

    expect(element.items[0].getAttribute('tabindex')).toBe('0');
    expect(element.items[1].getAttribute('tabindex')).toBe('-1');
    expect(element.items[2].getAttribute('tabindex')).toBe('-1');
  });

  // it('should support vertical arrow key navigation', async () => {
  //   element.keyNavigationListController = new KeyListController(element);

  //   await elementIsStable(element);
  //   element.items[0].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
  //   element.items[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));

  //   await elementIsStable(element);
  //   expect(element.items[0].getAttribute('tabindex')).toBe('-1');
  //   expect(element.items[1].getAttribute('tabindex')).toBe('-1');
  //   expect(element.items[2].getAttribute('tabindex')).toBe('0');

  //   element.items[2].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
  //   element.items[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
  //   await elementIsStable(element);

  //   expect(element.items[0].getAttribute('tabindex')).toBe('0');
  //   expect(element.items[1].getAttribute('tabindex')).toBe('-1');
  //   expect(element.items[2].getAttribute('tabindex')).toBe('-1');
  // });
});
