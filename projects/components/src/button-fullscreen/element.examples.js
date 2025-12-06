export const metadata = {
  name: 'button-fullscreen',
  elements: ['bp-button-fullscreen']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-fullscreen.js';
      import '@blueprintui/icons/shapes/fullscreen.js';
      import '@blueprintui/icons/shapes/fullscreen-exit.js';
    </script>
    <bp-button-fullscreen aria-label="enter fullscreen"></bp-button-fullscreen>
  `;
}

export function all() {
  return /* html */`
  <div bp-layout="block gap:md">
  ${example()}${checked()}${disabled()}${readonly()}${target()}${form()}
  </div>
  `;
}

export function checked() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-fullscreen.js';
    </script>
    <section bp-layout="block gap:md">
      <label>Checked State</label>
      <div bp-layout="inline gap:md">
        <bp-button-fullscreen aria-label="enter fullscreen"></bp-button-fullscreen>
        <bp-button-fullscreen checked aria-label="exit fullscreen"></bp-button-fullscreen>
      </div>
    </section>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-fullscreen.js';
    </script>
    <section bp-layout="block gap:md">
      <label>Disabled State</label>
      <div bp-layout="inline gap:md">
        <bp-button-fullscreen disabled aria-label="fullscreen unavailable"></bp-button-fullscreen>
        <bp-button-fullscreen disabled checked aria-label="fullscreen unavailable"></bp-button-fullscreen>
      </div>
    </section>
  `;
}

export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-fullscreen.js';
    </script>
    <section bp-layout="block gap:md">
      <label>Readonly State</label>
      <div bp-layout="inline gap:md">
        <bp-button-fullscreen readonly aria-label="enter fullscreen"></bp-button-fullscreen>
        <bp-button-fullscreen readonly checked aria-label="exit fullscreen"></bp-button-fullscreen>
      </div>
    </section>
  `;
}

export function target() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-fullscreen.js';
    </script>
    <section bp-layout="block gap:md">
      <label>With Target Element</label>
      <div id="video-container" style="border: 1px solid var(--bp-border-200); padding: 16px; border-radius: 4px; position: relative;">
        <div style="background: var(--bp-layer-background-200); height: 100px; display: flex; align-items: center; justify-content: center;">
          Video Player Container
        </div>
        <bp-button-fullscreen
          target="video-container"
          aria-label="enter fullscreen"
          style="position: absolute; bottom: 16px; right: 16px;">
        </bp-button-fullscreen>
      </div>
    </section>
  `;
}

export function form() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-fullscreen.js';
      import '@blueprintui/components/include/field.js';
      import '@blueprintui/components/include/button.js';
    </script>
    <section bp-layout="block gap:md">
      <label>Form Integration</label>
      <form id="display-settings-form">
        <bp-field>
          <label>Fullscreen Mode</label>
          <bp-button-fullscreen
            name="fullscreen-mode"
            aria-label="enter fullscreen">
          </bp-button-fullscreen>
        </bp-field>
      </form>
    </section>
  `;
}

export function interactiveDemo() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-fullscreen.js';
    </script>

    <section bp-layout="block gap:md">
      <label>Interactive Demo</label>
      <div id="fullscreen-demo" style="border: 2px solid var(--bp-border-200); padding: 24px; border-radius: 8px; background: var(--bp-layer-background-100);">
        <div bp-layout="block gap:md">
          <h3>Fullscreen Demo Area</h3>
          <p>Click the button to toggle fullscreen mode. Press ESC to exit fullscreen.</p>
          <bp-button-fullscreen
            id="demo-fullscreen-btn"
            target="fullscreen-demo"
            aria-label="enter fullscreen">
          </bp-button-fullscreen>
        </div>
      </div>

      <script>
        const btn = document.querySelector('#demo-fullscreen-btn');
        const container = document.querySelector('#fullscreen-demo');

        btn.addEventListener('change', (e) => {
          console.log('Fullscreen state:', e.target.checked);
        });

        // Sync with browser fullscreen changes
        document.addEventListener('fullscreenchange', () => {
          const isFullscreen = !!document.fullscreenElement;
          console.log('Browser fullscreen:', isFullscreen);
        });
      </script>
    </section>
  `;
}
