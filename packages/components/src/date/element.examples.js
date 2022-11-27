export const metadata = {
  name: 'date',
  elements: ['bp-date']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/date.js';
    </script>

    <bp-field>
      <label>date</label>
      <bp-date value="2018-07-22" min="2018-01-01" max="2019-12-31"></bp-date>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}

export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>label</label>
        <bp-date></bp-date>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-date disabled></bp-date>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>error status</label>
        <bp-date></bp-date>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>success status</label>
        <bp-date></bp-date>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-date></bp-date>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-date disabled></bp-date>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error status</label>
        <bp-date></bp-date>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success status</label>
        <bp-date></bp-date>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-date></bp-date>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-date disabled></bp-date>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error status</label>
        <bp-date></bp-date>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success status</label>
        <bp-date></bp-date>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

// export function datalist() {
//   return /* html */`
//     <bp-field>
//       <label>date</label>
//       <bp-date></bp-date>
//       <datalist>
//         <option value="2018-01-19"></option>
//         <option value="2019-06-22"></option>
//         <option value="2020-09-27"></option>
//       </datalist>
//       <bp-field-message>message text</bp-field-message>
//     </bp-field>
//   `;
// }
