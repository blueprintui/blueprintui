import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typePositioned, TypePositionedController, Position } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, nextRepaint } from '@blueprintui/test';

@typePositioned<TypePositionedControllerTestElement>(host => ({
  position: host.position,
  anchor: host.anchor,
  popover: host,
  arrow: host.shadowRoot.querySelector<HTMLElement>('.arrow')
}))
@customElement('type-positioned-test-element')
class TypePositionedControllerTestElement extends LitElement {
  @property({ type: String, reflect: true }) accessor position: Position = 'bottom';

  @property({ type: String }) accessor anchor: HTMLElement | string;

  @property({ type: Boolean }) accessor arrow: boolean;

  @property({ type: String, reflect: true }) accessor popover = 'true';

  declare typePositionedController: TypePositionedController<this>;

  static styles = [
    css`
      :host {
        width: 100px;
        height: 50px;
        background: red;
        border: 0;
        margin: 0;
      }

      .arrow {
        width: 10px;
        height: 10px;
        background: green;
      }
    `
  ];

  render() {
    return html`
      <slot></slot>
      ${this.arrow ? html`<div class="arrow"></div>` : nothing}
    `;
  }
}

describe('type-positioned.controller', () => {
  let elements: TypePositionedControllerTestElement[];
  let fixture: HTMLElement;

  beforeEach(async () => {
    // 1280x720
    fixture = await createFixture(html`
      <style>
        body,
        body > div {
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: purple;
        }

        #anchor-id {
          width: 50px;
          height: 50px;
          left: calc(50% - 25px);
          top: calc(50% - 25px);
          position: absolute;
          background: blue;
        }
      </style>
      <!-- 800x600 viewport-->
      <div id="anchor-id"></div>
      <type-positioned-test-element arrow anchor="anchor-id" position="top"></type-positioned-test-element>
      <type-positioned-test-element arrow anchor="anchor-id" position="right"></type-positioned-test-element>
      <type-positioned-test-element arrow anchor="anchor-id" position="bottom"></type-positioned-test-element>
      <type-positioned-test-element arrow anchor="anchor-id" position="left"></type-positioned-test-element>
      <type-positioned-test-element arrow anchor="anchor-id" position="center"></type-positioned-test-element>

      <type-positioned-test-element position="top"></type-positioned-test-element>
      <type-positioned-test-element position="right"></type-positioned-test-element>
      <type-positioned-test-element position="bottom"></type-positioned-test-element>
      <type-positioned-test-element position="left"></type-positioned-test-element>
      <type-positioned-test-element position="center"></type-positioned-test-element>

      <type-positioned-test-element position="top-start"></type-positioned-test-element>
      <type-positioned-test-element position="right-start"></type-positioned-test-element>
      <type-positioned-test-element position="bottom-end"></type-positioned-test-element>
      <type-positioned-test-element position="left-end"></type-positioned-test-element>
    `);
    elements = Array.from(
      fixture.querySelectorAll<TypePositionedControllerTestElement>('type-positioned-test-element')
    );
    await Promise.all(
      Array.from(
        elements.map(async e => {
          e.togglePopover();
          await elementIsStable(e);
          await nextRepaint();
        })
      )
    );
    await nextRepaint();
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create positioned controller instance', async () => {
    await elementIsStable(elements[0]);
    expect(elements[0].typePositionedController).toBeDefined();
  });

  it('should position popover to top of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=top]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('213px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  it('should position popover to right of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=right]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('437px');
  });

  it('should position popover to bottom of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=bottom]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('337px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  it('should position popover to left of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=left]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('263px');
  });

  it('should position popover to center of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=center]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  // it('should position popover to top of anchor without arrow offset', () => {
  //   const popover = fixture.querySelector('[anchor][position=top]:not([arrow])');
  //   expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
  //   expect(getComputedStyle(popover).getPropertyValue('left')).toBe('360px');
  // });

  it('should position arrow to top of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=top]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('213px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  it('should position arrow to right of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=right]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('437px');
  });

  it('should position arrow to bottom of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=bottom]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('337px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  it('should position arrow to left of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=left]');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('263px');
  });

  it('should anchor popover to top of body', () => {
    const popover = fixture.querySelector('[position=top]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('12px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  it('should anchor popover to right of body', () => {
    const popover = fixture.querySelector('[position=right]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('688px');
  });

  it('should anchor popover to bottom of body', () => {
    const popover = fixture.querySelector('[position=bottom]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('538px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  it('should anchor popover to left of body', () => {
    const popover = fixture.querySelector('[position=left]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('12px');
  });

  it('should anchor popover to center of body', () => {
    const popover = fixture.querySelector('[position=center]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('275px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('350px');
  });

  it('should anchor popover to top-start of body', () => {
    const popover = fixture.querySelector('[position=top-start]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('12px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('12px');
  });

  it('should anchor popover to right-start of body', () => {
    const popover = fixture.querySelector('[position=right-start]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('12px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('688px');
  });

  it('should anchor popover to bottom-end of body', () => {
    const popover = fixture.querySelector('[position=bottom-end]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('538px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('688px');
  });

  it('should anchor popover to left-end of body', () => {
    const popover = fixture.querySelector('[position=left-end]:not([anchor])');
    expect(getComputedStyle(popover).getPropertyValue('top')).toBe('538px');
    expect(getComputedStyle(popover).getPropertyValue('left')).toBe('12px');
  });
});
