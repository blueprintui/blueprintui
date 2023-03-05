import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpPassword } from '@blueprintui/components/password';
import '@blueprintui/components/include/password.js';

describe('bp-password', () => {
  let element: BpPassword;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-password></bp-password> `);

    element = fixture.querySelector<BpPassword>('bp-password');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should show/hide the password and icon', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('password');
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('eye');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.type).toBe('text');
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('eye-hide');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.type).toBe('password');
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('eye');
  });

  it('should focus back on input when show/hide is clicked', async () => {
    await elementIsStable(element);
    expect(document.activeElement).not.toEqual(element);

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(document.activeElement).toEqual(element);

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(document.activeElement).toEqual(element);
  });

  it('should have the correct aria-label for the show/hide button', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').getAttribute('aria-label')).toEqual('show');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').getAttribute('aria-label')).toEqual('hide');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').getAttribute('aria-label')).toEqual('show');
  });
});
