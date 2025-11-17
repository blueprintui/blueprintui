export const metadata = {
  name: 'number-stepper',
  elements: ['bp-number-stepper']
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/number-stepper.js';
    </script>

    <bp-field>
      <label>Quantity</label>
      <bp-number-stepper value="1" min="0" max="10" step="1"></bp-number-stepper>
      <bp-field-message>Select quantity</bp-field-message>
    </bp-field>
  `;
}

export function decimal() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Temperature (°C)</label>
        <bp-number-stepper value="20.5" min="-10" max="40" step="0.5"></bp-number-stepper>
        <bp-field-message>Adjust in 0.5° increments</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Rating</label>
        <bp-number-stepper value="4.5" min="0" max="5" step="0.1"></bp-number-stepper>
        <bp-field-message>Rate from 0 to 5</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function continuous() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Volume (Hold to repeat)</label>
        <bp-number-stepper
          value="50"
          min="0"
          max="100"
          continuous
          continuous-delay="300"
          continuous-interval="50"></bp-number-stepper>
        <bp-field-message>Hold buttons to adjust quickly</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Brightness (Hold to repeat)</label>
        <bp-number-stepper
          value="75"
          min="0"
          max="100"
          continuous></bp-number-stepper>
      </bp-field>
    </bp-form-group>
  `;
}

export function readonly() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Read-only</label>
        <bp-number-stepper value="10" min="0" max="20" readonly></bp-number-stepper>
        <bp-field-message>Cannot be changed</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function disabled() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Disabled</label>
        <bp-number-stepper value="5" min="0" max="10" disabled></bp-number-stepper>
      </bp-field>
    </bp-form-group>
  `;
}

export function validation() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field validate>
        <label>Team Size</label>
        <bp-number-stepper value="5" min="1" max="10" required></bp-number-stepper>
        <bp-field-message error="rangeUnderflow">Minimum team size is 1</bp-field-message>
        <bp-field-message error="rangeOverflow">Maximum team size is 10</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function vertical() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Quantity</label>
        <bp-number-stepper value="1" min="0" max="10"></bp-number-stepper>
        <bp-field-message>Select quantity</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Price</label>
        <bp-number-stepper value="100" min="0" max="1000" step="10"></bp-number-stepper>
      </bp-field>
    </bp-form-group>
  `;
}

export function horizontal() {
  return /* html */ `
    <bp-form-group layout="horizontal">
      <bp-field>
        <label>Width</label>
        <bp-number-stepper value="800" min="100" max="1920" step="10"></bp-number-stepper>
      </bp-field>

      <bp-field>
        <label>Height</label>
        <bp-number-stepper value="600" min="100" max="1080" step="10"></bp-number-stepper>
      </bp-field>
    </bp-form-group>
  `;
}

export function compact() {
  return /* html */ `
    <bp-form-group layout="compact">
      <bp-field>
        <label>Rows</label>
        <bp-number-stepper value="10" min="1" max="100"></bp-number-stepper>
      </bp-field>

      <bp-field>
        <label>Columns</label>
        <bp-number-stepper value="10" min="1" max="100"></bp-number-stepper>
      </bp-field>
    </bp-form-group>
  `;
}
