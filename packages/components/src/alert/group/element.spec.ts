import { html } from 'lit';
import '@blueprintui/components/include/alert.js';
import { BpAlertGroup, BpAlert } from '@blueprintui/components/alert';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('alert group element', () => {
  let fixture: HTMLElement;
  let element: BpAlertGroup;
  let alerts: NodeListOf<BpAlert>;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-alert-group>
      <bp-alert>alert 1</bp-alert>
      <bp-alert>alert 2</bp-alert>
    </bp-alert-group>`);

    element = fixture.querySelector<BpAlertGroup>('bp-alert-group');
    alerts = fixture.querySelectorAll<BpAlert>('bp-alert');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', () => {
    expect(customElements.get('bp-alert')).toBe(BpAlert);
    expect(customElements.get('bp-alert-group')).toBe(BpAlertGroup);
  });

  it('should set alert status properties when set by group', async () => {
    expect(element.status).toBe(undefined);
    expect(alerts[0].status).toBe(undefined);
    expect(alerts[1].status).toBe(undefined);

    element.status = 'accent';
    await element.updateComplete;
    expect(element.status).toBe('accent');
    expect(alerts[0].status).toBe('accent');
    expect(alerts[1].status).toBe('accent');

    element.status = 'success';
    await element.updateComplete;
    expect(element.status).toBe('success');
    expect(alerts[0].status).toBe('success');
    expect(alerts[1].status).toBe('success');

    element.status = 'warning';
    await element.updateComplete;
    expect(element.status).toBe('warning');
    expect(alerts[0].status).toBe('warning');
    expect(alerts[1].status).toBe('warning');

    element.status = 'danger';
    await element.updateComplete;
    expect(element.status).toBe('danger');
    expect(alerts[0].status).toBe('danger');
    expect(alerts[1].status).toBe('danger');
  });
});
