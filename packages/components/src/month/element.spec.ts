import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpTime } from '@blueprintui/components/time';
import '@blueprintui/components/include/time.js';

describe('bp-time', () => {
  let element: BpTime;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-time>
        <label>time</label>
        <input type="time" />
        <bp-field-message>message text</bp-field-message>
      </bp-time>
    `);
    element = fixture.querySelector<BpTime>('bp-time');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });
});
