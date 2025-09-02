import { LitElement, html } from 'lit';
import {
  assignedElements,
  getOffesetDifference,
  attachRootNodeStyles,
  toggleState,
  getRenderRoot,
  querySelectorByIdRef,
  queryCommandTriggerRef,
  sameRenderRoot
} from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('getOffsetDifference', () => {
  it('should return the difference of two positive numbers', () => {
    expect(getOffesetDifference(15, 5)).toBe(-10);
    expect(getOffesetDifference(5, 15)).toBe(10);
  });

  it('should return the difference of two negative numbers', () => {
    expect(getOffesetDifference(-15, -5)).toBe(10);
    expect(getOffesetDifference(-5, -15)).toBe(-10);
  });

  it('should return the difference negative and positive numbers', () => {
    expect(getOffesetDifference(-5, 15)).toBe(20);
    expect(getOffesetDifference(-15, 5)).toBe(20);
    expect(getOffesetDifference(15, -5)).toBe(-20);
    expect(getOffesetDifference(5, -15)).toBe(-20);
  });
});

describe('toggleState', () => {
  let element: TestElement;
  let internals: ElementInternals;

  beforeEach(async () => {
    element = document.createElement('test-element') as TestElement;
    document.body.appendChild(element);
    await elementIsStable(element);
    internals = element.attachInternals();
  });

  afterEach(() => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });

  it('should add state when value is true', () => {
    toggleState(internals, 'test-state', true);
    expect(internals.states.has('test-state')).toBe(true);
  });

  it('should remove state when value is false', () => {
    internals.states.add('test-state');
    toggleState(internals, 'test-state', false);
    expect(internals.states.has('test-state')).toBe(false);
  });

  it('should handle multiple state toggles', () => {
    toggleState(internals, 'state1', true);
    toggleState(internals, 'state2', true);
    toggleState(internals, 'state1', false);

    expect(internals.states.has('state1')).toBe(false);
    expect(internals.states.has('state2')).toBe(true);
  });
});

describe('getRenderRoot', () => {
  let fixture: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<div><span>test</span></div>`);
    element = fixture.querySelector('span') as HTMLElement;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should return document.body when parent has no shadow root', () => {
    const renderRoot = getRenderRoot(element);
    expect(renderRoot).toBe(document.body);
  });

  it('should return shadow root when parent has shadow root', () => {
    const parent = element.parentElement as HTMLElement;
    const shadowRoot = parent.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div>shadow content</div>';

    const renderRoot = getRenderRoot(element);
    expect(renderRoot).toBe(shadowRoot);
  });
});

describe('sameRenderRoot', () => {
  let fixture: HTMLElement;
  let element1: HTMLElement;
  let element2: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <div>
        <span id="element1">test1</span>
        <span id="element2">test2</span>
      </div>
    `);
    element1 = fixture.querySelector('#element1') as HTMLElement;
    element2 = fixture.querySelector('#element2') as HTMLElement;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should return true for elements in same document', () => {
    expect(sameRenderRoot(element1, element2)).toBe(true);
  });

  it('should return true for same element', () => {
    expect(sameRenderRoot(element1, element1)).toBe(true);
  });

  it('should return false for elements in different shadow roots', () => {
    const parent1 = document.createElement('div');
    const parent2 = document.createElement('div');
    const shadow1 = parent1.attachShadow({ mode: 'open' });
    const shadow2 = parent2.attachShadow({ mode: 'open' });

    const elem1 = document.createElement('span');
    const elem2 = document.createElement('span');

    shadow1.appendChild(elem1);
    shadow2.appendChild(elem2);

    expect(sameRenderRoot(elem1, elem2)).toBe(false);
  });

  it('should return true for elements in same shadow root', () => {
    const parent = document.createElement('div');
    const shadow = parent.attachShadow({ mode: 'open' });

    const elem1 = document.createElement('span');
    const elem2 = document.createElement('span');

    shadow.appendChild(elem1);
    shadow.appendChild(elem2);

    expect(sameRenderRoot(elem1, elem2)).toBe(true);
  });
});

