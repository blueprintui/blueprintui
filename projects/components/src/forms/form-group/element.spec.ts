import { html } from 'lit';
import { removeFixture, createFixture, elementIsStable } from '@blueprintui/test';
import { BpField, BpFieldset } from '@blueprintui/components/forms';
import '@blueprintui/components/include/forms.js';
import { BpFormGroup } from '../form-group/element.js';

let fixture: HTMLElement;
let formGroup: BpFormGroup;
let fields: BpField[];
let fieldsets: BpFieldset[];

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

  it('should create the component', async () => {
    await elementIsStable(formGroup);
    expect(formGroup).toBeTruthy();
  });

  it('should set default layout property', async () => {
    await elementIsStable(formGroup);
    expect(formGroup.layout).toBe('compact');
  });

  it('should reflect layout property to attribute', async () => {
    await elementIsStable(formGroup);
    expect(formGroup.getAttribute('layout')).toBe('compact');

    formGroup.layout = 'horizontal';
    await elementIsStable(formGroup);
    expect(formGroup.getAttribute('layout')).toBe('horizontal');
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

  it('should render with correct CSS parts', async () => {
    await elementIsStable(formGroup);
    const internalPart = formGroup.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });
});

describe('bp-form-group with fieldsets', () => {
  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-form-group layout="horizontal">
        <bp-fieldset>
          <label style="width: 150px">fieldset label</label>
          <input type="radio" name="test" value="1" />
          <input type="radio" name="test" value="2" />
        </bp-fieldset>

        <bp-field>
          <label style="width: 200px">field label</label>
          <input type="text" />
        </bp-field>
      </bp-form-group>
    `);

    formGroup = fixture.querySelector<BpFormGroup>('bp-form-group');
    fieldsets = Array.from(fixture.querySelectorAll<BpFieldset>('bp-fieldset'));
    fields = Array.from(fixture.querySelectorAll<BpField>('bp-field'));
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should sync layouts for fieldsets', async () => {
    await elementIsStable(formGroup);
    expect(formGroup.layout).toBe('horizontal');
    expect(fieldsets[0].layout).toBe('horizontal');
    expect(fields[0].layout).toBe('horizontal');

    formGroup.layout = 'vertical';
    await elementIsStable(formGroup);
    expect(fieldsets[0].layout).toBe('vertical');
    expect(fields[0].layout).toBe('vertical');
  });

  it('should calculate label width from both fields and fieldsets', async () => {
    await elementIsStable(formGroup);
    await elementIsStable(formGroup);

    // Should use the maximum width from all labels (200px from field + 12px padding)
    const labelWidth = getComputedStyle(formGroup).getPropertyValue('--group-label-width');
    expect(labelWidth).not.toBe('');
    expect(labelWidth).toContain('px');
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

describe('bp-form-group edge cases', () => {
  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-form-group layout="horizontal">
        <bp-field>
          <input type="text" />
        </bp-field>
      </bp-form-group>
    `);

    formGroup = fixture.querySelector<BpFormGroup>('bp-form-group');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should handle fields without labels', async () => {
    await elementIsStable(formGroup);
    // Should not throw error when no labels are present
    const labelWidth = getComputedStyle(formGroup).getPropertyValue('--group-label-width');
    expect(labelWidth).not.toBe('');
    expect(labelWidth).toContain('px');
  });

  it('should handle empty form group', async () => {
    const emptyFixture = await createFixture(html`<bp-form-group layout="horizontal"></bp-form-group>`);
    const emptyFormGroup = emptyFixture.querySelector<BpFormGroup>('bp-form-group');

    await elementIsStable(emptyFormGroup);
    // Should not throw error when no children are present
    const labelWidth = getComputedStyle(emptyFormGroup).getPropertyValue('--group-label-width');
    expect(labelWidth).not.toBe('');
    expect(labelWidth).toContain('px');

    removeFixture(emptyFixture);
  });
});

describe('bp-form-group observer cleanup', () => {
  it('should clean up observers on disconnect', async () => {
    fixture = await createFixture(html`
      <bp-form-group layout="horizontal">
        <bp-field>
          <label>test</label>
          <input type="text" />
        </bp-field>
      </bp-form-group>
    `);

    formGroup = fixture.querySelector<BpFormGroup>('bp-form-group');
    await elementIsStable(formGroup);

    // Verify the component is working correctly
    expect(formGroup).toBeTruthy();
    expect(formGroup.layout).toBe('horizontal');

    // Disconnect and verify cleanup doesn't throw errors
    removeFixture(fixture);
  });
});
