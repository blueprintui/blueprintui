export const metadata = {
  name: 'internal',
  elements: []
};

export function dashboard() {
  return /* html */`
<script type="module">
  import '@blueprintui/icons/shapes/home.js';
  import '@blueprintui/icons/shapes/email.js';
  import '@blueprintui/icons/shapes/settings.js';
  import '@blueprintui/icons/shapes/line-chart.js';
  import '@blueprintui/icons/shapes/arrow.js';
</script>
<style>
  body {
    padding: 0;
  }
</style>
<bp-shell>
  <bp-nav expanded>
    <bp-nav-item><bp-icon shape="home"></bp-icon> home</bp-nav-item>
    <bp-nav-item selected><bp-icon shape="line-chart"></bp-icon> dashboard</bp-nav-item>
    <bp-nav-item><bp-icon shape="email"></bp-icon> subscribers</bp-nav-item>
    <bp-nav-item><bp-icon shape="settings"></bp-icon> settings</bp-nav-item>
  </bp-nav>
  <bp-header>
    <bp-header-item>dashboard</bp-header-item>
    <bp-search aria-label="search" placeholder="search posts" bp-layout="inline:end" style="max-width: 300px"></bp-search>
    <bp-header-item>account <bp-badge status="warning">2</bp-badge></bp-header-item>
    <bp-header-item bp-shell="drawer-button" aria-label="menu" bp-layout="inline:end"><bp-icon size="sm"></bp-icon></bp-header-item>
  </bp-header>
  <div bp-layout="block gap:md" style="max-width: 1600px">
    <section bp-layout="block gap:md">
      <bp-alert-group status="accent">
        <bp-alert>Subscription updated</bp-alert>
      </bp-alert-group>
    </section>
    <bp-tabs style="width: 100%; --padding: 0">
      <bp-tab-list aria-label="example tablist">
        <bp-tab selected>Dashboard</bp-tab>
        <bp-tab>Reports</bp-tab>
        <bp-tab>Options</bp-tab>
      </bp-tab-list>
      <bp-tab-panel style="padding: 36px 0">
        <div bp-layout="block gap:lg">
          <section bp-layout="grid cols:12 cols:6@sm cols:4@md gap:md">
            <bp-card>
              <h2 bp-text="subsection">Subscribers</h2>
              <div bp-layout="inline gap:sm block:center" style="align-items: center">
                <bp-progress-circle value="75" size="lg" status="success"></bp-progress-circle>
                <div bp-layout="block gap:xs">
                  <p bp-text="heading">150k</p>
                  <p bp-text="">last 30 days <bp-icon shape="arrow" status="success"></bp-icon></p>
                </div>
              </div>
            </bp-card>
            <bp-card>
              <h2 bp-text="subsection">Views</h2>
              <div bp-layout="inline gap:sm block:center" style="align-items: center">
                <bp-progress-circle value="55" size="lg" status="warning"></bp-progress-circle>
                <div bp-layout="block gap:xs">
                  <p bp-text="heading">50.4k</p>
                  <p bp-text="">last 30 days <bp-icon shape="arrow" status="warning"></bp-icon></p>
                </div>
              </div>
            </bp-card>
            <bp-card>
              <h2 bp-text="subsection">Posts</h2>
              <div bp-layout="inline gap:sm block:center" style="align-items: center">
                <bp-progress-circle value="40" size="lg" status="danger"></bp-progress-circle>
                <div bp-layout="block gap:xs">
                  <p bp-text="heading">1.4k</p>
                  <p bp-text="">last 30 days <bp-icon shape="arrow" status="danger" direction="down"></bp-icon></p>
                </div>
              </div>
            </bp-card>
          </section>

          <bp-divider></bp-divider>

          <section bp-layout="grid cols:12 cols:6@sm cols:3@lg gap:md">
            <bp-card>
              <bp-card-header>
                <img src="http://via.placeholder.com/280x180" />
              </bp-card-header>
              <p bp-text="content">Content</p>
              <bp-card-footer>
                <div bp-layout="inline gap:sm inline:end">
                  <bp-button status="accent" action="outline">Post</bp-button>
                </div>
              </bp-card-footer>
            </bp-card>
            <bp-card>
              <bp-card-header>
                <img src="http://via.placeholder.com/280x180" />
              </bp-card-header>
              <p bp-text="content">Content</p>
              <bp-card-footer>
                <div bp-layout="inline gap:sm inline:end">
                  <bp-button status="accent" action="outline">Post</bp-button>
                </div>
              </bp-card-footer>
            </bp-card>
            <bp-card>
              <bp-card-header>
                <img src="http://via.placeholder.com/280x180" />
              </bp-card-header>
              <p bp-text="content">Content</p>
              <bp-card-footer>
                <div bp-layout="inline gap:sm inline:end">
                  <bp-button status="accent" action="outline">Post</bp-button>
                </div>
              </bp-card-footer>
            </bp-card>
            <bp-card>
              <bp-card-header>
                <img src="http://via.placeholder.com/280x180" />
              </bp-card-header>
              <p bp-text="content">Content</p>
              <bp-card-footer>
                <div bp-layout="inline gap:sm inline:end">
                  <bp-button status="accent" action="outline">Post</bp-button>
                </div>
              </bp-card-footer>
            </bp-card>
          </section>
          <bp-pagination aria-label="pagination" bp-layout="inline:end">
            <bp-button-icon slot="first"></bp-button-icon>
            <bp-button-icon slot="prev"></bp-button-icon>
            <span aria-label="current page">1 / 3</span>
            <bp-button-icon slot="next"></bp-button-icon>
            <bp-button-icon slot="last"></bp-button-icon>
          </bp-pagination>
        </div>
      </bp-tab-panel>
    </bp-tabs>
  </div>
</bp-shell>
`;
}

export function example() {
  return /* html */`
<style>
  :root {
    --bp-layer-invert: ;
    --bp-layer-container-background-100: var(--bp-color-gray-100);
    --bp-layer-container-background-200: var(--bp-color-white);
  }
</style>
<bp-dialog closable position="bottom-start" size="sm">
  <bp-dialog-header>
    <h2 bp-text="section">modal dialog</h2>
  </bp-dialog-header>
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
        <bp-time min="09:00" max="18:00" value="11:00"></bp-time>
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
          <bp-time min="09:00" max="18:00" value="11:00"></bp-time>
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