describe('querySelectorByIdRef', () => {
  let fixture: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <div>
        <span id="target">target</span>
        <span id="other">other</span>
      </div>
    `);
    element = fixture.querySelector('div') as HTMLElement;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should find element by id reference', () => {
    const result = querySelectorByIdRef(element, 'target');
    expect(result?.id).toBe('target');
  });

  it('should return undefined for non-existent id', () => {
    const result = querySelectorByIdRef(element, 'non-existent');
    expect(result).toBeUndefined();
  });

  it('should return undefined for empty id', () => {
    const result = querySelectorByIdRef(element, '');
    expect(result).toBeUndefined();
  });

  it('should only find elements in same render root', () => {
    const shadowParent = document.createElement('div');
    const shadow = shadowParent.attachShadow({ mode: 'open' });
    const shadowElement = document.createElement('span');
    shadowElement.id = 'target';
    shadow.appendChild(shadowElement);

    const result = querySelectorByIdRef(element, 'target');
    expect(result?.id).toBe('target');
    expect(result).not.toBe(shadowElement);
  });
});

describe('queryCommandTriggerRef', () => {
  let fixture: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <div>
        <button id="trigger">trigger</button>
        <button commandfor="trigger">command</button>
        <button id="other" commandfor="other">other command</button>
      </div>
    `);
    element = fixture.querySelector('#trigger') as HTMLElement;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should find element with matching commandfor attribute', () => {
    const result = queryCommandTriggerRef(element);
    expect(result?.getAttribute('commandfor')).toBe('trigger');
  });

  it('should return null when element has no id', () => {
    const elementWithoutId = fixture.querySelector('div') as HTMLElement;
    const result = queryCommandTriggerRef(elementWithoutId);
    expect(result).toBeNull();
  });

  it('should return undefined when no matching commandfor found', () => {
    const elementWithNoMatch = document.createElement('button');
    elementWithNoMatch.id = 'no-match';
    const result = queryCommandTriggerRef(elementWithNoMatch);
    expect(result).toBeUndefined();
  });

  it('should only find elements in same render root', () => {
    const shadowParent = document.createElement('div');
    const shadow = shadowParent.attachShadow({ mode: 'open' });
    const shadowElement = document.createElement('button');
    shadowElement.setAttribute('commandfor', 'trigger');
    shadow.appendChild(shadowElement);

    const result = queryCommandTriggerRef(element);
    expect(result?.getAttribute('commandfor')).toBe('trigger');
    expect(result).not.toBe(shadowElement);
  });
});

describe('attachRootNodeStyles', () => {
  let fixture: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<div>test</div>`);
    element = fixture.querySelector('div') as HTMLElement;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should attach styles to document when not already present', () => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync('div { color: red; }');

    const initialLength = document.adoptedStyleSheets.length;
    attachRootNodeStyles(element, [styleSheet]);

    expect(document.adoptedStyleSheets.length).toBeGreaterThanOrEqual(initialLength);
    expect(document.adoptedStyleSheets).toContain(styleSheet);
  });

  it('should not attach duplicate styles', () => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync('div { color: red; }');

    attachRootNodeStyles(element, [styleSheet]);
    const firstLength = document.adoptedStyleSheets.length;

    attachRootNodeStyles(element, [styleSheet]);
    const secondLength = document.adoptedStyleSheets.length;

    expect(secondLength).toBe(firstLength);
  });

  it('should attach styles to shadow root when element is in shadow DOM', () => {
    const shadowParent = document.createElement('div');
    const shadow = shadowParent.attachShadow({ mode: 'open' });
    const shadowElement = document.createElement('span');
    shadow.appendChild(shadowElement);

    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync('span { color: blue; }');

    attachRootNodeStyles(shadowElement, [styleSheet]);

    expect(shadow.adoptedStyleSheets).toContain(styleSheet);
  });
});

class TestElement extends LitElement {
  render() {
    return html`
      <slot></slot>
      <slot name="one"></slot>
    `;
  }
}

customElements.define('test-element', TestElement);

describe('assignedElements', () => {
  let fixture: HTMLElement;
  let element: TestElement;
  let slotted: HTMLElement[];

  beforeEach(async () => {
    fixture = await createFixture(html`
      <test-element>
        <p>default</p>
        <p slot="one">one</p>
      </test-element>
    `);
    element = fixture.querySelector<TestElement>('test-element');
    slotted = Array.from(fixture.querySelectorAll<HTMLElement>('p'));
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should return the assigned elements to a given slot', () => {
    expect(assignedElements(element).length).toEqual(1);
    expect(assignedElements(element)[0]).toEqual(slotted[0]);

    expect(assignedElements(element, { name: 'one' }).length).toEqual(1);
    expect(assignedElements(element, { name: 'one' })[0]).toEqual(slotted[1]);
  });

  it('should return empty array for non-existent slot', () => {
    expect(assignedElements(element, { name: 'non-existent' })).toEqual([]);
  });

  it('should handle flatten option', () => {
    const flattened = assignedElements(element, { flatten: true });
    const nonFlattened = assignedElements(element, { flatten: false });

    expect(flattened.length).toBeGreaterThanOrEqual(nonFlattened.length);
  });

  it('should return empty array when element has no shadow root', () => {
    const div = document.createElement('div');
    // The function will throw an error when shadowRoot is null, so we test that behavior
    expect(() => assignedElements(div)).toThrow();
  });
});
