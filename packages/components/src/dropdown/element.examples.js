export const metadata = {
  name: 'dropdown',
  elements: ['bp-dropdown']
};

export function example() {
  return /* html */`
    <bp-dropdown hidden closable>hello there</bp-dropdown>
    <bp-button>Open Dropdown</bp-button>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/button.js';

      const dropdown = document.querySelector('bp-dropdown');
      const button = document.querySelector('bp-button');
      dropdown.anchor = button;
      dropdown.addEventListener('close', () => dropdown.hidden = true);
      button.addEventListener('click', () => dropdown.hidden = false);
    </script>
  `;
}

export function checkboxGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="dropdown-btn">Open Dropdown</bp-button>
      <bp-dropdown anchor="dropdown-btn">
        <bp-fieldset layout="vertical">
          <label>label</label>

          <label>checkbox 1</label>
          <bp-checkbox value="1" checked></bp-checkbox>

          <label>checkbox 2</label>
          <bp-checkbox value="2"></bp-checkbox>

          <label>checkbox 3</label>
          <bp-checkbox value="3"></bp-checkbox>
        </bp-fieldset>
      </bp-dropdown>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/checkbox.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}

export function radioGroup() {
  return /* html */`
    <div bp-layout="block center" style="height: 100%">
      <bp-button id="dropdown-btn">Open Dropdown</bp-button>
      <bp-dropdown anchor="dropdown-btn">
        <bp-fieldset layout="vertical">
          <label>label</label>

          <label>radio 1</label>
          <bp-radio value="1" checked></bp-radio>

          <label>radio 2</label>
          <bp-radio value="2"></bp-radio>

          <label>radio 3</label>
          <bp-radio value="3"></bp-radio>
        </bp-fieldset>
      </bp-dropdown>
    </div>
    <script type="module">
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/radio.js';
      import '@blueprintui/components/include/button.js';
    </script>
  `;
}
