export const metadata = {
  name: 'number',
  elements: ['bp-number']
};

/**
 * @summary Basic number input with field label, placeholder, and help text
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/number.js';
    </script>

    <bp-field>
      <label>quantity</label>
      <bp-number placeholder="enter number"></bp-number>
      <bp-field-message>enter a numeric value</bp-field-message>
    </bp-field>
  `;
}

/**
 * @summary Demonstrates prefix and suffix slots for currency symbols, measurement units, and percentage indicators
 */
export function prefixSuffix() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>price</label>
        <bp-number value="99.99" step="0.01">
          <span slot="prefix">$</span>
        </bp-number>
        <bp-field-message>enter price in dollars</bp-field-message>
      </bp-field>

      <bp-field>
        <label>weight</label>
        <bp-number value="150">
          <span slot="suffix">lbs</span>
        </bp-number>
        <bp-field-message>enter weight in pounds</bp-field-message>
      </bp-field>

      <bp-field>
        <label>temperature</label>
        <bp-number value="72">
          <span slot="suffix">°F</span>
        </bp-number>
        <bp-field-message>enter temperature in fahrenheit</bp-field-message>
      </bp-field>

      <bp-field>
        <label>discount</label>
        <bp-number value="15" min="0" max="100">
          <span slot="suffix">%</span>
        </bp-number>
        <bp-field-message>enter discount percentage</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/**
 * @summary Form validation with required fields, min/max range constraints, and step increment validation with custom error messages
 */
export function validation() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field validate>
        <label>age</label>
        <bp-number min="18" max="120" required></bp-number>
        <bp-field-message error="valueMissing">age is required</bp-field-message>
        <bp-field-message error="rangeUnderflow">must be at least 18</bp-field-message>
        <bp-field-message error="rangeOverflow">must be less than 120</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>rating</label>
        <bp-number min="1" max="5" step="0.5" value="3.5"></bp-number>
        <bp-field-message error="rangeUnderflow">minimum rating is 1</bp-field-message>
        <bp-field-message error="rangeOverflow">maximum rating is 5</bp-field-message>
        <bp-field-message error="stepMismatch">must be in increments of 0.5</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>quantity</label>
        <bp-number min="0" max="999" required></bp-number>
        <bp-field-message error="valueMissing">quantity is required</bp-field-message>
        <bp-field-message error="rangeUnderflow">cannot be negative</bp-field-message>
        <bp-field-message error="rangeOverflow">maximum quantity is 999</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/**
 * @summary Vertical field layout showing default, disabled, error, and success states
 */
export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>quantity</label>
        <bp-number placeholder="0" value="10"></bp-number>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-number placeholder="0" value="5" disabled></bp-number>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>error</label>
        <bp-number placeholder="0" value="150"></bp-number>
        <bp-field-message status="error">value exceeds maximum</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>success</label>
        <bp-number placeholder="0" value="50"></bp-number>
        <bp-field-message status="success">value is valid</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/**
 * @summary Horizontal field layout with label positioned beside input, displaying various field states
 */
export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>quantity</label>
        <bp-number placeholder="0" value="10"></bp-number>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-number placeholder="0" value="5" disabled></bp-number>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-number placeholder="0" value="150"></bp-number>
        <bp-field-message status="error">value exceeds maximum</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-number placeholder="0" value="50"></bp-number>
        <bp-field-message status="success">value is valid</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/**
 * @summary Compact field layout with reduced spacing for space-constrained interfaces
 */
export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>quantity</label>
        <bp-number placeholder="0" value="10"></bp-number>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-number placeholder="0" value="5" disabled></bp-number>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-number placeholder="0" value="150"></bp-number>
        <bp-field-message status="error">value exceeds maximum</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-number placeholder="0" value="50"></bp-number>
        <bp-field-message status="success">value is valid</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/**
 * @summary Read-only number field that displays a value without allowing user modification
 */
export function readonly() {
  return /* html */`
    <bp-field>
      <label>readonly number</label>
      <bp-number value="42" readonly></bp-number>
      <bp-field-message>this value cannot be changed</bp-field-message>
    </bp-field>
  `;
}

/**
 * @summary Demonstrates step increment controls for whole numbers, intervals, and decimal precision
 */
export function step() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>step: 1 (default)</label>
        <bp-number value="10" step="1" min="0" max="100"></bp-number>
        <bp-field-message>increments of 1</bp-field-message>
      </bp-field>

      <bp-field>
        <label>step: 5</label>
        <bp-number value="25" step="5" min="0" max="100"></bp-number>
        <bp-field-message>increments of 5</bp-field-message>
      </bp-field>

      <bp-field>
        <label>step: 0.01 (decimals)</label>
        <bp-number value="9.99" step="0.01" min="0">
          <span slot="prefix">$</span>
        </bp-number>
        <bp-field-message>increments of 0.01</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

/**
 * @summary Min/max range constraints with positive, negative, and mixed value ranges
 */
export function range() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>positive range (0-100)</label>
        <bp-number value="50" min="0" max="100"></bp-number>
        <bp-field-message>min: 0, max: 100</bp-field-message>
      </bp-field>

      <bp-field>
        <label>negative range (-100 to 0)</label>
        <bp-number value="-50" min="-100" max="0"></bp-number>
        <bp-field-message>min: -100, max: 0</bp-field-message>
      </bp-field>

      <bp-field>
        <label>mixed range (-50 to 50)</label>
        <bp-number value="0" min="-50" max="50"></bp-number>
        <bp-field-message>min: -50, max: 50</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}
