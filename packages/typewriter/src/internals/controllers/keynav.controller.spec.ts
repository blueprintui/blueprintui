import { html, LitElement } from 'lit';
import { query } from 'lit/decorators/query.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { keynav } from './keynav.controller.js';
import { createFixture, removeFixture, elementIsStable } from '../../test/index.js';

@keynav<GridKeyNavigationControllerTestElement>(host => ({ grid: host.grid, host: host.host }))
@customElement('grid-key-navigation-controller-test-element')
class GridKeyNavigationControllerTestElement extends LitElement {
  @query('section') host: HTMLElement;

  #columns = 3;

  get cells() {
    return Array.from(this.shadowRoot.querySelectorAll<HTMLElement>('section > div > *'));
  }

  get grid(): HTMLElement[][] {
    const cells = [...this.cells];
    const grid = [];
    while(cells.length) {
      grid.push(cells.splice(0, this.#columns));
    }
    return grid;
  }

  render() {
    return html`
      <section>
        <div>
          <button>0</button>
          <button>1</button>
          <button>2</button>
        </div>
        <div>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
        <div>
          <button>6</button>
          <button>7</button>
          <button>8</button>
        </div>
        <div>
          <button>9</button>
          <button>10</button>
          <button>11</button>
        </div>
        <div>
          <button>12</button>
          <button>13</button>
          <button>14</button>
        </div>
        <div>
          <div>15 <input /></div>
          <div><button>16</button></div>
          <div><button>17-1</button><button>17-2</button></div>
        </div>
      </section>
    `;
  }
}

// https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html#kbd_label
// https://w3c.github.io/aria-practices/#gridNav_focus
describe('grid-key-navigation.controller', () => {
  let element: GridKeyNavigationControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<grid-key-navigation-controller-test-element></grid-key-navigation-controller-test-element>`
    );
    element = fixture.querySelector<GridKeyNavigationControllerTestElement>(
      'grid-key-navigation-controller-test-element'
    );
    
    // trigger initialization
    element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    element.cells[0].focus();
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set tabindex -1 on grid cells and 0 for the first cell', async () => {
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[8].getAttribute('tabindex')).toBe('-1');
  });

  it('should set activate a cell on left click', async () => {
    await elementIsStable(element);
    element.cells[2].dispatchEvent(new MouseEvent('pointerup', { bubbles: true, buttons: 1 }));
    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[1].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[2].getAttribute('tabindex')).toBe('0');
  });

  it('should support arrow key navigation', async () => {
    element.cells[0].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
    element.cells[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
    await elementIsStable(element);

    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[1].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[2].getAttribute('tabindex')).toBe('0');

    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    await elementIsStable(element);

    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[1].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[2].getAttribute('tabindex')).toBe('-1');

    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);

    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[3].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[6].getAttribute('tabindex')).toBe('0');

    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);

    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[3].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[6].getAttribute('tabindex')).toBe('-1');
  });

  it('should support key navigation shortcuts from wcag spec', async () => {
    // last in row
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[1].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[2].getAttribute('tabindex')).toBe('0');

    // first in row
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[1].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[2].getAttribute('tabindex')).toBe('-1');

    // last cell in grid
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[17].getAttribute('tabindex')).toBe('0');

    // first cell in grid
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home', ctrlKey: true, metaKey: true }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[17].getAttribute('tabindex')).toBe('-1');

    // page down (every 5th cell)
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageDown' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[12].getAttribute('tabindex')).toBe('0');

    // page up (every 5th cell)
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageUp' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[12].getAttribute('tabindex')).toBe('-1');
  });

  it('should not page beyond index when using page up or page down', async () => {
    // limit reached should focus first available cell
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageUp' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageUp' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageUp' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[12].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[15].getAttribute('tabindex')).toBe('-1');

    // limit reached should focus last available cell
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageDown' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageDown' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageDown' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[12].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[15].getAttribute('tabindex')).toBe('0');
  });

  it('should invert directions when in RTL mode', async () => {
    await elementIsStable(element);
    element.host.dir = 'rtl';

    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[1].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[2].getAttribute('tabindex')).toBe('0');

    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
    await elementIsStable(element);
    expect(element.cells[0].getAttribute('tabindex')).toBe('0');
    expect(element.cells[1].getAttribute('tabindex')).toBe('-1');
    expect(element.cells[2].getAttribute('tabindex')).toBe('-1');
  });

  // https://w3c.github.io/aria-practices/#gridNav_focus
  it('should retain focus on grid cell if more than one interactive item is within cell', async () => {
    await elementIsStable(element);
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    await elementIsStable(element);
    expect(element.cells[17].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[17]);
    expect(element.shadowRoot.activeElement).not.toEqual(element.cells[17].querySelectorAll('button')[0]);
    expect(element.shadowRoot.activeElement).not.toEqual(element.cells[17].querySelectorAll('button')[1]);
  });

  it('should allow inner interactive elements to be access in the tabflow when cell is active', async () => {
    await elementIsStable(element);
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    await elementIsStable(element);
    expect(element.cells[17].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[17]);
    expect(element.shadowRoot.activeElement).not.toEqual(element.cells[17].querySelectorAll('button')[0]);
    expect(element.shadowRoot.activeElement).not.toEqual(element.cells[17].querySelectorAll('button')[1]);

    element.cells[17].querySelectorAll('button')[0].focus();
    await elementIsStable(element);
    expect(element.shadowRoot.activeElement).not.toEqual(element.cells[17]);
    expect(element.shadowRoot.activeElement).toEqual(element.cells[17].querySelectorAll('button')[0]);
    expect(element.shadowRoot.activeElement).not.toEqual(element.cells[17].querySelectorAll('button')[1]);
  });

  it('should focus internactive item within cell if only interactive item within cell', async () => {
    await elementIsStable(element);
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    await elementIsStable(element);
    expect(element.shadowRoot.activeElement).toEqual(element.cells[16].querySelectorAll('button')[0]);
  });

  it('should retain focus on grid cell if interactive item a complex type (uses key navigation)', async () => {
    await elementIsStable(element);
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    await elementIsStable(element);
    expect(element.cells[15].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[15]);
    expect(element.shadowRoot.activeElement).not.toEqual(element.cells[15].querySelectorAll('input')[0]);
  });

  it('should allow complex types to be activated via `enter` key', async () => {
    await elementIsStable(element);
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.cells[15].dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter', bubbles: true }));

    await elementIsStable(element);
    expect(element.cells[15].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[15].querySelectorAll('input')[0]);
  });

  it('should allow refocus to cell from cell interactions when pressing key `escape`', async () => {
    await elementIsStable(element);
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.cells[15].dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter', bubbles: true }));
    await elementIsStable(element);

    expect(element.cells[15].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[15].querySelectorAll('input')[0]);

    element.cells[15].dispatchEvent(new KeyboardEvent('keyup', { code: 'Escape', bubbles: true }));
    await elementIsStable(element);

    expect(element.cells[15].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[15]);
  });

  it('should ignore any key navigation inputs when a interactive element is active wihtin a cell', async () => {
    await elementIsStable(element);
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', ctrlKey: true, metaKey: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.host.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    element.cells[15].dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter', bubbles: true }));

    await elementIsStable(element);
    expect(element.cells[15].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[15].querySelectorAll('input')[0]);

    element.cells[15].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
    await elementIsStable(element);
    expect(element.cells[15].getAttribute('tabindex')).toBe('0');
    expect(element.shadowRoot.activeElement).toEqual(element.cells[15].querySelectorAll('input')[0]);
  });
});
