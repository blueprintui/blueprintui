import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionTouch, TouchCoordinate } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/components/test';

@interactionTouch<InteractionTouchControllerTestElement>()
@customElement('touch-controller-test-element')
class InteractionTouchControllerTestElement extends LitElement {
  static style = [
    css`
      :host {
        display: block;
        width: 100px;
        height: 100px;
        position: relative;
      }

      button {
        position: absolute;
        left: 20px;
        top: 20px;
      }
    `,
  ];

  render() {
    return html`<button></button>`;
  }
}

describe('interaction-touch.controller', () => {
  let component: InteractionTouchControllerTestElement;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createFixture(html`<touch-controller-test-element></touch-controller-test-element>`);
    component = element.querySelectorAll<InteractionTouchControllerTestElement>('touch-controller-test-element')[0];
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should trigger bp-touch-start when clicked', async () => {
    await elementIsStable(component);
    const event = onceEvent(component, 'bp-touch-start');

    component.dispatchEvent(new PointerEvent('pointerdown'));
    expect((await event) instanceof CustomEvent).toBe(true);
  });

  it('should trigger bp-touch-end when clicked', async () => {
    await elementIsStable(component);
    const startEvent = onceEvent(component, 'bp-touch-start');
    const endEvent = onceEvent(component, 'bp-touch-end');

    component.dispatchEvent(new PointerEvent('pointerdown'));
    expect((await startEvent) instanceof CustomEvent).toBe(true);

    document.dispatchEvent(new PointerEvent('pointerup'));
    expect((await endEvent) instanceof CustomEvent).toBe(true);
  });

  it('should return coordinates of touch start event', async () => {
    await elementIsStable(component);
    const event = onceEvent(component, 'bp-touch-start');

    component.dispatchEvent(new PointerEvent('pointerdown'));
    const coordinate = (await event).detail as TouchCoordinate;

    expect(coordinate.x).toEqual(0);
    expect(coordinate.y).toEqual(0);
  });

  it('should return coordinates of touch end event', async () => {
    await elementIsStable(component);
    const event = onceEvent(component, 'bp-touch-end');

    component.dispatchEvent(new PointerEvent('pointerdown'));
    document.dispatchEvent(new PointerEvent('pointerup'));
    const coordinate = (await event).detail as TouchCoordinate;

    expect(coordinate.x).toEqual(0);
    expect(coordinate.y).toEqual(0);
    expect(coordinate.offsetX).toEqual(0);
    expect(coordinate.offsetY).toEqual(0);
  });

  it('should return coordinates of touch move event', async () => {
    await elementIsStable(component);
    const event = onceEvent(component, 'bp-touch-move');

    component.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 0 }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50 }));
    const coordinate = (await event).detail as TouchCoordinate;

    expect(coordinate.x).toEqual(50);
    expect(coordinate.y).toEqual(50);
    expect(coordinate.offsetX).toEqual(50);
    expect(coordinate.offsetY).toEqual(50);
  });

  it('should return offset value from original starting point of touch start', async () => {
    await elementIsStable(component);
    const event = onceEvent(component, 'bp-touch-end');

    component.dispatchEvent(new PointerEvent('pointerdown', { clientX: 40, clientY: 20 }));
    document.dispatchEvent(new PointerEvent('pointerup', { clientX: 80, clientY: 40 }));
    const coordinate = (await event).detail as TouchCoordinate;

    expect(coordinate.x).toEqual(80);
    expect(coordinate.y).toEqual(40);
    expect(coordinate.offsetX).toEqual(40);
    expect(coordinate.offsetY).toEqual(20);
  });
});