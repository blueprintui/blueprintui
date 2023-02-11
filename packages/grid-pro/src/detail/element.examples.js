import { grid } from '../examples.data.js';

export const metadata = {
  name: 'pro detail',
  elements: ['bp-grid-detail', 'bp-grid']
};

export function detail() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid-pro/include/detail.js';
      import '@blueprintui/components/include/button-expand.js';
    </script>
    <bp-grid aria-label="detail view datagrid">
      <bp-grid-header>
        <bp-grid-column width="max-content"></bp-grid-column>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 7).map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-button-expand aria-label="view details" action="horizontal" ${i === 1 ? 'checked' : ''} id="row-expand-${i}"></bp-button-expand>
        </bp-grid-cell>
        ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 0 ? 'role="rowheader"' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer></bp-grid-footer>
      <bp-grid-detail closable trigger="row-expand-1">
        <h2 bp-text="section">Row 2 Content Detail</h2>
      </bp-grid-detail>
    </bp-grid>
  `;
}

export function noTrigger() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid-pro/include/detail.js';
      import '@blueprintui/components/include/button-expand.js';
    </script>
    <bp-grid aria-label="detail view datagrid">
      <bp-grid-header>
        <bp-grid-column width="max-content"></bp-grid-column>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 7).map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-button-expand aria-label="view details" action="horizontal" ${i === 1 ? 'checked' : ''}></bp-button-expand>
        </bp-grid-cell>
        ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 0 ? 'role="rowheader"' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer></bp-grid-footer>
      <bp-grid-detail closable>
        <h2 bp-text="section">Row 2 Content Detail</h2>
      </bp-grid-detail>
    </bp-grid>
  `;
}

export function rtl() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid-pro/include/detail.js';
      import '@blueprintui/components/include/button-expand.js';
    </script>
    <bp-grid aria-label="rtl detail view datagrid" dir="rtl">
      <bp-grid-header>
        <bp-grid-column width="max-content"></bp-grid-column>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 7).map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-button-expand aria-label="view details" action="horizontal" ${i === 1 ? 'checked' : ''} id="row-expand-${i}"></bp-button-expand>
        </bp-grid-cell>
        ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 0 ? 'role="rowheader"' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
      <bp-grid-footer></bp-grid-footer>
      <bp-grid-detail trigger="row-expand-1" position="inline-start">
        <h2 bp-text="section">Row 2 Content Detail</h2>
      </bp-grid-detail>
    </bp-grid>
  `;
}

export function interactive() {
  return /* html */`
    <bp-grid aria-label="interactive detail view datagrid" height="390">
      <bp-grid-header>
        <bp-grid-column width="max-content"></bp-grid-column>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${[...grid.rows, ...grid.rows].map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-button-expand value="${i}" aria-label="view details" action="horizontal"></bp-button-expand>
        </bp-grid-cell>
        ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 0 ? 'role="rowheader"' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer></bp-grid-footer>
      <bp-grid-detail closable hidden>
        <h2 bp-text="section">Row Content Detail</h2>
      </bp-grid-detail>
    </bp-grid>
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid-pro/include/detail.js';
      import '@blueprintui/components/include/button-expand.js';

      const grid = document.querySelector('bp-grid');
      const detail = document.querySelector('bp-grid-detail');

      detail.addEventListener('open', e => detail.hidden = false);

      detail.addEventListener('close', e => {
        detail.trigger.checked = false;
        detail.hidden = true;
      });

      grid.addEventListener('change', e => {
        if (e.target.tagName === 'BP-BUTTON-EXPAND') {
          grid.querySelectorAll('bp-button-expand').forEach(button => button.checked = false);
          detail.trigger = e.target;
          e.target.checked = !e.target.checked;
          detail.hidden = !e.target.checked;
          detail.querySelector('h2').textContent = \`Row \${e.target.value} Content Detail\`;
        }
      });
    </script>
  `;
}

export function mobile() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid-pro/include/detail.js';
      import '@blueprintui/components/include/button-expand.js';
    </script>
    <bp-grid aria-label="mobile detail view datagrid" style="width: 350px;">
      <bp-grid-header>
        <bp-grid-column width="max-content"></bp-grid-column>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 7).map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-button-expand aria-label="view details" action="horizontal" ${i === 1 ? 'checked' : ''} id="row-expand-${i}"></bp-button-expand>
        </bp-grid-cell>
        ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 0 ? 'role="rowheader"' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer></bp-grid-footer>
      <bp-grid-detail closable trigger="row-expand-1">
        <h2 bp-text="section">Row 2 Content Detail</h2>
      </bp-grid-detail>
    </bp-grid>
  `;
}