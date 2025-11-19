export const metadata = {
  name: 'speech',
  elements: ['bp-speech']
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/speech.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-speech name="message"></bp-speech>
    </div>
  `;
}

export function form() {
  return /* html */ `
    <form id="speech-form" bp-layout="block gap:md">
      <bp-field>
        <label>Voice message</label>
        <bp-speech name="message"></bp-speech>
      </bp-field>
      <bp-field>
        <label>Transcribed text</label>
        <bp-textarea id="transcript-output" readonly rows="3"></bp-textarea>
      </bp-field>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/speech.js';
      import '@blueprintui/components/include/field.js';
      import '@blueprintui/components/include/textarea.js';
      import '@blueprintui/components/include/button.js';

      const speech = document.querySelector('#speech-form bp-speech');
      const output = document.querySelector('#transcript-output');
      const form = document.querySelector('#speech-form');

      speech.addEventListener('bp-result', (e) => {
        output.value = e.detail.transcript;
        if (e.detail.isFinal) {
          console.log('Final transcript:', e.detail.transcript, 'Confidence:', e.detail.confidence);
        }
      });

      speech.addEventListener('bp-error', (e) => {
        console.error('Speech error:', e.detail.message);
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        console.log('Form submitted:', formData);
      });
    </script>
  `;
}

export function languages() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/speech.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-field>
        <label>English (US)</label>
        <bp-speech language="en-US"></bp-speech>
      </bp-field>
      <bp-field>
        <label>Spanish (ES)</label>
        <bp-speech language="es-ES"></bp-speech>
      </bp-field>
      <bp-field>
        <label>French (FR)</label>
        <bp-speech language="fr-FR"></bp-speech>
      </bp-field>
    </div>
  `;
}

export function continuous() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/speech.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-field>
        <label>Continuous listening (keeps recording after pauses)</label>
        <bp-speech continuous></bp-speech>
      </bp-field>
    </div>
  `;
}

export function recording() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/speech.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-speech recording></bp-speech>
    </div>
  `;
}

export function disabled() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/speech.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-speech disabled></bp-speech>
    </div>
  `;
}

export function readonly() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/speech.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-speech readonly></bp-speech>
    </div>
  `;
}

export function unsupported() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/speech.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-speech style="--icon-color: var(--bp-status-warning-background-600)"></bp-speech>
      <span>When Web Speech API is not supported, a muted microphone icon is shown</span>
    </div>
  `;
}

export function programmaticControl() {
  return /* html */ `
    <div bp-layout="block gap:md">
      <bp-speech id="programmatic-speech"></bp-speech>
      <div bp-layout="inline gap:sm">
        <bp-button id="start-btn" action="secondary" size="sm">Start</bp-button>
        <bp-button id="stop-btn" action="secondary" size="sm">Stop</bp-button>
        <bp-button id="abort-btn" action="secondary" size="sm">Abort</bp-button>
      </div>
      <bp-field>
        <label>Status</label>
        <bp-textarea id="status-output" readonly rows="2"></bp-textarea>
      </bp-field>
    </div>
    <script type="module">
      import '@blueprintui/components/include/speech.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/field.js';
      import '@blueprintui/components/include/textarea.js';

      const speech = document.querySelector('#programmatic-speech');
      const startBtn = document.querySelector('#start-btn');
      const stopBtn = document.querySelector('#stop-btn');
      const abortBtn = document.querySelector('#abort-btn');
      const status = document.querySelector('#status-output');

      startBtn.addEventListener('click', () => {
        speech.start();
        status.value = 'Recording started...';
      });

      stopBtn.addEventListener('click', () => {
        speech.stop();
        status.value = 'Recording stopped';
      });

      abortBtn.addEventListener('click', () => {
        speech.abort();
        status.value = 'Recording aborted';
      });

      speech.addEventListener('bp-result', (e) => {
        status.value = 'Transcript: ' + e.detail.transcript + ' (Final: ' + e.detail.isFinal + ')';
      });
    </script>
  `;
}

export function events() {
  return /* html */ `
    <div bp-layout="block gap:md">
      <bp-speech id="events-speech"></bp-speech>
      <bp-field>
        <label>Event Log</label>
        <bp-textarea id="event-log" readonly rows="6"></bp-textarea>
      </bp-field>
    </div>
    <script type="module">
      import '@blueprintui/components/include/speech.js';
      import '@blueprintui/components/include/field.js';
      import '@blueprintui/components/include/textarea.js';

      const speech = document.querySelector('#events-speech');
      const log = document.querySelector('#event-log');

      function addLog(message) {
        log.value = message + '\\n' + log.value;
      }

      speech.addEventListener('bp-start', () => addLog('Event: bp-start'));
      speech.addEventListener('bp-end', () => addLog('Event: bp-end'));
      speech.addEventListener('bp-result', (e) => addLog(\`Event: bp-result - \${e.detail.transcript} (confidence: \${e.detail.confidence.toFixed(2)})\`));
      speech.addEventListener('bp-error', (e) => addLog(\`Event: bp-error - \${e.detail.message}\`));
      speech.addEventListener('bp-no-speech', () => addLog('Event: bp-no-speech'));
      speech.addEventListener('input', (e) => addLog(\`Event: input - \${e.data}\`));
      speech.addEventListener('change', () => addLog('Event: change'));
    </script>
  `;
}
