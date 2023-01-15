import { html } from 'lit';
import { createFixture, removeFixture } from '../../test/index.js';
import { onChildListMutation } from './events.js';

describe('onChildListMutation', () => {
  let fixture: HTMLElement;
  let list: HTMLUListElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<ul>
        <li>one</li>
      </ul>`
    );
    list = fixture.querySelector('ul');
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
    list.querySelector('li').remove();
    await mutation;
    expect(list.querySelectorAll('li').length).toBe(0);
  });
});