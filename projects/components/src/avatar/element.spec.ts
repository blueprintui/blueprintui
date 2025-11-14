import { html } from 'lit';
import '@blueprintui/components/include/avatar.js';
import { BpAvatar } from '@blueprintui/components/avatar';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-avatar', () => {
  let fixture: HTMLElement;
  let element: BpAvatar;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-avatar aria-label="Test User">TU</bp-avatar>`);
    element = fixture.querySelector<BpAvatar>('bp-avatar');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-avatar')).toBe(BpAvatar);
  });

  it('should default to circle shape (default)', async () => {
    await elementIsStable(element);
    expect(element.shape).toBe(undefined);
    expect(element.getAttribute('shape')).toBe(null);
  });

  it('should default to no status', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should handle shape property changes', async () => {
    await elementIsStable(element);
    element.shape = 'square';
    await elementIsStable(element);

    expect(element.shape).toBe('square');
    expect(element.getAttribute('shape')).toBe('square');

    element.shape = 'rounded';
    await elementIsStable(element);

    expect(element.shape).toBe('rounded');
    expect(element.getAttribute('shape')).toBe('rounded');
  });

  it('should handle status property changes', async () => {
    await elementIsStable(element);
    element.status = 'success';
    await elementIsStable(element);

    expect(element.status).toBe('success');
    expect(element.getAttribute('status')).toBe('success');

    element.status = 'danger';
    await elementIsStable(element);

    expect(element.status).toBe('danger');
    expect(element.getAttribute('status')).toBe('danger');
  });

  it('should render slot content', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('TU');
  });

  it('should allow CSS custom properties to be overridden', async () => {
    element.style.setProperty('--size', '64px');
    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--size')).toBe('64px');
    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
  });

  it('should handle image content', async () => {
    const imgFixture = await createFixture(html`
      <bp-avatar>
        <img src="test.jpg" alt="Test User" />
      </bp-avatar>
    `);
    const imgElement = imgFixture.querySelector<BpAvatar>('bp-avatar');
    const img = imgElement.querySelector('img');

    await elementIsStable(imgElement);

    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('test.jpg');
    expect(img.getAttribute('alt')).toBe('Test User');

    removeFixture(imgFixture);
  });

  it('should set role to img', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('img');
  });

  it('should support multiple shape values', async () => {
    const shapes: ('square' | 'rounded')[] = ['square', 'rounded'];

    for (const shape of shapes) {
      element.shape = shape;
      await elementIsStable(element);
      expect(element.shape).toBe(shape);
      expect(element.getAttribute('shape')).toBe(shape);
    }
  });

  it('should support multiple status values', async () => {
    const statuses: ('accent' | 'success' | 'warning' | 'danger')[] = ['accent', 'success', 'warning', 'danger'];

    for (const status of statuses) {
      element.status = status;
      await elementIsStable(element);
      expect(element.status).toBe(status);
      expect(element.getAttribute('status')).toBe(status);
    }
  });
});
