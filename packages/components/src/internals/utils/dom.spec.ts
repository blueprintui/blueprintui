import { LitElement, html } from 'lit';
import { assignedElements, getOffesetDifference } from '@blueprintui/components/internals';
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
});
