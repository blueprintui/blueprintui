export const metadata = {
  name: 'internal',
  elements: []
};

export function example() {
  return /* html */`
<bp-dialog closable position="bottom-start" size="sm">
  <h2 bp-text="section" slot="header">modal dialog</h2>
  <div bp-layout="block gap:md">
    <bp-field>
      <label>input label</label>
      <bp-input placeholder="name" id="input"></bp-input>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
    </bp-field>
  </div>
</bp-dialog>

<section bp-layout="grid cols:12 gap:md" style="max-width: 1800px">
  <section bp-layout="grid cols:6 gap:md">
    <section bp-layout="inline gap:xs">
      <bp-button>default</bp-button>
      <bp-button status="accent">accent</bp-button>
      <bp-button status="success">success</bp-button>
      <bp-button status="warning">warning</bp-button>
      <bp-button status="danger">danger</bp-button>
      <bp-button disabled>disabled</bp-button>
    </section>
    <bp-card>
      <section bp-layout="inline gap:xs">
        <bp-button>default</bp-button>
        <bp-button status="accent">accent</bp-button>
        <bp-button status="success">success</bp-button>
        <bp-button status="warning">warning</bp-button>
        <bp-button status="danger">danger</bp-button>
        <bp-button disabled>disabled</bp-button>
      </section>
    </bp-card>
  </section>

  <section bp-layout="grid cols:6 gap:md">
    <section bp-layout="block gap:sm col:4">
      <bp-alert-group>
        <bp-alert closable>alert neutral</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="accent">
        <bp-alert closable>alert accent</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="success">
        <bp-alert closable>alert success</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="warning">
        <bp-alert closable>alert warning</bp-alert>
      </bp-alert-group>
      <bp-alert-group status="danger">
        <bp-alert closable>alert danger</bp-alert>
      </bp-alert-group>
    </section>

    <section bp-layout="block gap:sm col:8">
      <bp-alert>alert</bp-alert>
      <bp-alert status="accent">alert accent</bp-alert>
      <bp-alert status="success">alert success</bp-alert>
      <bp-alert status="warning">alert warning</bp-alert>
      <bp-alert status="danger">alert danger</bp-alert>
    </section>
  </section>

  <section bp-layout="grid cols:6 gap:md">
    <bp-menu>
      <bp-menu-item>menu item</bp-menu-item>
      <bp-menu-item selected>item selected</bp-menu-item>
      <bp-menu-item disabled>item disabled</bp-menu-item>
      <bp-menu-item>menu item</bp-menu-item>
    </bp-menu>
    <bp-card>
      <bp-menu>
        <bp-menu-item>menu item</bp-menu-item>
        <bp-menu-item selected>item selected</bp-menu-item>
        <bp-menu-item disabled>item disabled</bp-menu-item>
        <bp-menu-item>menu item</bp-menu-item>
      </bp-menu>
    </bp-card>
  </section>

  <section bp-layout="grid cols:6 gap:md">
    <bp-form-group layout="horizontal-inline">
      <bp-field>
        <label>input label</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>select label</label>
        <bp-select>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2" selected>Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-select>
      </bp-field>

      <bp-field>
        <label>password label</label>
        <bp-password value="123456"></bp-password>
      </bp-field>

      <bp-field>
        <label>search label</label>
        <bp-search placeholder="search"></bp-search>
      </bp-field>

      <bp-field>
        <label>time label</label>
        <bp-time value="11:00"></bp-time>
      </bp-field>

      <bp-field>
        <label>month label</label>
        <bp-month></bp-month>
      </bp-field>

      <bp-field>
        <label>range label</label>
        <bp-range></bp-range>
      </bp-field>

      <bp-fieldset>
        <label>checkbox group label</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>
      </bp-fieldset>

      <bp-fieldset>
        <label>radio group label</label>

        <label>radio 1</label>
        <bp-radio value="1" checked></bp-radio>

        <label>radio 2</label>
        <bp-radio value="2"></bp-radio>

        <label>radio 3</label>
        <bp-radio value="3"></bp-radio>
      </bp-fieldset>

      <bp-fieldset>
        <label>switch group label</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-field>
        <label>select label</label>
        <bp-select>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2" selected>Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-select>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>textarea label</label>
        <bp-textarea></bp-textarea>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-button>save</bp-button>
    </bp-form-group>

    <bp-card>
      <bp-form-group layout="horizontal-inline">
        <bp-field>
          <label>input label</label>
          <bp-input placeholder="name"></bp-input>
          <bp-field-message>message text</bp-field-message>
        </bp-field>

        <bp-field>
          <label>select label</label>
          <bp-select>
            <bp-option value="1">Option One</bp-option>
            <bp-option value="2" selected>Option Two</bp-option>
            <bp-option value="3">Option Three</bp-option>
          </bp-select>
        </bp-field>

        <bp-field>
          <label>password label</label>
          <bp-password value="123456"></bp-password>
        </bp-field>

        <bp-field>
          <label>search label</label>
          <bp-search placeholder="search"></bp-search>
        </bp-field>

        <bp-field>
          <label>time label</label>
          <bp-time value="11:00"></bp-time>
        </bp-field>

        <bp-field>
          <label>month label</label>
          <bp-month></bp-month>
        </bp-field>

        <bp-field>
          <label>range label</label>
          <bp-range></bp-range>
        </bp-field>

        <bp-fieldset>
          <label>checkbox group label</label>

          <label>checkbox 1</label>
          <bp-checkbox checked></bp-checkbox>

          <label>checkbox 2</label>
          <bp-checkbox></bp-checkbox>

          <label>checkbox 3</label>
          <bp-checkbox></bp-checkbox>
        </bp-fieldset>

        <bp-fieldset>
          <label>radio group label</label>

          <label>radio 1</label>
          <bp-radio value="1" checked></bp-radio>

          <label>radio 2</label>
          <bp-radio value="2"></bp-radio>

          <label>radio 3</label>
          <bp-radio value="3"></bp-radio>
        </bp-fieldset>

        <bp-fieldset>
          <label>switch group label</label>

          <label>switch 1</label>
          <bp-switch checked></bp-switch>

          <label>switch 2</label>
          <bp-switch></bp-switch>

          <label>switch 3</label>
          <bp-switch></bp-switch>

          <bp-field-message>message text</bp-field-message>
        </bp-fieldset>

        <bp-field>
          <label>select label</label>
          <bp-select>
            <bp-option value="1">Option One</bp-option>
            <bp-option value="2" selected>Option Two</bp-option>
            <bp-option value="3">Option Three</bp-option>
          </bp-select>
          <bp-field-message>message text</bp-field-message>
        </bp-field>

        <bp-field>
          <label>textarea label</label>
          <bp-textarea></bp-textarea>
          <bp-field-message>message text</bp-field-message>
        </bp-field>

        <bp-button>save</bp-button>
      </bp-form-group>
    </bp-card>
  </section>
</section>
    `;
}

