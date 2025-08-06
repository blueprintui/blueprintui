import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import type { BpButtonIcon } from '@blueprintui/components/button-icon';
import { BpTime } from '@blueprintui/components/time';
import '@blueprintui/components/include/time.js';

describe('bp-time', () => {
  let element: BpTime;
  let icon: BpButtonIcon;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>time</label>
        <bp-time></bp-time>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);
    element = fixture.querySelector<BpTime>('bp-time');
    icon = element.shadowRoot.querySelector('bp-button-icon');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-time')).toBe(BpTime);
  });

  it('should default its input type to "time"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('time');
  });

  it('should render time button', async () => {
    await elementIsStable(element);
    expect(icon.shape).toBe('clock');
  });

  it('should render time button with an aria-label', async () => {
    await elementIsStable(element);
    expect(icon.ariaLabel).toBe('expand');
  });

  it('should disable time button if input is disabled', async () => {
    await elementIsStable(element);
    expect(icon.disabled).toBe(undefined);

    element.disabled = true;
    await elementIsStable(element);
    expect(icon.disabled).toBe(true);
  });

  it('should apply invalid styles when the state is invalid and touched', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(true);
  });
});
