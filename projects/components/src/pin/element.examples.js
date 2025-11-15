export const metadata = {
  name: 'pin',
  elements: ['bp-pin']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/pin.js';
    </script>

    <bp-field>
      <label>Verification Code</label>
      <bp-pin length="6"></bp-pin>
      <bp-field-message>Enter the 6-digit code sent to your phone</bp-field-message>
    </bp-field>
  `;
}

export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>4-digit PIN</label>
        <bp-pin length="4"></bp-pin>
        <bp-field-message>Default 4-digit PIN</bp-field-message>
      </bp-field>

      <bp-field>
        <label>6-digit Verification Code</label>
        <bp-pin length="6"></bp-pin>
        <bp-field-message>Enter the 6-digit code</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Disabled</label>
        <bp-pin length="6" disabled value="123456"></bp-pin>
        <bp-field-message>Disabled PIN input</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>Error</label>
        <bp-pin length="6"></bp-pin>
        <bp-field-message status="error">Invalid code entered</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>Success</label>
        <bp-pin length="6" value="123456"></bp-pin>
        <bp-field-message status="success">Code verified successfully</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field>
        <label>4-digit PIN</label>
        <bp-pin length="4"></bp-pin>
        <bp-field-message>Default 4-digit PIN</bp-field-message>
      </bp-field>

      <bp-field>
        <label>6-digit Verification Code</label>
        <bp-pin length="6"></bp-pin>
        <bp-field-message>Enter the 6-digit code</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Disabled</label>
        <bp-pin length="6" disabled value="123456"></bp-pin>
        <bp-field-message>Disabled PIN input</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>Error</label>
        <bp-pin length="6"></bp-pin>
        <bp-field-message status="error">Invalid code entered</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>Success</label>
        <bp-pin length="6" value="123456"></bp-pin>
        <bp-field-message status="success">Code verified successfully</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field>
        <label>4-digit PIN</label>
        <bp-pin length="4"></bp-pin>
        <bp-field-message>Default 4-digit PIN</bp-field-message>
      </bp-field>

      <bp-field>
        <label>6-digit Verification Code</label>
        <bp-pin length="6"></bp-pin>
        <bp-field-message>Enter the 6-digit code</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Disabled</label>
        <bp-pin length="6" disabled value="123456"></bp-pin>
        <bp-field-message>Disabled PIN input</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>Error</label>
        <bp-pin length="6"></bp-pin>
        <bp-field-message status="error">Invalid code entered</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>Success</label>
        <bp-pin length="6" value="123456"></bp-pin>
        <bp-field-message status="success">Code verified successfully</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function masked() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Masked PIN (password)</label>
        <bp-pin length="4" mask></bp-pin>
        <bp-field-message>PIN is masked like a password</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Visible PIN</label>
        <bp-pin length="4"></bp-pin>
        <bp-field-message>PIN is visible</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function types() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Numeric (default)</label>
        <bp-pin length="6" type="number"></bp-pin>
        <bp-field-message>Only numbers allowed</bp-field-message>
      </bp-field>

      <bp-field>
        <label>Text (alphanumeric)</label>
        <bp-pin length="6" type="text"></bp-pin>
        <bp-field-message>Letters and numbers allowed</bp-field-message>
      </bp-field>

      <bp-field>
        <label>With Pattern (uppercase only)</label>
        <bp-pin length="6" type="text" pattern="[A-Z0-9]"></bp-pin>
        <bp-field-message>Uppercase letters and numbers only</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function lengths() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>4-digit</label>
        <bp-pin length="4"></bp-pin>
      </bp-field>

      <bp-field>
        <label>6-digit</label>
        <bp-pin length="6"></bp-pin>
      </bp-field>

      <bp-field>
        <label>8-digit</label>
        <bp-pin length="8"></bp-pin>
      </bp-field>
    </bp-form-group>
  `;
}

export function readonly() {
  return /* html */`
    <bp-field>
      <label>Read-only PIN</label>
      <bp-pin length="6" readonly value="123456"></bp-pin>
      <bp-field-message>This PIN cannot be edited</bp-field-message>
    </bp-field>
  `;
}

export function customStyling() {
  return /* html */`
    <style>
      .custom-pin {
        --gap: var(--bp-space-400);
        --width: 3.5rem;
        --height: 3.5rem;
        --font-size: var(--bp-text-size-600);
        --border-radius: var(--bp-object-border-width-400);
      }

      .compact-pin {
        --gap: var(--bp-space-200);
        --width: 2.5rem;
        --height: 2.5rem;
        --font-size: var(--bp-text-size-400);
      }
    </style>

    <bp-form-group layout="vertical">
      <bp-field>
        <label>Default Styling</label>
        <bp-pin length="6"></bp-pin>
      </bp-field>

      <bp-field>
        <label>Custom Large</label>
        <bp-pin length="6" class="custom-pin"></bp-pin>
      </bp-field>

      <bp-field>
        <label>Compact</label>
        <bp-pin length="6" class="compact-pin"></bp-pin>
      </bp-field>
    </bp-form-group>
  `;
}

export function events() {
  return /* html */`
    <script type="module">
      const pin = document.querySelector('#event-pin');
      const output = document.querySelector('#event-output');

      pin.addEventListener('input', (e) => {
        output.textContent = 'Input: ' + e.target.value;
      });

      pin.addEventListener('complete', (e) => {
        output.textContent = 'Complete: ' + e.detail.value;
        console.log('PIN complete:', e.detail.value);
      });
    </script>

    <bp-field>
      <label>Enter PIN</label>
      <bp-pin id="event-pin" length="6"></bp-pin>
      <bp-field-message id="event-output">Start entering digits...</bp-field-message>
    </bp-field>
  `;
}

export function formIntegration() {
  return /* html */`
    <script type="module">
      const form = document.querySelector('#pin-form');
      const result = document.querySelector('#form-result');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        result.textContent = 'Submitted PIN: ' + formData.get('verification-code');
      });
    </script>

    <form id="pin-form">
      <bp-field validate>
        <label>Verification Code</label>
        <bp-pin name="verification-code" length="6" required></bp-pin>
        <bp-field-message>Enter all 6 digits to submit</bp-field-message>
      </bp-field>
      <bp-button type="submit" style="margin-top: var(--bp-space-300)">Verify</bp-button>
      <p id="form-result" style="margin-top: var(--bp-space-300)"></p>
    </form>
  `;
}

export function pasteSupport() {
  return /* html */`
    <bp-field>
      <label>Try Pasting a Code</label>
      <bp-pin length="6"></bp-pin>
      <bp-field-message>Copy "123456" and paste into the first field</bp-field-message>
    </bp-field>
  `;
}
