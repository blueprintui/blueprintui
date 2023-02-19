export const metadata = {
  name: 'checkbox',
  elements: ['bp-checkbox']
};

export function example() {
  return /* html */`
<bp-field>
  <label>checkbox</label>
  <bp-checkbox checked></bp-checkbox>
</bp-field>
  `;
}

export function form() {
  return /* html */`
    <form id="checkbox-form" bp-layout="block gap:md">
      <bp-field>
        <label>checkbox</label>
        <bp-checkbox name="expand" checked></bp-checkbox>
      </bp-field>
      <span bp-layout="block:center">true</span>
      <bp-button type="submit" action="outline">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
      const checkbox = document.querySelector('#checkbox-form bp-checkbox');
      const form = document.querySelector('#checkbox-form');
      checkbox.addEventListener('change', (e) => document.querySelector('#checkbox-form span').innerHTML = e.target.checked);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}

export function verticalGroup() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-fieldset layout="vertical">
        <label>label</label>

        <label>checkbox 1</label>
        <bp-checkbox value="1" checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox value="2"></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox value="3"></bp-checkbox>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <!-- disable all controls within group or set disabled on input individually -->
      <bp-fieldset layout="vertical" disabled>
        <label>disabled</label>

        <label>checkbox 1</label>
        <bp-checkbox checked disabled></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox disabled></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox disabled></bp-checkbox>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical" status="error">
        <label>error</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical" status="success">
        <label>success</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}

export function verticalInlineGroup() {
  return /* html */`
    <bp-form-group layout="vertical-inline">
      <bp-fieldset layout="vertical-inline">
        <label>label</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" disabled>
        <label>disabled</label>

        <label>checkbox 1</label>
        <bp-checkbox checked disabled></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox disabled></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox disabled></bp-checkbox>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" status="error">
        <label>error</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" status="success">
        <label>success</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

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

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" disabled>
        <label>disabled</label>

        <label>checkbox 1</label>
        <bp-checkbox checked disabled></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox disabled></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox disabled></bp-checkbox>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" status="error">
        <label>error</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" status="success">
        <label>success</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

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

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" disabled>
        <label>disabled</label>

        <label>checkbox 1</label>
        <bp-checkbox checked disabled></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox disabled></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox disabled></bp-checkbox>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" status="error">
        <label>error</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" status="success">
        <label>success</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

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

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" disabled>
        <label>disabled</label>

        <label>checkbox 1</label>
        <bp-checkbox checked disabled></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox disabled></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox disabled></bp-checkbox>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" status="error">
        <label>error</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" status="success">
        <label>success</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}
