export const metadata = {
  name: 'select',
  elements: ['bp-select']
};


/** @summary Provides a dropdown menu for selecting one or more options from a list. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/select.js';
    </script>

    <bp-field>
      <label>select</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}


/** @summary Demonstrates the select in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field layout="vertical">
        <label>label</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>disabled</label>
        <bp-select disabled>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="error">
        <label>error</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="success">
        <label>success</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the select in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-select disabled>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the select in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-select disabled>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-select>
          <bp-option>option one</bp-option>
          <bp-option>option two</bp-option>
          <bp-option>option three</bp-option>
        </bp-select>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Shows multi-select with multiple option selection. */
export function multiple() {
  return /* html */`
    <bp-field>
      <label>label</label>
      <bp-select multiple>
        <bp-option>Option One</bp-option>
        <bp-option>Option Two</bp-option>
        <bp-option>Option Three</bp-option>
        <bp-option>Option Four</bp-option>
        <bp-option>Option Five</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}


/** @summary Demonstrates select with custom display size. */
export function size() {
  return /* html */`
    <bp-field>
      <label>label</label>
      <bp-select size="5">
        <bp-option>Option One</bp-option>
        <bp-option>Option Two</bp-option>
        <bp-option>Option Three</bp-option>
        <bp-option>Option Four</bp-option>
        <bp-option>Option Five</bp-option>
        <bp-option>Option Six</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}


/** @summary Shows select with default selection values. */
export function selectionDefaults() {
  return /* html */`
    <div bp-layout="block gap:md">
      <bp-field>
        <label>select</label>
        <bp-select>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-select>
        <bp-field-message>first selection</bp-field-message>
      </bp-field>
      <bp-field>
        <label>select</label>
        <bp-select>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2" selected>Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-select>
        <bp-field-message>second selection (selected attr)</bp-field-message>
      </bp-field>
      <bp-field>
        <label>select</label>
        <bp-select id="select-property">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-select>
        <bp-field-message>third selection (property setter)</bp-field-message>
      </bp-field>
    </div>
    <script type="module">
      import '@blueprintui/components/include/select.js';
      const select = document.querySelector('#select-property');
      select.value = '3';
    </script>
  `;
}