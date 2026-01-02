import { html } from 'lit';
import { querySelectorByIdRef } from './dom.js';
import { createFixture, removeFixture } from '@blueprintui/test';

describe('querySelectorByIdRef', () => {
  let fixture: HTMLElement;
  let element: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <div>
        <span id="target">target</span>
        <span id="other">other</span>
      </div>
    `);
    element = fixture.querySelector('div') as HTMLElement;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should find element by id reference', () => {
    const result = querySelectorByIdRef(element, 'target');
    expect(result?.id).toBe('target');
  });

  it('should return undefined for non-existent id', () => {
    const result = querySelectorByIdRef(element, 'non-existent');
    expect(result).toBeUndefined();
  });

  it('should return undefined for empty id', () => {
    const result = querySelectorByIdRef(element, '');
    expect(result).toBeUndefined();
  });

  it('should only find elements in same render root', () => {
    const shadowParent = document.createElement('div');
    const shadow = shadowParent.attachShadow({ mode: 'open' });
    const shadowElement = document.createElement('span');
    shadowElement.id = 'target';
    shadow.appendChild(shadowElement);

    const result = querySelectorByIdRef(element, 'target');
    expect(result?.id).toBe('target');
    expect(result).not.toBe(shadowElement);
  });
});
