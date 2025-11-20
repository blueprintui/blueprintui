export const metadata = {
  name: 'time',
  elements: ['bp-time']
};


/** @summary Enables time selection with hours and minutes. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/time.js';
    </script>

    <bp-field>
      <label>time</label>
      <bp-time min="09:00" max="18:00" value="11:00"></bp-time>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}


/** @summary Demonstrates the time picker in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field layout="vertical">
        <label>label</label>
        <bp-time></bp-time>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>disabled</label>
        <bp-time disabled></bp-time>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="error">
        <label>error</label>
        <bp-time></bp-time>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="success">
        <label>success</label>
        <bp-time></bp-time>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the time picker in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-time></bp-time>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-time disabled></bp-time>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-time></bp-time>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-time></bp-time>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the time picker in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-time></bp-time>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-time disabled></bp-time>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-time></bp-time>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-time></bp-time>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Shows time picker with datalist suggestions. */
export function timeDatalist() {
  return /* html */`
    <bp-field>
      <label>time with datalist</label>
      <bp-time value="11:00"></bp-time>
      <datalist>
        <option value="11:00"></option>
        <option value="12:00"></option>
        <option value="13:00"></option>
      </datalist>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}