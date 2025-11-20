export const metadata = {
  name: 'range',
  elements: ['bp-range']
};


/** @summary Allows users to select a numeric value within a range using a slider. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/range.js';
    </script>

    <bp-field>
      <label>range</label>
      <bp-range></bp-range>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}


/** @summary Demonstrates the range slider in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field layout="vertical">
        <label>label</label>
        <bp-range></bp-range>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>disabled</label>
        <bp-range disabled></bp-range>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="error">
        <label>error</label>
        <bp-range></bp-range>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="success">
        <label>success</label>
        <bp-range></bp-range>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the range slider in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-range></bp-range>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-range disabled></bp-range>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-range></bp-range>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-range></bp-range>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the range slider in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-range></bp-range>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-range disabled></bp-range>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-range></bp-range>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-range></bp-range>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Shows range slider with custom min and max values. */
export function minMax() {
  return /* html */`
    <bp-field>
      <label>min/max/step</label>
      <bp-range type="range" min="20" max="80" step="10" value="40"></bp-range>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}
