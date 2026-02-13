export const metadata = {
  name: 'toggle-group',
  elements: ['bp-toggle-group', 'bp-toggle-group-option']
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/toggle-group.js';
    </script>

    <bp-field style="max-width: 400px">
      <label>Time frame</label>
      <bp-toggle-group name="timeframe" value="day">
        <bp-toggle-group-option value="day" checked>Day</bp-toggle-group-option>
        <bp-toggle-group-option value="week">Week</bp-toggle-group-option>
        <bp-toggle-group-option value="month">Month</bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function expand() {
  return /* html */ `
    <bp-field style="max-width: 400px">
      <label>Filter</label>
      <bp-toggle-group name="filter" value="author" expand>
        <bp-toggle-group-option value="author" checked>Author</bp-toggle-group-option>
        <bp-toggle-group-option value="label">Label</bp-toggle-group-option>
        <bp-toggle-group-option value="assignee">Assignee</bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function withIcons() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/toggle-group.js';
      import '@blueprintui/icons/shapes/list.js';
      import '@blueprintui/icons/shapes/grid-view.js';
      import '@blueprintui/icons/shapes/map.js';
    </script>

    <bp-field style="max-width: 400px">
      <label>View mode</label>
      <bp-toggle-group name="view" value="list">
        <bp-toggle-group-option value="list" checked>
          <bp-icon shape="list" slot="label"></bp-icon>
          List
        </bp-toggle-group-option>
        <bp-toggle-group-option value="grid">
          <bp-icon shape="grid-view" slot="label"></bp-icon>
          Grid
        </bp-toggle-group-option>
        <bp-toggle-group-option value="map">
          <bp-icon shape="map" slot="label"></bp-icon>
          Map
        </bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function iconOnly() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/toggle-group.js';
      import '@blueprintui/icons/shapes/list.js';
      import '@blueprintui/icons/shapes/grid-view.js';
      import '@blueprintui/icons/shapes/map.js';
    </script>

    <bp-field style="max-width: 400px">
      <label>View mode</label>
      <bp-toggle-group name="view-icon" value="list" aria-label="View mode">
        <bp-toggle-group-option value="list" checked aria-label="List view">
          <bp-icon shape="list"></bp-icon>
        </bp-toggle-group-option>
        <bp-toggle-group-option value="grid" aria-label="Grid view">
          <bp-icon shape="grid-view"></bp-icon>
        </bp-toggle-group-option>
        <bp-toggle-group-option value="map" aria-label="Map view">
          <bp-icon shape="map"></bp-icon>
        </bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function disabled() {
  return /* html */ `
    <bp-field style="max-width: 400px">
      <label>Time frame (disabled)</label>
      <bp-toggle-group name="timeframe-disabled" value="day" disabled>
        <bp-toggle-group-option value="day" checked>Day</bp-toggle-group-option>
        <bp-toggle-group-option value="week">Week</bp-toggle-group-option>
        <bp-toggle-group-option value="month">Month</bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function readonly() {
  return /* html */ `
    <bp-field style="max-width: 400px">
      <label>Time frame (readonly)</label>
      <bp-toggle-group name="timeframe-readonly" value="week" readonly>
        <bp-toggle-group-option value="day">Day</bp-toggle-group-option>
        <bp-toggle-group-option value="week" checked>Week</bp-toggle-group-option>
        <bp-toggle-group-option value="month">Month</bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function required() {
  return /* html */ `
    <form>
      <bp-field style="max-width: 400px">
        <label>Select period (required)</label>
        <bp-toggle-group name="period" value="monthly" required>
          <bp-toggle-group-option value="daily">Daily</bp-toggle-group-option>
          <bp-toggle-group-option value="monthly" checked>Monthly</bp-toggle-group-option>
          <bp-toggle-group-option value="yearly">Yearly</bp-toggle-group-option>
        </bp-toggle-group>
      </bp-field>
      <bp-button type="submit">Submit</bp-button>
    </form>
  `;
}

export function twoOptions() {
  return /* html */ `
    <bp-field style="max-width: 400px">
      <label>Type</label>
      <bp-toggle-group name="type" value="public">
        <bp-toggle-group-option value="public" checked>Public</bp-toggle-group-option>
        <bp-toggle-group-option value="private">Private</bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function manyOptions() {
  return /* html */ `
    <bp-field style="max-width: 600px">
      <label>Select day</label>
      <bp-toggle-group name="day" value="mon">
        <bp-toggle-group-option value="mon" checked>Mon</bp-toggle-group-option>
        <bp-toggle-group-option value="tue">Tue</bp-toggle-group-option>
        <bp-toggle-group-option value="wed">Wed</bp-toggle-group-option>
        <bp-toggle-group-option value="thu">Thu</bp-toggle-group-option>
        <bp-toggle-group-option value="fri">Fri</bp-toggle-group-option>
        <bp-toggle-group-option value="sat">Sat</bp-toggle-group-option>
        <bp-toggle-group-option value="sun">Sun</bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;
}

export function formIntegration() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/toggle-group.js';

      const form = document.getElementById('toggle-form');
      const output = document.getElementById('toggle-output');

      form.addEventListener('change', (e) => {
        const formData = new FormData(form);
        output.textContent = JSON.stringify(Object.fromEntries(formData), null, 2);
      });
    </script>

    <form id="toggle-form">
      <bp-field style="max-width: 400px">
        <label>Report frequency</label>
        <bp-toggle-group name="frequency" value="weekly">
          <bp-toggle-group-option value="daily">Daily</bp-toggle-group-option>
          <bp-toggle-group-option value="weekly" checked>Weekly</bp-toggle-group-option>
          <bp-toggle-group-option value="monthly">Monthly</bp-toggle-group-option>
        </bp-toggle-group>
      </bp-field>

      <bp-field style="max-width: 400px">
        <label>Notification preference</label>
        <bp-toggle-group name="notification" value="email">
          <bp-toggle-group-option value="email" checked>Email</bp-toggle-group-option>
          <bp-toggle-group-option value="sms">SMS</bp-toggle-group-option>
          <bp-toggle-group-option value="push">Push</bp-toggle-group-option>
        </bp-toggle-group>
      </bp-field>

      <bp-button type="submit">Submit</bp-button>
    </form>

    <pre id="toggle-output" style="margin-top: 1rem; padding: 1rem; background: var(--bp-layer-100); border-radius: 4px;"></pre>
  `;
}
