import { html } from 'lit';
import '@blueprintui/components/include/format-token.js';
import { BpFormatToken } from '@blueprintui/components/format-token';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-format-token', () => {
  let fixture: HTMLElement;
  let element: BpFormatToken;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-format-token>Hello world!</bp-format-token>`);
    element = fixture.querySelector<BpFormatToken>('bp-format-token');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-format-token')).toBe(BpFormatToken);
  });

  it('should default to bpe format', async () => {
    await elementIsStable(element);
    expect(element.format).toBe('bpe');
    expect(element.getAttribute('format')).toBe('bpe');
  });

  it('should handle format property changes', async () => {
    await elementIsStable(element);
    element.format = 'bpe';
    await elementIsStable(element);

    expect(element.format).toBe('bpe');
    expect(element.getAttribute('format')).toBe('bpe');
  });

  it('should tokenize text with word-piece format', async () => {
    element.textContent = 'Hello world!';
    element.format = 'word-piece';
    await elementIsStable(element);

    const tokens = element.shadowRoot?.querySelectorAll('[part="token"]');
    expect(tokens.length).toBeGreaterThan(0);
  });

  it('should support different tokenization formats', async () => {
    const formats = ['word-piece', 'bpe', 'sentence-piece', 'llama', 'character', 'whitespace'] as const;

    for (const format of formats) {
      element.format = format;
      await elementIsStable(element);
      expect(element.getAttribute('format')).toBe(format);
    }
  });

  it('should handle empty text', async () => {
    element.textContent = '';
    await elementIsStable(element);

    const placeholder = element.shadowRoot?.querySelector('[part="placeholder"]');
    expect(placeholder).toBeTruthy();
  });

  it('should handle text content changes', async () => {
    await elementIsStable(element);
    element.textContent = 'New text content';
    element.dispatchEvent(new Event('bp-textchange'));
    await elementIsStable(element);

    expect(element.textContent).toBe('New text content');
  });

  it('should have internal part element', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal?.tagName).toBe('DIV');
  });

  it('should tokenize with character format', async () => {
    element.textContent = 'Hi';
    element.format = 'character';
    await elementIsStable(element);

    const tokens = element.shadowRoot?.querySelectorAll('[part="token"]');
    expect(tokens.length).toBe(2); // 'H' and 'i'
  });

  it('should tokenize with whitespace format', async () => {
    element.textContent = 'Hello world test';
    element.format = 'whitespace';
    await elementIsStable(element);

    const tokens = element.shadowRoot?.querySelectorAll('[part="token"]');
    expect(tokens.length).toBe(3); // 'Hello', 'world', 'test'
  });

  it('should return tokens', async () => {
    element.textContent = 'Hello world';
    element.format = 'word-piece';
    await elementIsStable(element);
    expect(element.tokens.length).toBe(3);
    expect(element.tokens[0]).toBe('Hello');
  });

  it('should apply token colors', async () => {
    element.textContent = 'Test tokenization';
    await elementIsStable(element);

    const firstToken = element.shadowRoot?.querySelector('[part="token"]') as HTMLElement;
    expect(firstToken).toBeTruthy();
    expect(firstToken.style.backgroundColor).toBeTruthy();
  });

  it('should allow CSS custom properties to be overridden', async () => {
    element.style.setProperty('--background', 'red');
    element.style.setProperty('--padding', '20px');
    element.style.setProperty('--border-radius', '10px');
    element.style.setProperty('--font-family', 'monospace');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--padding')).toBe('20px');
    expect(element.style.getPropertyValue('--border-radius')).toBe('10px');
    expect(element.style.getPropertyValue('--font-family')).toBe('monospace');
  });

  it('should update tokens when format changes', async () => {
    element.textContent = 'Testing';
    element.format = 'word-piece';
    await elementIsStable(element);

    const tokensWordPiece = element.shadowRoot?.querySelectorAll('[part="token"]').length;

    element.format = 'character';
    await elementIsStable(element);

    const tokensCharacter = element.shadowRoot?.querySelectorAll('[part="token"]').length;

    expect(tokensCharacter).toBeGreaterThan(tokensWordPiece || 0);
  });

  it('should render slot for placeholder content', async () => {
    const fixtureWithSlot = await createFixture(html`<bp-format-token></bp-format-token>`);
    const elementWithSlot = fixtureWithSlot.querySelector<BpFormatToken>('bp-format-token');
    await elementIsStable(elementWithSlot);

    const slot = elementWithSlot.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();

    removeFixture(fixtureWithSlot);
  });

  it('should handle special characters in tokenization', async () => {
    element.textContent = 'Hello, world! 123';
    element.format = 'word-piece';
    await elementIsStable(element);

    const tokens = element.shadowRoot?.querySelectorAll('[part="token"]');
    expect(tokens.length).toBeGreaterThan(0);
  });

  it('should handle sentence-piece format with space markers', async () => {
    element.textContent = 'Hello world';
    element.format = 'sentence-piece';
    await elementIsStable(element);

    const tokens = element.shadowRoot?.querySelectorAll('[part="token"]');
    expect(tokens.length).toBeGreaterThan(0);

    // Check for space marker (▁)
    const hasSpaceMarker = Array.from(tokens).some(token => token.textContent?.includes('▁'));
    expect(hasSpaceMarker).toBe(true);
  });

  it('should handle llama format with space markers', async () => {
    element.textContent = 'Testing LLaMA';
    element.format = 'llama';
    await elementIsStable(element);

    const tokens = element.shadowRoot?.querySelectorAll('[part="token"]');
    expect(tokens.length).toBeGreaterThan(0);

    // Check for space marker (▁)
    const hasSpaceMarker = Array.from(tokens).some(token => token.textContent?.includes('▁'));
    expect(hasSpaceMarker).toBe(true);
  });

  it('should handle bpe format', async () => {
    element.textContent = 'Testing BPE tokenization';
    element.format = 'bpe';
    await elementIsStable(element);

    const tokens = element.shadowRoot?.querySelectorAll('[part="token"]');
    expect(tokens.length).toBeGreaterThan(0);
  });
});
