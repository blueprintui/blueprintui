export const metadata = {
  name: 'drawer',
  elements: ['bp-drawer']
};

export function example() {
  return /* html */`
<bp-drawer closable hidden>
  <p bp-text="content">This is a drawer</p>
</bp-drawer>

<div id="drawer-options" bp-layout="inline gap:xs" style="height: 2000px">
  <bp-button value="left" action="outline">left</bp-button>
  <bp-button value="right" action="outline">right</bp-button>
</div>

<script type="module">
  import '@blueprintui/components/include/drawer.js';
  import '@blueprintui/components/include/button.js';

  const drawer = document.querySelector('bp-drawer');
  const options = document.querySelector('#drawer-options');

  options.addEventListener('click', e => {
    if (e.target.tagName === 'BP-BUTTON') {
      drawer.position = e.target.value;
      drawer.hidden = false;
    }
  });

  drawer.addEventListener('close', () => drawer.hidden = true);
</script>
  `;
}
