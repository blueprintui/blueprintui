export const metadata = {
  name: 'combobox',
  elements: ['bp-combobox']
};

/** @summary Provides an accessible combobox form control with filtering and selection. */
export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/combobox.js';
    </script>

    <bp-field>
      <label>Country</label>
      <bp-combobox>
        <bp-option value="us">United States</bp-option>
        <bp-option value="ca">Canada</bp-option>
        <bp-option value="mx">Mexico</bp-option>
        <bp-option value="uk">United Kingdom</bp-option>
        <bp-option value="de">Germany</bp-option>
      </bp-combobox>
      <bp-field-message>Select a country</bp-field-message>
    </bp-field>
  `;
}

/** @summary Autocomplete mode allows free text input with suggestions (like datalist). */
export function autocomplete() {
  return /* html */ `
    <bp-field>
      <label>Search Framework</label>
      <bp-combobox mode="autocomplete" placeholder="Type to search...">
        <bp-option value="react">React</bp-option>
        <bp-option value="vue">Vue</bp-option>
        <bp-option value="angular">Angular</bp-option>
        <bp-option value="svelte">Svelte</bp-option>
        <bp-option value="solid">Solid</bp-option>
      </bp-combobox>
      <bp-field-message>User can submit any value</bp-field-message>
    </bp-field>
  `;
}

/** @summary Multiple selection mode allows selecting multiple options shown as tags. */
export function multiple() {
  return /* html */ `
    <bp-field>
      <label>Tags</label>
      <bp-combobox mode="multiple" value="bug,feature">
        <bp-option value="bug">Bug</bp-option>
        <bp-option value="feature">Feature</bp-option>
        <bp-option value="docs">Documentation</bp-option>
        <bp-option value="enhancement">Enhancement</bp-option>
        <bp-option value="help">Help Wanted</bp-option>
      </bp-combobox>
      <bp-field-message>Select multiple tags</bp-field-message>
    </bp-field>
  `;
}

/** @summary Demonstrates the combobox in vertical form layout. */
export function vertical() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field>
        <label>label</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-combobox placeholder="Search..." disabled>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field>
        <label>error</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field>
        <label>success</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Demonstrates the combobox in horizontal form layout. */
export function horizontal() {
  return /* html */ `
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-combobox placeholder="Search..." disabled>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Demonstrates the combobox in compact form layout. */
export function compact() {
  return /* html */ `
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-combobox placeholder="Search..." disabled>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-combobox placeholder="Search...">
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2">Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-combobox>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Shows combobox with prefix and suffix content. */
export function prefixSuffix() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/search.js';
      import '@blueprintui/icons/shapes/close.js';
    </script>
    <bp-form-group layout="vertical">
      <bp-field>
        <label>with search icon</label>
        <bp-combobox mode="autocomplete" placeholder="Search...">
          <bp-button-icon readonly slot="prefix" action="inline" shape="search"></bp-button-icon>
          <bp-option value="1">Result 1</bp-option>
          <bp-option value="2">Result 2</bp-option>
          <bp-option value="3">Result 3</bp-option>
        </bp-combobox>
      </bp-field>

      <bp-field>
        <label>with clear button</label>
        <bp-combobox placeholder="Search...">
          <bp-button-icon slot="suffix" action="inline" shape="close" aria-label="clear"></bp-button-icon>
          <bp-option value="1">Option 1</bp-option>
          <bp-option value="2">Option 2</bp-option>
          <bp-option value="3">Option 3</bp-option>
        </bp-combobox>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Shows the combobox in readonly state. */
export function readonly() {
  return /* html */ `
    <bp-field>
      <label>readonly combobox</label>
      <bp-combobox value="us" readonly>
        <bp-option value="us">United States</bp-option>
        <bp-option value="ca">Canada</bp-option>
        <bp-option value="mx">Mexico</bp-option>
      </bp-combobox>
    </bp-field>
  `;
}

/** @summary Demonstrates filtering strategies. */
export function filtering() {
  return /* html */ `
    <bp-form-group layout="vertical">
      <bp-field>
        <label>contains (default)</label>
        <bp-combobox filter="contains" placeholder="Type 'states'...">
          <bp-option value="us">United States</bp-option>
          <bp-option value="ca">Canada</bp-option>
          <bp-option value="mx">Mexico</bp-option>
        </bp-combobox>
        <bp-field-message>Matches anywhere in option text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>startswith</label>
        <bp-combobox filter="startswith" placeholder="Type 'uni'...">
          <bp-option value="us">United States</bp-option>
          <bp-option value="ca">Canada</bp-option>
          <bp-option value="uk">United Kingdom</bp-option>
        </bp-combobox>
        <bp-field-message>Only matches from start of option text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>none (server-side)</label>
        <bp-combobox filter="none" placeholder="Filter handled externally...">
          <bp-option value="1">Option 1</bp-option>
          <bp-option value="2">Option 2</bp-option>
          <bp-option value="3">Option 3</bp-option>
        </bp-combobox>
        <bp-field-message>No client-side filtering</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Shows form validation with error messages. */
export function validation() {
  return /* html */ `
    <bp-field validate>
      <label>Required combobox</label>
      <bp-combobox required>
        <bp-option value="us">United States</bp-option>
        <bp-option value="ca">Canada</bp-option>
        <bp-option value="mx">Mexico</bp-option>
      </bp-combobox>
      <bp-field-message error="valueMissing">Please select a country</bp-field-message>
    </bp-field>
  `;
}

/** @summary Shows disabled options within the combobox. */
export function disabledOptions() {
  return /* html */ `
    <bp-field>
      <label>With disabled options</label>
      <bp-combobox>
        <bp-option value="1">Available</bp-option>
        <bp-option value="2" disabled>Sold Out</bp-option>
        <bp-option value="3">Available</bp-option>
        <bp-option value="4" disabled>Coming Soon</bp-option>
      </bp-combobox>
    </bp-field>
  `;
}

/** @summary Shows empty state when no options match. */
export function emptyState() {
  return /* html */ `
    <bp-field>
      <label>Custom empty state</label>
      <bp-combobox>
        <bp-option value="1">Option 1</bp-option>
        <span slot="empty">No matches found. Try a different search.</span>
      </bp-combobox>
      <bp-field-message>Type something that doesn't match</bp-field-message>
    </bp-field>
  `;
}

/** @summary Shows loading state for async options. */
export function loading() {
  return /* html */ `
    <bp-field>
      <label>Async loading</label>
      <bp-combobox loading>
        <span slot="loading">Searching...</span>
      </bp-combobox>
      <bp-field-message>Options are loading</bp-field-message>
    </bp-field>
  `;
}

/** @summary Demonstrates async option loading pattern. */
export function async() {
  return /* html */ `
    <bp-field>
      <label>Async Search</label>
      <bp-combobox id="async-combobox" filter="none" placeholder="Search users...">
        <span slot="loading">Searching users...</span>
        <span slot="empty">No users found</span>
      </bp-combobox>
      <bp-field-message>Type to search (simulated async)</bp-field-message>
    </bp-field>

    <script type="module">
      const combobox = document.getElementById('async-combobox');

      const users = [
        { id: '1', name: 'Alice Johnson' },
        { id: '2', name: 'Bob Smith' },
        { id: '3', name: 'Carol Williams' },
        { id: '4', name: 'David Brown' },
        { id: '5', name: 'Eve Davis' }
      ];

      combobox.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
          combobox.querySelectorAll('bp-option').forEach(o => o.remove());
          return;
        }

        combobox.loading = true;

        // Simulate network delay
        await new Promise(r => setTimeout(r, 500));

        const filtered = users.filter(u => u.name.toLowerCase().includes(query));

        combobox.querySelectorAll('bp-option').forEach(o => o.remove());
        filtered.forEach(user => {
          const option = document.createElement('bp-option');
          option.value = user.id;
          option.textContent = user.name;
          combobox.appendChild(option);
        });

        combobox.loading = false;
      });
    </script>
  `;
}
