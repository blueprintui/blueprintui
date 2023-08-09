import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typePositioned, TypePositionedController, Position } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, nextRepaint } from '@blueprintui/test';

@typePositioned<TypePositionedControllerTestElement>(host => ({
  position: host.position,
  anchor: host.anchor,
  popover: host.shadowRoot.querySelector<HTMLElement>('dialog'),
  arrow: host.shadowRoot.querySelector<HTMLElement>('.arrow')
}))
@customElement('type-positioned-test-element')
class TypePositionedControllerTestElement extends LitElement {
  @property({ type: String, reflect: true }) position: Position = 'bottom';

  @property({ type: String }) anchor?: HTMLElement | string;

  @property({ type: Boolean }) arrow: boolean;

  declare typePositionedController: TypePositionedController<this>;

  static styles = [
    css`
      dialog {
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
      <dialog open>
        <slot></slot>
      </dialog>
      ${this.arrow ? html`<div class="arrow"></div>` : nothing}
    `;
  }
}

describe('type-positioned.controller', () => {
  let elements: TypePositionedControllerTestElement[];
  let fixture: HTMLElement;

  beforeEach(async () => {
    // 1280x720
    fixture = await createFixture(
      html` <style>
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
        <div id="anchor-id"></div>
        <type-positioned-test-element arrow anchor="anchor-id" position="top">popover</type-positioned-test-element>
        <type-positioned-test-element arrow anchor="anchor-id" position="right">popover</type-positioned-test-element>
        <type-positioned-test-element arrow anchor="anchor-id" position="bottom">popover</type-positioned-test-element>
        <type-positioned-test-element arrow anchor="anchor-id" position="left">popover</type-positioned-test-element>
        <type-positioned-test-element arrow anchor="anchor-id" position="center">popover</type-positioned-test-element>
        <type-positioned-test-element anchor="anchor-id" position="top">popover</type-positioned-test-element>

        <type-positioned-test-element position="top">popover</type-positioned-test-element>
        <type-positioned-test-element position="right">popover</type-positioned-test-element>
        <type-positioned-test-element position="bottom">popover</type-positioned-test-element>
        <type-positioned-test-element position="left">popover</type-positioned-test-element>
        <type-positioned-test-element position="center">popover</type-positioned-test-element>

        <type-positioned-test-element position="top-start">popover</type-positioned-test-element>
        <type-positioned-test-element position="right-start">popover</type-positioned-test-element>
        <type-positioned-test-element position="bottom-end">popover</type-positioned-test-element>
        <type-positioned-test-element position="left-end">popover</type-positioned-test-element>`
    );
    elements = Array.from(
      fixture.querySelectorAll<TypePositionedControllerTestElement>('type-positioned-test-element')
    );
    await Promise.all(Array.from(elements.map(e => elementIsStable(e))));
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
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('181px');
    expect(bottom).toBe('337px');
    expect(left).toBe('334px');
    expect(right).toBe('0px');
  });

  it('should position popover to right of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=right]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('259px');
    expect(bottom).toBe('259px');
    expect(left).toBe('437px');
    expect(right).toBe('0px');
  });

  it('should position popover to bottom of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=bottom]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('337px');
    expect(bottom).toBe('181px');
    expect(left).toBe('334px');
    expect(right).toBe('0px');
  });

  it('should position popover to left of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=left]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('259px');
    expect(bottom).toBe('259px');
    expect(left).toBe('231px');
    expect(right).toBe('0px');
  });

  it('should position popover to center of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=center]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('259px');
    expect(bottom).toBe('259px');
    expect(left).toBe('334px');
    expect(right).toBe('0px');
  });

  it('should position popover to top of anchor without arrow offset', () => {
    const popover = fixture.querySelector('[anchor][position=top]:not([arrow])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('193px');
    expect(bottom).toBe('325px');
    expect(left).toBe('334px');
    expect(right).toBe('0px');
  });

  it('should position arrow to top of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=top]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('.arrow'));
    expect(top).toBe('auto');
    expect(bottom).toBe('-10px');
    expect(left).toBe('61px');
    expect(right).toBe('auto');
  });

  it('should position arrow to right of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=right]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('.arrow'));
    expect(top).toBe('36px');
    expect(bottom).toBe('auto');
    expect(left).toBe('-10px');
    expect(right).toBe('auto');
  });

  it('should position arrow to bottom of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=bottom]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('.arrow'));
    expect(top).toBe('-10px');
    expect(bottom).toBe('auto');
    expect(left).toBe('61px');
    expect(right).toBe('auto');
  });

  it('should position arrow to left of anchor', () => {
    const popover = fixture.querySelector('[anchor][position=left]');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('.arrow'));
    expect(top).toBe('36px');
    expect(bottom).toBe('auto');
    expect(left).toBe('auto');
    expect(right).toBe('-10px');
  });

  it('should anchor popover to top of body', () => {
    const popover = fixture.querySelector('[position=top]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('12px');
    expect(bottom).toBe('506px');
    expect(left).toBe('334px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to right of body', () => {
    const popover = fixture.querySelector('[position=right]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('259px');
    expect(bottom).toBe('259px');
    expect(left).toBe('656px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to bottom of body', () => {
    const popover = fixture.querySelector('[position=bottom]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('506px');
    expect(bottom).toBe('12px');
    expect(left).toBe('334px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to left of body', () => {
    const popover = fixture.querySelector('[position=left]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('259px');
    expect(bottom).toBe('259px');
    expect(left).toBe('12px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to center of body', () => {
    const popover = fixture.querySelector('[position=center]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('259px');
    expect(bottom).toBe('259px');
    expect(left).toBe('334px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to top-start of body', () => {
    const popover = fixture.querySelector('[position=top-start]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('12px');
    expect(bottom).toBe('506px');
    expect(left).toBe('12px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to right-start of body', () => {
    const popover = fixture.querySelector('[position=right-start]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('12px');
    expect(bottom).toBe('506px');
    expect(left).toBe('656px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to bottom-end of body', () => {
    const popover = fixture.querySelector('[position=bottom-end]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('506px');
    expect(bottom).toBe('12px');
    expect(left).toBe('656px');
    expect(right).toBe('0px');
  });

  it('should anchor popover to left-end of body', () => {
    const popover = fixture.querySelector('[position=left-end]:not([anchor])');
    const { top, bottom, left, right } = getComputedStyle(popover.shadowRoot.querySelector('dialog'));
    expect(top).toBe('506px');
    expect(bottom).toBe('12px');
    expect(left).toBe('12px');
    expect(right).toBe('0px');
  });
});
