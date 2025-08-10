export const metadata = {
  name: 'search',
  elements: ['bp-search']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/search.js';
    </script>

    <bp-field>
      <label>search</label>
      <bp-search></bp-search>
    </bp-field>
  `;
}

export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>label</label>
        <bp-search></bp-search>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-search disabled></bp-search>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>error</label>
        <bp-search></bp-search>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>success</label>
        <bp-search></bp-search>
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
        <bp-search></bp-search>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-search disabled></bp-search>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-search></bp-search>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-search></bp-search>
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
        <bp-search></bp-search>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-search disabled></bp-search>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-search></bp-search>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-search></bp-search>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function searchInline() {
  return /* html */`
    <bp-search placeholder="search" aria-label="search"></bp-search>
  `;
}

// export function datalist() {
//   return /* html */`
//     <bp-field>
//       <label>search</label>
//       <bp-search></bp-search>
//       <datalist>
//         <option value="Item 1"></option>
//         <option value="Item 2"></option>
//         <option value="Item 3"></option>
//       </datalist>
//     </bp-field>
//   `;
// }
