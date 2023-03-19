export const metadata = {
  name: 'accordion',
  elements: ['bp-accordion', 'bp-accordion-panel', 'bp-accordion-header', 'bp-accordion-content']
};

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