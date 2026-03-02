import { html } from 'lit';
import { createFixture, removeFixture } from '@blueprintui/test';
import { onChildListMutation, onFirstInteraction } from './events.js';

describe('onChildListMutation', () => {
  let fixture: HTMLElement;
  let list: HTMLUListElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<ul>
        <li>one</li>
      </ul>`
    );
    list = fixture.querySelector('ul')!;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should track additons to child list', async () => {
    const mutation = new Promise(r => onChildListMutation(list, () => r(null)));
    const li = document.createElement('li');
    li.innerText = 'two';
    list.appendChild(li);
    await mutation;
    expect(list.querySelectorAll('li').length).toBe(2);
  });

  it('should track removals in child list', async () => {
    const mutation = new Promise(r => onChildListMutation(list, () => r(null)));
    list.querySelector('li')!.remove();
    await mutation;
    expect(list.querySelectorAll('li').length).toBe(0);
  });
});

describe('onFirstInteraction', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  it('should resolve on pointerdown', async () => {
    const promise = onFirstInteraction(element);
    element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    const result = await promise;
    expect(result).toBeNull();
  });

  it('should resolve on mouseover', async () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    const promise = onFirstInteraction(el);
    el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const result = await promise;
    expect(result).toBeNull();
    el.remove();
  });

  it('should resolve on keydown', async () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    const promise = onFirstInteraction(el);
    el.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
    const result = await promise;
    expect(result).toBeNull();
    el.remove();
  });

  it('should resolve on focus', async () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    const promise = onFirstInteraction(el);
    el.dispatchEvent(new FocusEvent('focus'));
    const result = await promise;
    expect(result).toBeNull();
    el.remove();
  });

  it('should resolve immediately if element was already interacted with', async () => {
    const firstPromise = onFirstInteraction(element);
    element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    const firstResult = await firstPromise;
    expect(firstResult).toBeNull();

    const secondResult = await onFirstInteraction(element);
    expect(secondResult).toBeNull();
  });
});
