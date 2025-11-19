export const metadata = {
  name: 'button-captions',
  elements: ['bp-button-captions']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-captions.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-captions aria-label="enable captions"></bp-button-captions>
      <bp-button-captions checked aria-label="disable captions"></bp-button-captions>
    </div>
  `;
}

export function checked() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-captions.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-captions aria-label="enable captions"></bp-button-captions>
      <bp-button-captions checked aria-label="disable captions"></bp-button-captions>
    </div>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-captions.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-captions disabled aria-label="captions unavailable"></bp-button-captions>
      <bp-button-captions checked disabled aria-label="captions unavailable"></bp-button-captions>
    </div>
  `;
}

export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-captions.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-captions readonly aria-label="enable captions"></bp-button-captions>
      <bp-button-captions checked readonly aria-label="disable captions"></bp-button-captions>
    </div>
  `;
}

export function form() {
  return /* html */`
    <form id="captions-form" bp-layout="block gap:md">
      <bp-field>
        <label>Captions</label>
        <bp-button-captions name="captions-enabled" aria-label="enable captions"></bp-button-captions>
      </bp-field>
      <span bp-layout="block:center">false</span>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-captions.js';
      const button = document.querySelector('#captions-form bp-button-captions');
      const form = document.querySelector('#captions-form');
      button.addEventListener('change', (e) => document.querySelector('#captions-form span').innerHTML = e.target.checked);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}

export function videoPlayer() {
  return /* html */`
    <div bp-layout="block gap:md" style="max-width: 600px;">
      <div style="background: var(--bp-layer-background-200); aspect-ratio: 16/9; border-radius: var(--bp-border-radius-200); display: flex; align-items: center; justify-content: center;">
        <bp-text>Video Player</bp-text>
      </div>
      <div bp-layout="inline gap:md">
        <bp-button-captions id="video-captions" aria-label="enable captions"></bp-button-captions>
        <bp-text id="captions-status">Captions: Off</bp-text>
      </div>
    </div>
    <script type="module">
      import '@blueprintui/components/include/button-captions.js';
      const button = document.querySelector('#video-captions');
      const status = document.querySelector('#captions-status');
      button.addEventListener('change', (e) => {
        status.textContent = e.target.checked ? 'Captions: On' : 'Captions: Off';
      });
    </script>
  `;
}

export function customValue() {
  return /* html */`
    <form id="custom-value-form" bp-layout="block gap:md">
      <bp-button-captions
        name="subtitles"
        value="enabled"
        aria-label="enable captions">
      </bp-button-captions>
      <span bp-layout="block:center">Form data: {}</span>
      <bp-button type="submit" action="secondary">Check Form Data</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-captions.js';
      const form = document.querySelector('#custom-value-form');
      const button = form.querySelector('bp-button-captions');
      const output = form.querySelector('span');

      button.addEventListener('change', (e) => {
        const formData = new FormData(form);
        output.textContent = 'Form data: ' + JSON.stringify(Object.fromEntries(formData));
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}
