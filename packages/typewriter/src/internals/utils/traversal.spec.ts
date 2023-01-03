import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture } from '../../test/index.js';
import { getFlattenedDOMTree, getFlattenedFocusableItems, getChildren } from './traversal.js';

@customElement('typewriter-traversal-test-element')
export class TestComponent extends LitElement {
  buttonId = 'shady-btn';

  render() {
    return html`
      <slot name="slot-two">slot two</slot>
      <button>shadow dom one</button>
      <p>shadow dom content</p>
      <slot>slot</slot>
      <button>shadow dom two</button>
    `;
  }
}

describe('getFlattenedDOMTree', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <typewriter-traversal-test-element>
        <button>light dom two</button>
        <button slot="slot-two">light dom one</button>
      </typewriter-traversal-test-element>
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should get all children in light and shadow DOM from projected and flattened DOM tree', () => {
    const children = getFlattenedDOMTree(fixture);
    expect(children.length).toBe(8);
    expect(children[0].tagName.toLowerCase()).toBe('typewriter-traversal-test-element');
    expect(children[1].textContent).toBe('slot two');
    expect(children[2].textContent).toBe('light dom one');
    expect(children[3].textContent).toBe('shadow dom one');
    expect(children[4].textContent).toBe('shadow dom content');
    expect(children[5].textContent).toBe('slot');
    expect(children[6].textContent).toBe('light dom two');
    expect(children[7].textContent).toBe('shadow dom two');
  });
});

describe('getFlattenedFocusableItems', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <typewriter-traversal-test-element>
        <button>light dom two</button>
        <p>shadow dom light</p>
        <button slot="slot-two">light dom one</button>
      </typewriter-traversal-test-element>
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should get all focusable children in light and shadow DOM from a flattened DOM tree', () => {
    const children = getFlattenedFocusableItems(fixture);
    expect(children.length).toBe(4);
    expect(children[0].textContent).toBe('light dom one');
    expect(children[1].textContent).toBe('shadow dom one');
    expect(children[2].textContent).toBe('light dom two');
    expect(children[3].textContent).toBe('shadow dom two');
  });
});

describe('getChildren', () => {
  let fixture: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <typewriter-traversal-test-element>
        <button>light dom one</button>
        <button slot="slot-two">light dom two</button>
      </typewriter-traversal-test-element>
    `);

    element = fixture.querySelector('typewriter-traversal-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should get children in light DOM', () => {
    expect(getChildren(fixture).length).toBe(1);
  });

  it('should get children in shadow DOM', () => {
    expect(getChildren(element).length).toBe(5);
  });
});
