import { html } from 'lit';
import { removeFixture, createFixture, elementIsStable } from '@blueprintui/test';
import { BpField } from '@blueprintui/components/forms';
import '@blueprintui/components/include/forms.js';
import { BpFormGroup } from '../form-group/element.js';

let fixture: HTMLElement;
let formGroup: BpFormGroup;
let fields: BpField[];

describe('bp-form-group', () => {
  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-form-group layout="compact">
        <bp-field>
          <label style="width: 200px">field</label>
          <input type="text" />
        </bp-field>

        <bp-field>
          <label>field</label>
          <input type="text" />
        </bp-field>
      </bp-form-group>
    `);

    formGroup = fixture.querySelector<BpFormGroup>('bp-form-group');
    fields = Array.from(fixture.querySelectorAll<BpField>('bp-field'));
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should sync layouts for all child fields', async () => {
    await elementIsStable(formGroup);
    expect(formGroup.layout).toBe('compact');
    expect(fields[0].layout).toBe('compact');
    expect(fields[1].layout).toBe('compact');

    formGroup.layout = 'vertical';
    await elementIsStable(formGroup);
    expect(formGroup.layout).toBe('vertical');
    expect(fields[0].layout).toBe('vertical');
    expect(fields[1].layout).toBe('vertical');
  });

  it('should sync label widths', async () => {
    formGroup.layout = 'horizontal';
    await elementIsStable(formGroup);
    await elementIsStable(formGroup);
    expect(fields[0].querySelector('label').getBoundingClientRect().width).toBe(172);
    expect(getComputedStyle(formGroup).getPropertyValue('--group-label-width')).toBe('172px');
  });

  it('should determine label width when visible', async () => {
    formGroup.setAttribute('hidden', '');
    await elementIsStable(formGroup);
    expect(getComputedStyle(formGroup).getPropertyValue('--group-label-width')).toBe('172px');

    formGroup.removeAttribute('hidden');
    await elementIsStable(formGroup);
    expect(getComputedStyle(formGroup).getPropertyValue('--group-label-width')).toBe('172px');
  });
});

describe('bp-form-group label alignment', () => {
  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-form-group layout="vertical">
        <bp-field>
          <label>control</label>
          <input type="text" />
        </bp-field>
      </bp-form-group>
    `);

    formGroup = fixture.querySelector<BpFormGroup>('bp-form-group');
    fields = Array.from(fixture.querySelectorAll<BpField>('bp-field'));
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should not set label width for vertical layouts', async () => {
    await elementIsStable(formGroup);
    expect(getComputedStyle(formGroup).getPropertyValue('--group-label-width')).toBe('');

    formGroup.layout = 'vertical-inline';
    await elementIsStable(formGroup);
    expect(getComputedStyle(formGroup).getPropertyValue('--group-label-width')).toBe('');
  });
});