export function interaction() {
  return /* html */`
    <style>
      button {
        background: color-mix(in oklab, var(--background), black var(--bp-interaction-offset, 0%));
        color: var(--color, var(--bp-status-neutral-color-100));
        border: 0;
        padding: 12px;
        cursor: pointer;
      }

      button:hover,
      button[hover] {
        --bp-interaction-offset: var(--bp-interaction-hover-offset);
      }

      button:active,
      button[active] {
        --bp-interaction-offset: var(--bp-interaction-active-offset);
      }

      button:disabled,
      [disabled] {
        --bp-interaction-offset: var(--bp-interaction-disabled-offset);
      }

      button[selected] {
        --bp-interaction-offset: var(--bp-interaction-selected-offset);
      }
    </style>

    <section bp-layout="block gap:md">
      <div bp-layout="inline gap:md" style="--background: var(--bp-layer-background-200); --color: var(--bp-text-color-500);">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-neutral-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-accent-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-success-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-warning-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-danger-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
    </section>
  `;
}

export function layer() {
  return /* html */`
    <style>
      bp-field {
        margin-bottom: 12px;
      }
    </style>

    <section bp-layout="block gap:lg align:stretch">
      <bp-card>
        <bp-field>
          <label>label</label>
          <bp-input></bp-input>
        </bp-field>
        <bp-card>
          <bp-field>
            <label>label</label>
            <bp-input></bp-input>
          </bp-field>
          <bp-card>
            <bp-field>
              <label>label</label>
              <bp-input></bp-input>
            </bp-field>
          </bp-card>
        </bp-card>
      </bp-card>
    </section>
    <script type="module">
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/components/include/card.js';
    </script>
  `;
}
