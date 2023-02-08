export const metadata = {
  name: 'button-resize',
  elements: ['bp-button-resize']
};

export function example() {
  return /* html */`
    <bp-button-resize aria-label="resize item" value="250" min="20" max="480"></bp-button-resize>

    <script type="module">
      import '@blueprintui/components/include/button-resize.js';
      document.querySelector('bp-button-resize').addEventListener('input', (event) => console.log(event.target.valueAsNumber));
    </script>
  `;
}

export function disabled() {
  return /* html */`
    <bp-button-resize disabled aria-label="resize item" value="250" min="20" max="480"></bp-button-resize>

    <script type="module">
      import '@blueprintui/components/include/button-resize.js';
      document.querySelector('bp-button-resize').addEventListener('input', (event) => console.log(event.target.valueAsNumber));
    </script>
  `;
}

// https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
export function split() {
  return /* html */`
    <div style="display: grid; grid-template-columns: 1fr 2px 1fr; height: 100%; width: 100%;">
      <div style="background: hsla(0, 0%, 0%, 0.15)"><span>0</span></div>
      <bp-button-resize aria-label="resize item" step="1"></bp-button-resize>
      <div></div>
    </div>

    <script type="module">
      import '@blueprintui/components/include/button-resize.js';

      const resize = document.querySelector('bp-button-resize');
      resize.step = 10;
      resize.min = 20;
      resize.max = document.documentElement.clientWidth - 44;
      resize.value = document.documentElement.clientWidth / 2;
      resize.addEventListener('input', (event) => {
        resize.parentElement.style.gridTemplateColumns = event.target.valueAsNumber + 'px 2px 1fr';
        document.querySelector('span').innerHTML = event.target.valueAsNumber;
      });
    </script>
  `;
}