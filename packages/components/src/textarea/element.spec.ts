import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpTextarea } from '@blueprintui/components/textarea';
import '@blueprintui/components/include/textarea.js';

describe('bp-textarea', () => {
  let element: BpTextarea;
  let internalTextarea: HTMLTextAreaElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>textarea</label>
        <bp-textarea></bp-textarea>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpTextarea>('bp-textarea');
    internalTextarea = element.shadowRoot.querySelector('textarea');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-textarea')).toBe(BpTextarea);
  });

  it('should set the internal textarea aria-label from user provided label', async () => {
    await elementIsStable(element);
    expect(internalTextarea.ariaLabel).toBe('textarea');
  });

  it('should set the internal textarea value', async () => {
    element.value = 'test';
    await elementIsStable(element);
    expect(internalTextarea.value).toBe('test');
  });

  it('should set autocomplete on internal textarea', async () => {
    await elementIsStable(element);
    expect(internalTextarea.autocomplete).toBe('');

    element.autocomplete = 'on';
    await elementIsStable(element);
    expect(internalTextarea.autocomplete).toBe('on');
  });

  it('should disable internal textarea if input is disabled', async () => {
    await elementIsStable(element);
    expect(internalTextarea.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(internalTextarea.disabled).toBe(true);
  });

  it('should set internal textarea placeholder', async () => {
    await elementIsStable(element);
    expect(internalTextarea.placeholder).toBe('');

    element.placeholder = 'test';
    await elementIsStable(element);
    expect(internalTextarea.placeholder).toBe('test');
  });

  it('should set internal textarea minLength', async () => {
    await elementIsStable(element);
    expect(internalTextarea.minLength).toBe(-1);

    element.minLength = 10;
    await elementIsStable(element);
    expect(internalTextarea.minLength).toBe(10);
  });

  it('should set internal textarea maxLength', async () => {
    await elementIsStable(element);
    expect(internalTextarea.maxLength).toBe(-1);

    element.maxLength = 10;
    await elementIsStable(element);
    expect(internalTextarea.maxLength).toBe(10);
  });
});
