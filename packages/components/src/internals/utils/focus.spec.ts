import { html } from 'lit';
import { createFixture, removeFixture } from '@blueprintui/components/test';
import { focusElement, focusable } from '@blueprintui/components/internals';

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
    <object>true</object>
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
    fixture = await createFixture(html` <button>one</button>
      <button>two</button>
      <span>three</span>`);
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
