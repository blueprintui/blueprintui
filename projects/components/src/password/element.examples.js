export const metadata = {
  name: 'password',
  elements: ['bp-password']
};


/** @summary Provides secure password input with show/hide toggle functionality. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/password.js';
    </script>

    <bp-field>
      <label>password</label>
      <bp-password value="123456"></bp-password>
    </bp-field>
  `;
}


/** @summary Demonstrates the password input in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field layout="vertical">
        <label>label</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>disabled</label>
        <bp-password value="123456" disabled></bp-password>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="error">
        <label>error</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="success">
        <label>success</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the password input in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-password value="123456" disabled></bp-password>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the password input in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-password value="123456" disabled></bp-password>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-password value="123456"></bp-password>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}
