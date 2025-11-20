export const metadata = {
  name: 'input',
  elements: ['bp-input']
};


/** @summary Allows users to enter and validate text input. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/input.js';
    </script>

    <bp-field>
      <label>label</label>
      <bp-input></bp-input>
    </bp-field>
  `;
}


/** @summary Demonstrates input with icon buttons for actions. */
export function iconButtons() {
  return /* html */`
    <script type="module">
      import '@blueprintui/icons/include.js';  
      import '@blueprintui/icons/shapes/cloud.js';
      import '@blueprintui/icons/shapes/close.js';
      import '@blueprintui/icons/shapes/info.js';
    </script>
    <bp-form-group layout="vertical">
      <bp-field>
        <label>icon</label>
        <bp-input placeholder="example">
          <bp-button-icon readonly slot="prefix" action="inline">
            <bp-icon shape="cloud" badge="success"></bp-icon>
          </bp-button-icon>
        </bp-input>
      </bp-field>

      <bp-field>
        <label>icon button</label>
        <bp-input type="url">
          <bp-button-icon action="inline" shape="close" slot="suffix" aria-label="clear example input"></bp-button-icon>
        </bp-input>
      </bp-field>

      <bp-field>
        <label>icon button label</label><bp-button-icon action="inline" slot="label" shape="info" aria-label="get more details"></bp-button-icon>
        <bp-input placeholder="example"></bp-input>
      </bp-field>

      <bp-field>
        <label>icon button message</label>
        <bp-input></bp-input>
        <bp-field-message>
          message text
          <bp-button-icon shape="info" action="inline" aria-label="get more details"></bp-button-icon>
        </bp-field-message>
      </bp-field>

      <!-- <bp-password>
        <label>additional actions to existing input types</label>
        <input type="password" value="123456" />
        <bp-button-icon shape="close" aria-label="clear password input"></bp-button-icon>
      </bp-password> -->
    </bp-form-group>
  `;
}


/** @summary Shows input with prefix and suffix content. */
export function prefixSuffix() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>suffix</label>
        <bp-input type="url">
          <bp-button action="flat" readonly slot="suffix">.com</bp-button>
        </bp-input>
      </bp-field>

      <bp-field>
      <label>prefix</label>
        <bp-input type="url">
          <bp-button action="flat" readonly slot="prefix">https://</bp-button>
        </bp-input>
      </bp-field>

      <bp-field>
        <label>prefix + suffix</label>
        <bp-input type="url">
          <bp-button action="flat" readonly slot="prefix">https://</bp-button>
          <bp-button action="flat" readonly slot="suffix">.com</bp-button>
        </bp-input>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the input in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>label</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-input placeholder="name" disabled></bp-input>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field>
        <label>error</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field>
        <label>success</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the input in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-input placeholder="name" disabled></bp-input>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Demonstrates the input in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-input placeholder="name" disabled></bp-input>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}


/** @summary Shows the input in readonly state. */
export function readonly() {
  return /* html */`
    <bp-field>
      <label>readonly input</label>
      <bp-input placeholder="name" readonly></bp-input>
    </bp-field>
  `;
}


/** @summary Demonstrates various input width configurations. */
export function inputWidth() {
  return /* html */`
    <div bp-layout="block gap:lg">
      <bp-field>
        <label>default width</label>
        <bp-input placeholder="name"></bp-input>
      </bp-field>

      <bp-field control-width="shrink">
        <label>shrink width</label>
        <bp-input placeholder="name" value="123456789012345678901234567890123456789012345678901234567890"></bp-input>
      </bp-field>

      <bp-field style="max-width: 300px">
        <label>custom width</label>
        <bp-input placeholder="name"></bp-input>
      </bp-field>
    </div>
  `;
}


/** @summary Shows different HTML5 input type variations. */
export function inputTypes() {
  return /* html */`
    <div bp-layout="block gap:lg">
      <bp-field>
        <label>Text</label>
        <bp-input type="text" placeholder="name"></bp-input>
      </bp-field>

      <bp-field>
        <label>Email</label>
        <bp-input type="email" placeholder="test@test.com"></bp-input>
      </bp-field>

      <bp-field>
        <label>Number</label>
        <bp-input type="number" placeholder="age"></bp-input>
      </bp-field>
    </div>
  `;
}


/** @summary Shows form validation with error messages. */
export function validation() {
  return /* html */`
    <bp-field validate>
      <label>input</label>
      <bp-input type="text" value="012 345 6789" pattern="[0-9]{3} [0-9]{3} [0-9]{4}"></bp-input>
      <bp-field-message error="valueMissing">value missing</bp-field-message>
      <bp-field-message error="tooShort">too short</bp-field-message>
      <bp-field-message error="tooLong">too long</bp-field-message>
      <bp-field-message error="patternMismatch">pattern mismatch</bp-field-message>
    </bp-field>
    <script type="module">
      import '@blueprintui/components/include/input.js';
    </script>
  `;
}


/** @summary Demonstrates alignment options for input buttons. */
export function inputButtonAlignment() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/components/include/button.js';
    </script>

    <div bp-layout="inline gap:xs">
      <bp-input aria-label="input" value="text input" style="width: 200px;"></bp-input>
      <bp-button>search</bp-button>
    </div>
  `;
}