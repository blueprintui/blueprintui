export const metadata = {
  name: 'button-mute',
  elements: ['bp-button-mute']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-mute.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-mute aria-label="mute audio"></bp-button-mute>
    </div>
  `;
}

export function checked() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-mute.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-mute checked aria-label="unmute audio"></bp-button-mute>
    </div>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-mute.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-mute disabled aria-label="mute audio"></bp-button-mute>
      <bp-button-mute disabled checked aria-label="unmute audio"></bp-button-mute>
    </div>
  `;
}

export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-mute.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-mute readonly aria-label="mute audio"></bp-button-mute>
      <bp-button-mute readonly checked aria-label="unmute audio"></bp-button-mute>
    </div>
  `;
}

export function form() {
  return /* html */`
    <form id="mute-button-form" bp-layout="block gap:md">
      <bp-field>
        <label>Audio Controls</label>
        <bp-button-mute name="audio-muted" aria-label="mute audio"></bp-button-mute>
      </bp-field>
      <span bp-layout="block:center" id="mute-status">unmuted</span>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-mute.js';
      const button = document.querySelector('#mute-button-form bp-button-mute');
      const form = document.querySelector('#mute-button-form');
      const status = document.querySelector('#mute-status');

      button.addEventListener('change', (e) => {
        status.innerHTML = e.target.checked ? 'muted' : 'unmuted';
        e.target.setAttribute('aria-label', e.target.checked ? 'unmute audio' : 'mute audio');
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}

export function customValue() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-mute.js';
    </script>

    <form id="custom-value-form" bp-layout="block gap:md">
      <bp-button-mute name="volume" value="muted" aria-label="mute audio"></bp-button-mute>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      const form = document.querySelector('#custom-value-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form data:', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}
