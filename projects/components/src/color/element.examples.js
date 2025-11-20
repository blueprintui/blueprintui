export const metadata = {
  name: 'color',
  elements: ['bp-color']
};

/** @summary Allows users to select colors using a color picker input. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/color.js';
    </script>

    <bp-field>
      <label>color</label>
      <bp-color></bp-color>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}

/** @summary Demonstrates the color picker in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field layout="vertical">
        <label>label</label>
        <bp-color></bp-color>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>disabled</label>
        <bp-color disabled></bp-color>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>error</label>
        <bp-color></bp-color>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>success</label>
        <bp-color></bp-color>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Demonstrates the color picker in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-color></bp-color>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-color disabled></bp-color>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-color></bp-color>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-color></bp-color>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Demonstrates the color picker in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-color></bp-color>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-color disabled></bp-color>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-color></bp-color>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-color></bp-color>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}
