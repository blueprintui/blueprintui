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
