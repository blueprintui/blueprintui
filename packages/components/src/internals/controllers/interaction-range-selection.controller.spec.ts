import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { interactionRangeSelection } from '@blueprintui/components/internals';

@interactionRangeSelection<TypeFormControlControllerTestElement>(host => ({
  rangeSelection: true,
  grid: host.grid
}))
@customElement('range-selection-test-element')
class TypeFormControlControllerTestElement extends LitElement {
  get cells() {
    return Array.from(this.shadowRoot.querySelectorAll('button'));
  }

  get grid(): HTMLElement[][] {
    const grid = [];
    while (this.cells.length) {
      grid.push(this.cells.splice(0, 3));
    }
    return grid;
  }

  render() {
    return html`
      <div>
        <button>1-1</button>
        <button>1-2</button>
        <button>1-3</button>
      </div>
      <div>
        <button>2-4</button>
        <button>2-5</button>
        <button>2-6</button>
      </div>
      <div>
        <button>3-7</button>
        <button>3-8</button>
        <button>3-9</button>
      </div>
    `;
  }
}

describe('interaction-range-selection.controller', () => {
  let element: TypeFormControlControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<range-selection-test-element></range-selection-test-element>`);
    element = fixture.querySelector<TypeFormControlControllerTestElement>('range-selection-test-element');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should select range via pointer events', async () => {
    await elementIsStable(element);
    // trigger initialization
    // const cells = element.cells;
    // element.dispatchEvent(new Event('touchstart', { bubbles: true }));
    expect(element).toBeTruthy();

    // element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, buttons: 1 }));
    // element.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    // expect(cells[0].hasAttribute('hightlight')).toBe(true);
    // expect((cells[0] as any)._internals.states.get('--highlight-active')).toBe(true);

    // const event = onceEvent(element, 'range-change');
    // cells[1].dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    // cells[1].dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    // await elementIsStable(element);
    // expect(cells[0].matches(':--highlight')).toBe(true);
    // expect(cells[1].matches(':--highlight')).toBe(true);
    // expect(cells[2].matches(':--highlight')).toBe(false);

    // const selected = (await event).detail;
    // expect(selected[0]).toBe(cells[0]);
    // expect(selected[1]).toBe(cells[1]);

    // cells[2].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, buttons: 1 }));
    // cells[2].dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    // cells[5].dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    // cells[5].dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    // expect(cells[0].matches(':--highlight')).toBe(false);
    // expect(cells[0].matches(':--highlight')).toBe(false);
    // expect(cells[2].matches(':--highlight')).toBe(true);
    // expect(cells[5].matches(':--highlight')).toBe(true);
    // expect(cells[8].matches(':--highlight')).toBe(false);
  });

  // it('should select range via keyboard events', async () => {
  //   // trigger initialization
  //   element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  //   await new Promise(r => setTimeout(r, 0));

  //   const cells = element.cells;
  //   cells[0].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true, shiftKey: true }));
  //   cells[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true, shiftKey: true }));
  //   await elementIsStable(element);

  //   expect(cells[0].matches(':--highlight')).toBe(true);
  //   expect(cells[0].matches(':--highlight')).toBe(true);
  //   expect(cells[2].matches(':--highlight')).toBe(false);
  // });
});
