export const metadata = {
  name: 'tabs',
  elements: ['bp-tabs', 'bp-tab', 'bp-tab-panel']
};


/** @summary Organizes content into multiple panels accessible through tab navigation. */
export function example() {
  return /* html */`
    <bp-tabs>
      <bp-tab-list aria-label="example tablist">
        <bp-tab selected>one</bp-tab>
        <bp-tab>two</bp-tab>
        <bp-tab>three</bp-tab>
      </bp-tab-list>
      <bp-tab-panel>panel one</bp-tab-panel>
      <bp-tab-panel>panel two</bp-tab-panel>
      <bp-tab-panel>panel three</bp-tab-panel>
    </bp-tabs>

    <script type="module">
      import '@blueprintui/components/include/tabs.js';

      const tabgroup = document.querySelector('bp-tabs');
      const tabs = tabgroup.querySelectorAll('bp-tab');

      tabgroup.addEventListener('click', e => {
        if (e.target.tagName === 'BP-TAB') {
          tabs.forEach(t => t.selected = false);
          e.target.selected = true;
        }
      });
    </script>
  `;
}


/** @summary Demonstrates tabs in vertical orientation. */
export function vertical() {
  return /* html */`
    <bp-tabs layout="vertical">
      <bp-tab-list aria-label="example vertical tablist">
        <bp-tab selected>item one</bp-tab>
        <bp-tab>item two</bp-tab>
        <bp-tab>item three</bp-tab>
      </bp-tab-list>
      <bp-tab-panel>panel one</bp-tab-panel>
      <bp-tab-panel>panel two</bp-tab-panel>
      <bp-tab-panel>panel three</bp-tab-panel>
    </bp-tabs>

    <script type="module" interactive>
      import '@blueprintui/components/include/tabs.js';

      const tabgroup = document.querySelector('bp-tabs');
      const tabs = tabgroup.querySelectorAll('bp-tab');

      tabgroup.addEventListener('click', e => {
        if (e.target.tagName === 'BP-TAB') {
          tabs.forEach(t => t.selected = false);
          e.target.selected = true;
        }
      });
    </script>
  `;
}