export const metadata = {
  name: 'radio',
  elements: ['bp-radio']
};

export function example() {
  return /* html */`
<bp-fieldset>
  <label>label</label>

  <label>radio 1</label>
  <bp-radio value="1" checked></bp-radio>

  <label>radio 2</label>
  <bp-radio value="2"></bp-radio>

  <label>radio 3</label>
  <bp-radio value="3"></bp-radio>

  <bp-field-message>message text</bp-field-message>
</bp-fieldset>
<script type="module">
  const fieldset = document.querySelector('bp-fieldset');
  const radios = Array.from(fieldset.querySelectorAll('bp-radio'));
  fieldset.addEventListener('change', () => console.log(radios.find(r => r.checked).value));
</script>
  `;
}

export function form() {
  return /* html */`
    <form id="radio-form" bp-layout="block gap:md">
      <bp-fieldset>
        <label>label</label>

        <label>radio 1</label>
        <bp-radio value="1" name="radio-group"></bp-radio>

        <label>radio 2</label>
        <bp-radio value="2" name="radio-group" checked></bp-radio>

        <label>radio 3</label>
        <bp-radio value="3" name="radio-group"></bp-radio>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>
      <span bp-layout="block:center">2</span>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-expand.js';
      const form = document.querySelector('#radio-form');
      form.addEventListener('change', (e) => document.querySelector('#radio-form span').innerHTML = Object.fromEntries(new FormData(form))['radio-group']);
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

        <label>radio 1</label>
        <bp-radio value="1" checked></bp-radio>

        <label>radio 2</label>
        <bp-radio value="2"></bp-radio>

        <label>radio 3</label>
        <bp-radio value="3"></bp-radio>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical" status="success">
        <label>success</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
    <script type="module">
      document.querySelector('bp-form-group').addEventListener('change', e => console.log(e.target));
    </script>
  `;
}

export function verticalInlineGroup() {
  return /* html */`
    <bp-form-group layout="vertical-inline">
      <bp-fieldset layout="vertical-inline">
        <label>label</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" disabled>
        <label>disabled</label>

        <label>radio 1</label>
        <bp-radio checked disabled></bp-radio>

        <label>radio 2</label>
        <bp-radio disabled></bp-radio>

        <label>radio 3</label>
        <bp-radio disabled></bp-radio>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" status="error">
        <label>error</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="vertical-inline" status="success">
        <label>success</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

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

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" disabled>
        <label>disabled</label>

        <label>radio 1</label>
        <bp-radio checked disabled></bp-radio>

        <label>radio 2</label>
        <bp-radio disabled></bp-radio>

        <label>radio 3</label>
        <bp-radio disabled></bp-radio>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" status="error">
        <label>error</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal" status="success">
        <label>success</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

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

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline">
        <label>disabled</label>

        <label>radio 1</label>
        <bp-radio checked disabled></bp-radio>

        <label>radio 2</label>
        <bp-radio disabled></bp-radio>

        <label>radio 3</label>
        <bp-radio disabled></bp-radio>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" status="error">
        <label>error</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="horizontal-inline" status="success">
        <label>success</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

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

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" disabled>
        <label>disabled</label>

        <label>radio 1</label>
        <bp-radio checked disabled></bp-radio>

        <label>radio 2</label>
        <bp-radio disabled></bp-radio>

        <label>radio 3</label>
        <bp-radio disabled></bp-radio>

        <bp-field-message>disabled message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" status="error">
        <label>error</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message status="error">error message</bp-field-message>
      </bp-fieldset>

      <bp-fieldset layout="compact" status="success">
        <label>success</label>

        <label>radio 1</label>
        <bp-radio checked></bp-radio>

        <label>radio 2</label>
        <bp-radio></bp-radio>

        <label>radio 3</label>
        <bp-radio></bp-radio>

        <bp-field-message status="success">success message</bp-field-message>
      </bp-fieldset>
    </bp-form-group>
  `;
}
