import { html } from 'lit';
import { BpIcon } from '@blueprintui/icons';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/user.js';

const testIcon = {
  name: 'test',
  type: {
    default: '<path d="M19.41,18l8.29-8.29a1,1,0,0,0-1.41-1.41L18,16.59,9.71,8.29A1,1,0,0,0,8.29,9.71L16.59,18,8.29,26.29a1,1,0,1,0,1.41,1.41L18,19.41l8.29,8.29a1,1,0,0,0,1.41-1.41Z"/>',
  }
};

describe('icon element', () => {
  let fixture: HTMLElement;
  let element: BpIcon;

  beforeAll(() => {
    (customElements.get('bp-icon') as any).add(testIcon);
  });

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-icon></bp-icon>`);
    element = fixture.querySelector<BpIcon>('bp-icon');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('shape should default to unknown if one is not given', async () => {
    await elementIsStable(element);
    expect(element.shape).toBe('unknown');
  });

  it('shape should get shape if it is in the registry', async () => {
    await elementIsStable(element);
    element.shape = 'testing';
    await elementIsStable(element);
    expect(element.shape).toBe('testing');
  });

  it('shape should load side effect imports for shapes', async () => {
    await elementIsStable(element);
    element.shape = 'user';
    await elementIsStable(element);
    expect(element.shape).toBe('user');
    expect(element.shadowRoot.innerHTML).toContain('m18 17a7 7 0 1 0 -7-7 7 7 0 0 0 7 7zm0-12a5');
  });

  it('shape should render when a matching shape is updated in the registry', async () => {
    await elementIsStable(element);
    element.shape = 'testshape';
    await elementIsStable(element);
    expect(element.shape).toBe('testshape');
    expect(element.shadowRoot.innerHTML).toContain('M12 5v.01M12 12v.01M12 19v.01M12');

    (customElements.get('bp-icon') as any).add({
      name: 'testshape',
      type: { default: '<svg>testshape</svg>' }
    });

    await elementIsStable(element);
    await new Promise(r => setTimeout(() => r(''), 10)); // delay for async global state updates
    expect(element.shadowRoot.innerHTML).toContain('<svg>testshape</svg>');
  });

  it('should support numeric values when setting size property', async () => {
    element.size = '36';
    await elementIsStable(element);
    expect(getComputedStyle(element).getPropertyValue('--width').trim()).toBe('36px');
    expect(getComputedStyle(element).getPropertyValue('--height').trim()).toBe('36px');

    element.size = '24';
    await elementIsStable(element);
    expect(getComputedStyle(element).getPropertyValue('--width').trim()).toBe('24px');
    expect(getComputedStyle(element).getPropertyValue('--height').trim()).toBe('24px');
  });

  it('should support t-shirt values when setting size property', async () => {
    element.size = 'sm';
    await elementIsStable(element);
    expect(getComputedStyle(element).getPropertyValue('--width').trim()).toBe('calc(1 * 16px)');
    expect(getComputedStyle(element).getPropertyValue('--height').trim()).toBe('calc(1 * 16px)');

    element.size = 'md';
    await elementIsStable(element);
    expect(getComputedStyle(element).getPropertyValue('--width').trim()).toBe('calc(1 * 24px)');
    expect(getComputedStyle(element).getPropertyValue('--height').trim()).toBe('calc(1 * 24px)');

    element.size = 'lg';
    await elementIsStable(element);
    expect(getComputedStyle(element).getPropertyValue('--width').trim()).toBe('calc(1 * 32px)');
    expect(getComputedStyle(element).getPropertyValue('--height').trim()).toBe('calc(1 * 32px)');
  });
});
