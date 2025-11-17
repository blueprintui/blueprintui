export const metadata = {
  name: 'telephone',
  elements: ['bp-telephone']
};

/** @summary Enables telephone number input with appropriate formatting and validation. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/telephone.js';
    </script>

    <bp-field>
      <label>Phone Number</label>
      <bp-telephone placeholder="+1 (555) 123-4567"></bp-telephone>
      <bp-field-message>Enter your contact number</bp-field-message>
    </bp-field>
  `;
}

/** @summary Demonstrates the telephone input in vertical form layout. */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>Phone Number</label>
        <bp-telephone placeholder="+1 (555) 123-4567"></bp-telephone>
        <bp-field-message>Enter your contact number</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-telephone disabled value="+1 555-123-4567"></bp-telephone>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>error</label>
        <bp-telephone value="invalid"></bp-telephone>
        <bp-field-message status="error">Please enter a valid phone number</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>success</label>
        <bp-telephone value="+1 555-123-4567"></bp-telephone>
        <bp-field-message status="success">Valid phone number</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Demonstrates the telephone input in horizontal form layout. */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>Phone Number</label>
        <bp-telephone placeholder="+1 (555) 123-4567"></bp-telephone>
        <bp-field-message>Enter your contact number</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-telephone disabled value="+1 555-123-4567"></bp-telephone>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-telephone value="invalid"></bp-telephone>
        <bp-field-message status="error">Please enter a valid phone number</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-telephone value="+1 555-123-4567"></bp-telephone>
        <bp-field-message status="success">Valid phone number</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Demonstrates the telephone input in compact form layout. */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>Phone Number</label>
        <bp-telephone placeholder="+1 (555) 123-4567"></bp-telephone>
        <bp-field-message>Enter your contact number</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-telephone disabled value="+1 555-123-4567"></bp-telephone>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-telephone value="invalid"></bp-telephone>
        <bp-field-message status="error">Please enter a valid phone number</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-telephone value="+1 555-123-4567"></bp-telephone>
        <bp-field-message status="success">Valid phone number</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/** @summary Shows telephone input with pattern validation and required field handling. */
export function validation() {
  return /* html */`
    <bp-field validate>
      <label>Phone Number</label>
      <bp-telephone
        required
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="555-123-4567">
      </bp-telephone>
      <bp-field-message error="patternMismatch">
        Please use format: 555-123-4567
      </bp-field-message>
      <bp-field-message error="valueMissing">
        Phone number is required
      </bp-field-message>
    </bp-field>
  `;
}

/** @summary Demonstrates telephone input with icon prefix for enhanced visual context. */
export function withPrefix() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/telephone.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/phone-handset.js';
    </script>
    <bp-field>
      <label>Phone Number</label>
      <bp-telephone placeholder="555-123-4567">
        <bp-button-icon slot="prefix" shape="phone-handset" readonly></bp-button-icon>
      </bp-telephone>
      <bp-field-message>Phone with icon prefix</bp-field-message>
    </bp-field>
  `;
}

/** @summary Shows telephone input with autocomplete for browser-saved phone number suggestions. */
export function autocomplete() {
  return /* html */`
    <bp-field>
      <label>Phone Number</label>
      <bp-telephone autocomplete="tel" placeholder="+1 (555) 123-4567"></bp-telephone>
      <bp-field-message>Browser will suggest saved phone numbers</bp-field-message>
    </bp-field>
  `;
}
