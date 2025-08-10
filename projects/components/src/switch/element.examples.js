export const metadata = {
  name: 'switch',
  elements: ['bp-switch']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/switch.js';
    </script>

    <bp-field>
      <label>switch</label>
      <bp-switch checked></bp-switch>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;
}

export function form() {
  return /* html */`
    <form id="switch-form" bp-layout="block gap:md">
      <bp-field>
        <label>switch</label>
        <bp-switch name="expand" checked></bp-switch>
      </bp-field>
      <span bp-layout="block:center">true</span>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
      const input = document.querySelector('#switch-form bp-switch');
      const form = document.querySelector('#switch-form');
      input.addEventListener('change', (e) => {
        document.querySelector('#switch-form span').innerHTML = e.target.checked;
        console.log(Object.fromEntries(new FormData(form)))
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}

export function status() {
  return /* html */`
    <div bp-layout="block gap:lg">
      <bp-field>
        <label>switch</label>
        <bp-switch checked></bp-switch>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-switch disabled></bp-switch>
        <bp-field-message>disabled text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>checked disabled</label>
        <bp-switch checked disabled></bp-switch>
        <bp-field-message>disabled text</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>error</label>
        <bp-switch></bp-switch>
        <bp-field-message status="error">error text</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>success</label>
        <bp-switch checked></bp-switch>
        <bp-field-message status="success">success text</bp-field-message>
      </bp-field>
    </div>
  `;
}

export function verticalGroup() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-fieldset>
        <label>label</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <!-- disable all controls within group or set disabled on input individually -->
      <bp-fieldset disabled>
        <label>disabled</label>

        <label>switch 1</label>
        <bp-switch checked disabled></bp-switch>

        <label>switch 2</label>
        <bp-switch disabled></bp-switch>

        <label>switch 3</label>
        <bp-switch disabled></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset status="error">
        <label>error</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="error">message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset status="success">
        <label>success</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="success">message text</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}

export function verticalInlineGroup() {
  return /* html */`
    <bp-form-group layout="vertical-inline">
      <bp-fieldset layout="vertical-inline">
        <label>label</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" disabled>
        <label>disabled</label>

        <label>switch 1</label>
        <bp-switch checked disabled></bp-switch>

        <label>switch 2</label>
        <bp-switch disabled></bp-switch>

        <label>switch 3</label>
        <bp-switch disabled></bp-switch>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" status="error">
        <label>error</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" status="success">
        <label>success</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}

export function horizontalGroup() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-fieldset layout="horizontal">
        <label>label</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" disabled>
        <label>disabled</label>

        <label>switch 1</label>
        <bp-switch checked disabled></bp-switch>

        <label>switch 2</label>
        <bp-switch disabled></bp-switch>

        <label>switch 3</label>
        <bp-switch disabled></bp-switch>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" status="error">
        <label>error</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" status="success">
        <label>success</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}

export function horizontalInlineGroup() {
  return /* html */`
    <bp-form-group layout="horizontal-inline">
      <bp-fieldset layout="horizontal-inline">
        <label>label</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" disabled>
        <label>disabled</label>

        <label>switch 1</label>
        <bp-switch checked disabled></bp-switch>

        <label>switch 2</label>
        <bp-switch disabled></bp-switch>

        <label>switch 3</label>
        <bp-switch disabled></bp-switch>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" status="error">
        <label>error</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" status="success">
        <label>success</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}

export function compactGroup() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-fieldset layout="compact">
        <label>label</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" disabled>
        <label>disabled</label>

        <label>switch 1</label>
        <bp-switch checked disabled></bp-switch>

        <label>switch 2</label>
        <bp-switch disabled></bp-switch>

        <label>switch 3</label>
        <bp-switch disabled></bp-switch>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" status="error">
        <label>error</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" status="success">
        <label>success</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}

export function switchAlign() {
  return /* html */`
    <div bp-layout="block gap:lg">
      <bp-field>
        <label>left</label>
        <bp-switch checked></bp-switch>
      </bp-field>

      <bp-field control-align="right">
        <label>right</label>
        <bp-switch checked></bp-switch>
      </bp-field>

      <bp-fieldset>
        <label>Group Left</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>
      </bp-fieldset>

      <bp-fieldset control-align="right">
        <label>Group Right</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>
      </bp-fieldset>
    </div>
  `;
}

export function inlineGroupControlMessages() {
  return /* html */`
    <div bp-layout="block gap:lg">
      <bp-fieldset>
        <label>label</label>
        <bp-field>
          <label>switch 1</label>
          <bp-switch checked></bp-switch>
        </bp-field>

        <bp-field>
          <label>switch 2</label>
          <bp-switch></bp-switch>
          <bp-field-message><a bp-text="link" href="#">learn more</a></bp-field-message>
        </bp-field>

        <bp-field>
          <label>switch 3</label>
          <bp-switch></bp-switch>
        </bp-field>
      </bp-fieldset>
    </div>
  `;
}
