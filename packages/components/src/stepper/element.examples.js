export const metadata = {
  name: 'stepper',
  elements: ['bp-stepper', 'bp-stepper-item']
};

export function example() {
  return /* html */`
<script type="module">
  import '@blueprintui/components/include/stepper.js';
</script>
<bp-stepper aria-label="stepper">
  <bp-stepper-item selected><a href="#">Step 1</a></bp-stepper-item>
  <bp-stepper-item>Step 2</bp-stepper-item>
  <bp-stepper-item>Step 3</bp-stepper-item>
</bp-stepper>
    `;
}

export function vertical() {
  return /* html */`
<bp-stepper aria-label="stepper" layout="vertical">
  <bp-stepper-item selected><a href="#">Step 1</a></bp-stepper-item>
  <bp-stepper-item>Step 2</bp-stepper-item>
  <bp-stepper-item>Step 3</bp-stepper-item>
</bp-stepper>
  `;
}

export function status() {
  return /* html */`
<bp-stepper aria-label="stepper">
  <bp-stepper-item>
    <a href="#">Step 1</a>
  </bp-stepper-item>
  <bp-stepper-item selected>
    Step 2
  </bp-stepper-item>
  <bp-stepper-item status="success">
    Step 3
  </bp-stepper-item>
  <bp-stepper-item status="warning">
    Step 4
  </bp-stepper-item>
  <bp-stepper-item status="danger">
    Step 5
  </bp-stepper-item>
</bp-stepper>
  `;
}

export function statusVertical() {
  return /* html */`
<bp-stepper aria-label="stepper" layout="vertical">
  <bp-stepper-item>
    <a href="#">Step 1</a>
  </bp-stepper-item>
  <bp-stepper-item selected>
    Step 2
  </bp-stepper-item>
  <bp-stepper-item status="success">
    Step 3
  </bp-stepper-item>
  <bp-stepper-item status="warning">
    Step 4
  </bp-stepper-item>
  <bp-stepper-item status="danger">
    Step 5
  </bp-stepper-item>
</bp-stepper>
  `;
}

export function disabled() {
  return /* html */`
<bp-stepper aria-label="stepper">
  <bp-stepper-item disabled selected><a href="#">Step 1</a></bp-stepper-item>
  <bp-stepper-item disabled>Step 2</bp-stepper-item>
  <bp-stepper-item>Step 3</bp-stepper-item>
</bp-stepper>
  `;
}

export function dialog() {
  return /* html */`
<bp-button popovertarget="dialog">open</bp-button>
<bp-dialog id="dialog" modal closable>
  <h2 slot="header" bp-text="section">Setup</h2>
  <div bp-layout="inline gap:sm inline:stretch">
    <bp-stepper aria-label="stepper" layout="vertical">
      <bp-stepper-item selected><a href="#">Setup</a></bp-stepper-item>
      <bp-stepper-item>
        Account
      </bp-stepper-item>
      <bp-stepper-item>
        Billing
      </bp-stepper-item>
      <bp-stepper-item>
        Activate
      </bp-stepper-item>
    </bp-stepper>
    <div bp-layout="block gap:sm">
    <bp-field>
      <label>First Name</label>
      <bp-input placeholder="name"></bp-input>
    </bp-field>

    <bp-field>
      <label>Last Name</label>
      <bp-input placeholder="name"></bp-input>
    </bp-field>

    <bp-field>
      <label>Account</label>
      <bp-select>
        <bp-option value="1">Primary</bp-option>
        <bp-option value="2">Secondary</bp-option>
        <bp-option value="3">External</bp-option>
      </bp-select>
    </bp-field>
    </div>
  </div>
  <div slot="footer" bp-layout="inline gap:xs inline:end">
    <bp-button action="secondary">Next</bp-button>
  </div>
</bp-dialog>
  `;
}
