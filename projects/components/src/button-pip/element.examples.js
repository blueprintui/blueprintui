export const metadata = {
  name: 'button-pip',
  elements: ['bp-button-pip']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-pip.js';
    </script>

    <div bp-layout="inline gap:lg">
      <div>
        <video id="example-video" width="200" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
        <bp-button-pip target="example-video" aria-label="enter picture-in-picture"></bp-button-pip>
      </div>
      <div>
        <video id="example-video-2" width="200" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
        <bp-button-pip target="example-video-2" checked aria-label="exit picture-in-picture"></bp-button-pip>
      </div>
    </div>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-pip.js';
    </script>

    <div bp-layout="inline gap:lg">
      <div>
        <video id="disabled-video" width="200" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
        <bp-button-pip target="disabled-video" disabled aria-label="picture-in-picture unavailable"></bp-button-pip>
      </div>
      <div>
        <video id="disabled-video-2" width="200" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
        <bp-button-pip target="disabled-video-2" aria-label="enter picture-in-picture"></bp-button-pip>
      </div>
    </div>
  `;
}

export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-pip.js';
    </script>

    <div bp-layout="inline gap:lg">
      <div>
        <video id="readonly-video" width="200" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
        <bp-button-pip target="readonly-video" readonly aria-label="enter picture-in-picture"></bp-button-pip>
      </div>
      <div>
        <video id="readonly-video-2" width="200" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
        <bp-button-pip target="readonly-video-2" aria-label="enter picture-in-picture"></bp-button-pip>
      </div>
    </div>
  `;
}

export function form() {
  return /* html */`
    <form id="pip-button-form" bp-layout="block gap:md">
      <video id="form-video" width="300" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
      <bp-field>
        <label>Picture-in-Picture Mode</label>
        <bp-button-pip name="pip-enabled" target="form-video" aria-label="enter picture-in-picture"></bp-button-pip>
      </bp-field>
      <span bp-layout="block:center">PiP Enabled: <strong>false</strong></span>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-pip.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/field.js';

      const button = document.querySelector('#pip-button-form bp-button-pip');
      const form = document.querySelector('#pip-button-form');
      const status = document.querySelector('#pip-button-form span strong');

      button.addEventListener('change', (e) => {
        status.textContent = e.target.checked;
        e.target.setAttribute('aria-label',
          e.target.checked ? 'exit picture-in-picture' : 'enter picture-in-picture'
        );
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('Form submitted! Check console for data.');
      });
    </script>
  `;
}

export function withTargetVideo() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-pip.js';
    </script>

    <div class="video-container">
      <video id="my-video" width="400" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
      <div bp-layout="inline gap:md" style="margin-top: 1rem;">
        <bp-button-pip
          target="my-video"
          aria-label="enter picture-in-picture">
        </bp-button-pip>
      </div>
    </div>
  `;
}

export function closestParentVideo() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-pip.js';
    </script>

    <div class="video-container">
      <video width="400" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
      <div bp-layout="inline gap:md" style="margin-top: 1rem;">
        <bp-button-pip aria-label="enter picture-in-picture"></bp-button-pip>
      </div>
    </div>
  `;
}

export function customValue() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-pip.js';
    </script>

    <form id="custom-value-form">
      <video id="custom-video" width="400" src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
      <bp-button-pip
        name="viewing-mode"
        value="picture-in-picture"
        target="custom-video"
        aria-label="enter picture-in-picture">
      </bp-button-pip>
    </form>

    <script>
      const customForm = document.querySelector('#custom-value-form');
      customForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(customForm);
        // When checked: { "viewing-mode": "picture-in-picture" }
        console.log('Custom value form:', Object.fromEntries(formData));
      });
    </script>
  `;
}
