export const metadata = {
  name: 'file',
  elements: ['bp-fiile']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/file.js';
    </script>

    <bp-field>
      <label>file</label>
      <bp-file multiple accept=".png, .jpg, .jpeg"></bp-file>
    </bp-field>
    <script>
      const file = document.querySelector('bp-file');
      file.addEventListener('change', (e) => {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file.files[0]);
        document.body.appendChild(image);
      });
    </script>
  `;
}

export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field layout="vertical">
        <label>label</label>
        <bp-file multiple></bp-file>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="vertical">
        <label>disabled</label>
        <bp-file disabled></bp-file>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="error">
        <label>error</label>
        <bp-file multiple></bp-file>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="vertical" status="success">
        <label>success</label>
        <bp-file multiple></bp-file>
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
        <bp-file multiple></bp-file>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-file disabled></bp-file>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-file multiple></bp-file>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-file multiple></bp-file>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-file multiple></bp-file>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-file disabled></bp-file>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-file multiple></bp-file>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-file multiple></bp-file>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}
