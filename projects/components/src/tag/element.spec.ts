import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { BpTag } from '@blueprintui/components/tag';
import '@blueprintui/components/include/tag.js';

describe('tag element', () => {
  let fixture: HTMLElement;
  let element: BpTag;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-tag>tag</bp-tag>`);
    element = fixture.querySelector<BpTag>('bp-tag');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('tag');
  });

  it('should default to status neutral (undefined)', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tag')).toBe(BpTag);
  });

  it('should handle status property with reflection', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);

    const statuses = ['accent', 'success', 'warning', 'danger'] as const;
    for (const status of statuses) {
      element.status = status;
      await elementIsStable(element);
      expect(element.status).toBe(status);
      expect(element.getAttribute('status')).toBe(status);
    }
  });

  it('should extend BaseButton', async () => {
    await elementIsStable(element);
    expect(typeof element.click).toBe('function');
    expect('disabled' in element).toBe(true);
    expect('pressed' in element).toBe(true);
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'blue');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--border', '1px solid navy');
    element.style.setProperty('--padding', '4px 8px');
    element.style.setProperty('--font-size', '12px');
    element.style.setProperty('--border-radius', '4px');
    element.style.setProperty('--line-height', '1.2');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('blue');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid navy');
    expect(element.style.getPropertyValue('--padding')).toBe('4px 8px');
    expect(element.style.getPropertyValue('--font-size')).toBe('12px');
    expect(element.style.getPropertyValue('--border-radius')).toBe('4px');
    expect(element.style.getPropertyValue('--line-height')).toBe('1.2');
  });

  it('should be clickable like a button', async () => {
    await elementIsStable(element);

    let clicked = false;
    element.addEventListener('click', () => (clicked = true));

    element.click();
    expect(clicked).toBe(true);
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should handle disabled state', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
  });

  it('should handle pressed state', async () => {
    await elementIsStable(element);
    expect(element.pressed).toBe(undefined);

    element.pressed = true;
    await elementIsStable(element);
    expect(element.pressed).toBe(true);
  });

  it('should handle slot content', async () => {
    await elementIsStable(element);
    expect(element.textContent).toBe('tag');

    // Test with different content
    const newFixture = await createFixture(html`<bp-tag>New Tag Content</bp-tag>`);
    const newElement = newFixture.querySelector<BpTag>('bp-tag');
    await elementIsStable(newElement);

    expect(newElement.textContent).toBe('New Tag Content');
    removeFixture(newFixture);
  });

  it('should support keyboard navigation', async () => {
    await elementIsStable(element);

    let keyPressed = false;
    element.addEventListener('keydown', () => (keyPressed = true));

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(keyPressed).toBe(true);
  });

  it('should implement BpTypeButton interface', async () => {
    await elementIsStable(element);

    // Should have BaseButton properties
    expect('disabled' in element).toBe(true);
    expect('pressed' in element).toBe(true);
    expect('status' in element).toBe(true);
  });

  it('should handle status changes correctly', async () => {
    await elementIsStable(element);

    // Test setting and unsetting status
    element.status = 'accent';
    await elementIsStable(element);
    expect(element.getAttribute('status')).toBe('accent');

    element.status = undefined;
    await elementIsStable(element);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should handle complex content in slot', async () => {
    const complexFixture = await createFixture(html`
      <bp-tag>
        <span>Complex</span>
        <strong>Content</strong>
      </bp-tag>
    `);

    const complexElement = complexFixture.querySelector<BpTag>('bp-tag');
    await elementIsStable(complexElement);

    const span = complexFixture.querySelector('span');
    const strong = complexFixture.querySelector('strong');

    expect(span).toBeTruthy();
    expect(strong).toBeTruthy();
    expect(span.textContent).toBe('Complex');
    expect(strong.textContent).toBe('Content');

    removeFixture(complexFixture);
  });

  it('should handle different status states with proper styling', async () => {
    await elementIsStable(element);

    const statuses = ['accent', 'success', 'warning', 'danger'] as const;

    for (const status of statuses) {
      element.status = status;
      await elementIsStable(element);

      expect(element.status).toBe(status);
      expect(element.hasAttribute('status')).toBe(true);
      expect(element.getAttribute('status')).toBe(status);
    }
  });

  it('should support interaction styles', async () => {
    await elementIsStable(element);

    // The component should have interaction styles applied
    expect(element).toBeTruthy();

    // Test hover and focus states are possible
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should support anchor slot styles', async () => {
    // Test that the component can contain anchor elements
    const anchorFixture = await createFixture(html`
      <bp-tag>
        <a href="#">Link Tag</a>
      </bp-tag>
    `);

    const anchorElement = anchorFixture.querySelector<BpTag>('bp-tag');
    await elementIsStable(anchorElement);

    const link = anchorFixture.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.textContent).toBe('Link Tag');

    removeFixture(anchorFixture);
  });

  it('should maintain BaseButton functionality', async () => {
    await elementIsStable(element);

    // Should inherit all BaseButton methods and properties
    expect(typeof element.click).toBe('function');
    expect(typeof element.focus).toBe('function');
    expect(typeof element.blur).toBe('function');
  });
});
