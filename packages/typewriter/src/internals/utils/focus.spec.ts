import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture } from '@blueprintui/test';
import { focusElement, focusable, initializeKeyListItems, simpleFocusable } from './focus.js';

describe('isFocusable', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
    <a href="#">true</a>
    <area href="#">true</area>
    <button>true</button>
    <select true></select>
    <input value="true" />
    <textarea>true</textarea>
    <iframe title="test frame">true</iframe>
    <object aria-label="test obj">true</object>
    <div tabindex="0">true</div>
    <embed true />
    <div tabindex="-1">true</div>
    <div contenteditable="true">true</div>
    <div role="button">true</div>
    <area>false</area>
    <input disabled value="false" />
    <button disabled>false</button>
    <select disabled false></select>
    <textarea disabled>false</textarea>
    <div role="button" disabled>false</div>
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should mark focusable elements as true', () => {
    const elements = Array.from(fixture.querySelectorAll('*')).map(e => focusable(e));
    expect(elements.filter(i => i === true).length).toBe(13);
    expect(elements.filter(i => i === false).length).toBe(6);
  });
});

describe('focusElement', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <button>one</button>
        <button>two</button>
        <span>three</span>`
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should focus non interactive elements', () => {
    const [one, two, three] = Array.from(fixture.querySelectorAll<HTMLElement>('*'));
    focusElement(three);
    expect(document.activeElement === one).toBe(false);
    expect(document.activeElement === two).toBe(false);
    expect(document.activeElement === three).toBe(true);
    expect(three.getAttribute('tabindex')).toBe('-1');

    focusElement(two);
    expect(document.activeElement === one).toBe(false);
    expect(document.activeElement === two).toBe(true);
    expect(document.activeElement === three).toBe(false);
    expect(three.getAttribute('tabindex')).toBe(null);
  });

  it('should focus element', () => {
    const [one, two] = Array.from(fixture.querySelectorAll('button'));
    focusElement(two);
    expect(document.activeElement === one).toBe(false);
    expect(document.activeElement === two).toBe(true);
  });
});

@customElement('simple-focusable-test-element')
class SimpleFocusableTestElement extends LitElement {
  #internals = this.attachInternals();
  connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = 0;
    this.#internals.states.add('--complex-focus');
  }
}

describe('simpleFocusable', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
    <a href="#">true</a>
    <area href="#">false</area>
    <button>true</button>
    <select false></select>
    <input value="false" />
    <textarea>false</textarea>
    <iframe title="test frame">false</iframe>
    <object aria-label="test obj">true</object>
    <div tabindex="0">true</div>
    <embed true />
    <div tabindex="-1">true</div>
    <div contenteditable="true">false</div>
    <div role="button">true</div>
    <area>false</area>
    <input disabled value="false" />
    <button disabled>false</button>
    <select disabled false></select>
    <textarea disabled>false</textarea>
    <div role="button" disabled>false</div>
    <simple-focusable-test-element>false</simple-focusable-test-element>
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should mark simpleFocusable elements as true', () => {
    const elements = Array.from(fixture.querySelectorAll('*')).map(e => simpleFocusable(e));
    expect(elements.filter(i => i === true).length).toBe(7);
    expect(elements.filter(i => i === false).length).toBe(13);
  });
});

describe('initializeKeyListItems', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <div></div>
      <div></div>
      <div></div>
    `);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should mark simpleFocusable elements as true', () => {
    const elements = Array.from(fixture.querySelectorAll<HTMLElement>('*'));
    initializeKeyListItems(elements);

    expect(elements[0].tabIndex).toBe(0);
    expect(elements[1].tabIndex).toBe(-1);
    expect(elements[2].tabIndex).toBe(-1);
  });
});
