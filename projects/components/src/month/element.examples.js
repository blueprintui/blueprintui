export const metadata = {
  name: 'month',
  elements: ['bp-month']
};


/** @summary Enables month and year selection. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/month.js';
    </script>

    <bp-field>
      <label>month</label>
      <bp-month></bp-month>
      <bp-field-message>message</bp-field-message>
    </bp-field>
  `;
}


/** @summary Demonstrates the month picker in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field layout="vertical">
        <label>label</label>
        <bp-month></bp-month>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>disabled</label>
        <bp-month disabled></bp-month>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="error">
        <label>error</label>
        <bp-month></bp-month>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="success">
        <label>success</label>
        <bp-month></bp-month>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the month picker in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-month></bp-month>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-month disabled></bp-month>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-month></bp-month>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-month></bp-month>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the month picker in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-month></bp-month>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-month disabled></bp-month>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-month></bp-month>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-month></bp-month>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

// export function monthDatalist() {
//   return /* html */`
//     <bp-month>
//       <label>month with datalist</label>
//       <input type="month" value="11:00" />
//       <datalist>
//         <option value="11:00"></option>
//         <option value="12:00"></option>
//         <option value="13:00"></option>
//       </datalist>
//       <bp-field-message>message text</bp-field-message>
//     </bp-field>
//   `;
// }