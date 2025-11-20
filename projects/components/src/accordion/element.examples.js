export const metadata = {
  name: 'accordion',
  elements: ['bp-accordion', 'bp-accordion-panel', 'bp-accordion-header', 'bp-accordion-content']
};

/**
 * @summary Displays collapsible content sections that expand and collapse on interaction.
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/accordion.js';
    </script>

    <bp-accordion>
      <bp-accordion-panel expanded>
        <bp-accordion-header>Expanded accordion panel</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Expanded accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header disabled>Disabled accordion header</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Disabled accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>Collapsed accordion</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Collapsed accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
    </bp-accordion>
    `;
}

/**
 * @summary Demonstrates accordion with command-based controls for open/close/toggle actions.
 */
export function commands() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/accordion.js';
    </script>

    <bp-button command="--toggle" commandfor="panel-1">Toggle</bp-button>
    <bp-button command="--close" commandfor="panel-1">Close</bp-button>
    <bp-button command="--open" commandfor="panel-1">Open</bp-button>

    <bp-accordion>
      <bp-accordion-panel id="panel-1" expanded>
        <bp-accordion-header>Expanded accordion panel</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Expanded accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
    </bp-accordion>
    `;
}

/**
 * @summary Shows interactive accordion where users can expand and collapse panels independently.
 */
export function interactive() {
  return /* html */`
    <bp-accordion id="interactive-accordion">
      <bp-accordion-panel expanded>
        <bp-accordion-header>header one</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">content one</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>header two</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">content two</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>header three</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">content three</p>
        </bp-accordion-content>
      </bp-accordion-panel>
    </bp-accordion>
    <script type="module">
      import '@blueprintui/components/include/accordion.js';

      const accordion = document.querySelector('#interactive-accordion');
      accordion.addEventListener('click', e => {
        if (e.target.tagName === 'BP-ACCORDION-HEADER') {
          e.target.parentElement.expanded = !e.target.parentElement.expanded;
        }
      });
    </script>
    `;
}

/**
 * @summary Demonstrates accordion with exclusive panel expansion where only one panel can be open at a time.
 */
export function interactiveExclusive() {
  return /* html */`
    <bp-accordion id="interactive-exclusive-accordion">
      <bp-accordion-panel>
        <bp-accordion-header>header one</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">content one</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>header two</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">content two</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>header three</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">content three</p>
        </bp-accordion-content>
      </bp-accordion-panel>
    </bp-accordion>
    <script type="module">
      import '@blueprintui/components/include/accordion.js';

      const accordion = document.querySelector('#interactive-exclusive-accordion');
      const panels = Array.from(accordion.querySelectorAll('bp-accordion-panel'));
      accordion.addEventListener('click', e => {
        if (e.target.tagName === 'BP-ACCORDION-HEADER') {
          panels.forEach(panel => panel.expanded = false);
          e.target.parentElement.expanded = !e.target.parentElement.expanded;
        }
      });
    </script>
    `;
}

/**
 * @summary Shows accordion panels containing rich content including forms.
 */
export function content() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/accordion.js';
    </script>

    <bp-accordion>
      <bp-accordion-panel expanded>
        <bp-accordion-header>Expanded accordion panel</bp-accordion-header>
        <bp-accordion-content>
          <div bp-layout="block gap:md">
            <p bp-text="content">Expanded accordion content</p>
            <bp-field style="width: 200px">
              <label>label</label>
              <bp-input></bp-input>
            </bp-field>
          </div>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header disabled>Disabled accordion header</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Disabled accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>Collapsed accordion</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Collapsed accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
    </bp-accordion>
    `;
}

/**
 * @summary Demonstrates accordion with flat layer styling compared to default elevated style.
 */
export function layerFlat() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/accordion.js';
    </script>

    <bp-accordion layer="flat">
      <bp-accordion-panel expanded>
        <bp-accordion-header>Expanded accordion panel</bp-accordion-header>
        <bp-accordion-content>
          <div bp-layout="block gap:md">
            <p bp-text="content">Expanded accordion content</p>
            <bp-field style="width: 200px">
              <label>label</label>
              <bp-input></bp-input>
            </bp-field>
          </div>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header disabled>Disabled accordion header</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Disabled accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>Collapsed accordion</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Collapsed accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
    </bp-accordion>

    <br>

    <bp-accordion>
      <bp-accordion-panel expanded>
        <bp-accordion-header>Expanded accordion panel</bp-accordion-header>
        <bp-accordion-content>
          <div bp-layout="block gap:md">
            <p bp-text="content">Expanded accordion content</p>
            <bp-field style="width: 200px">
              <label>label</label>
              <bp-input></bp-input>
            </bp-field>
          </div>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header disabled>Disabled accordion header</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Disabled accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
      <bp-accordion-panel>
        <bp-accordion-header>Collapsed accordion</bp-accordion-header>
        <bp-accordion-content>
          <p bp-text="content">Collapsed accordion content</p>
        </bp-accordion-content>
      </bp-accordion-panel>
    </bp-accordion>
    `;
}