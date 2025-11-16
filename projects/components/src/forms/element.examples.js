export const metadata = {
  name: 'forms',
  elements: ['bp-fieldset', 'bp-field', 'bp-field-message']
};

export function control() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/forms.js';
    </script>
    <bp-field>
      <label>control label</label>
      <input />
      <bp-field-message>control message</bp-field-message>
    </bp-field>

    <bp-field>
      <label>control label</label>
      <input type="checkbox" checked />
      <bp-field-message>control message</bp-field-message>
    </bp-field>
  `;
}

export function controlGroup() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/forms.js';
    </script>
    <bp-fieldset>
      <label>control group</label>
      <label>radio one</label>
      <input type="radio" name="radio-group" value="one" checked />

      <label>radio two</label>
      <input type="radio" name="radio-group" value="two" />

      <label>radio three</label>
      <input type="radio" name="radio-group" value="three" />
      <bp-field-message>control message</bp-field-message>
    </bp-fieldset>
  `;
}

export function validation() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/close.js';

      const form = document.querySelector('form');
      const clearForm = document.querySelector('bp-button');
      clearForm.addEventListener('click', () => form.reset());
    </script>
    <form bp-layout="block gap:md">
      <bp-field validate>
        <label>required (valueMissing)</label>
        <bp-input type="text" required></bp-input>
        <bp-field-message error="valueMissing">This field is required</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>pattern (patternMismatch)</label>
        <bp-input type="text" value="012 345 6789" pattern="[0-9]{3} [0-9]{3} [0-9]{4}"></bp-input>
        <bp-field-message error="patternMismatch">Must match pattern: XXX XXX XXXX</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>email (typeMismatch)</label>
        <bp-input type="email" value="invalid-email"></bp-input>
        <bp-field-message error="typeMismatch">Please enter a valid email address</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>number range overflow (rangeOverflow)</label>
        <bp-input type="number" max="10" value="15"></bp-input>
        <bp-field-message error="rangeOverflow">Value must be 10 or less</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>number range underflow (rangeUnderflow)</label>
        <bp-input type="number" min="5" value="2"></bp-input>
        <bp-field-message error="rangeUnderflow">Value must be 5 or greater</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>step mismatch (stepMismatch)</label>
        <bp-input type="number" step="5" value="3"></bp-input>
        <bp-field-message error="stepMismatch">Value must be a multiple of 5</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>minlength (tooShort)</label>
        <bp-input type="text" minlength="5" value="abc"></bp-input>
        <bp-field-message error="tooShort">Must be at least 5 characters</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>maxlength (tooLong)</label>
        <bp-input type="text" maxlength="10" value="this is way too long"></bp-input>
        <bp-field-message error="tooLong">Must be no more than 10 characters</bp-field-message>
      </bp-field>

      <bp-field validate>
        <label>custom error (customError)</label>
        <bp-input id="custom-input" type="text" value="test"></bp-input>
        <bp-field-message error="customError">Custom validation failed</bp-field-message>
      </bp-field>

      <bp-button type="button">reset</bp-button>
    </form>

    <script type="module">
      // Example of setting custom validation
      const customInput = document.querySelector('#custom-input');
      customInput.addEventListener('input', () => {
        if (customInput.value === 'test') {
          customInput.setCustomValidity('Cannot use "test" as value');
        } else {
          customInput.setCustomValidity('');
        }
      });
      // Trigger initial validation
      customInput.dispatchEvent(new Event('input'));
    </script>
  `;
}

export function novalidate() {
  return /* html */`
  <form novalidate>
    <bp-field>
      <label>novalidate</label>
      <bp-input type="text" required></bp-input>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  </form>
  `
}

export function horizontalInline() {
  return /* html */`
  <bp-form-group layout="horizontal-inline">
    <bp-field>
      <label>input label</label>
      <bp-input placeholder="name"></bp-input>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
    </bp-field>

    <bp-field>
      <label>password label</label>
      <bp-password value="123456"></bp-password>
    </bp-field>

    <bp-field>
      <label>search label</label>
      <bp-search placeholder="search"></bp-search>
    </bp-field>

    <bp-field>
      <label>time label</label>
      <bp-time value="11:00"></bp-time>
    </bp-field>

    <bp-field>
      <label>month label</label>
      <bp-month></bp-month>
    </bp-field>

    <bp-field>
      <label>range label</label>
      <bp-range></bp-range>
    </bp-field>

    <bp-fieldset>
      <label>checkbox group label</label>

      <label>checkbox 1</label>
      <bp-checkbox checked></bp-checkbox>

      <label>checkbox 2</label>
      <bp-checkbox></bp-checkbox>

      <label>checkbox 3</label>
      <bp-checkbox></bp-checkbox>
    </bp-fieldset>

    <bp-fieldset>
      <label>radio group label</label>

      <label>radio 1</label>
      <bp-radio value="1" checked></bp-radio>

      <label>radio 2</label>
      <bp-radio value="2"></bp-radio>

      <label>radio 3</label>
      <bp-radio value="3"></bp-radio>
    </bp-fieldset>

    <bp-fieldset>
      <label>switch group label</label>

      <label>switch 1</label>
      <bp-switch checked></bp-switch>

      <label>switch 2</label>
      <bp-switch></bp-switch>

      <label>switch 3</label>
      <bp-switch></bp-switch>

      <bp-field-message>message text</bp-field-message>
    </bp-fieldset>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>textarea label</label>
      <bp-textarea></bp-textarea>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-button>save</bp-button>
  </bp-form-group>
  <br><br>
  <bp-card>
    <bp-form-group layout="horizontal-inline">
      <bp-field>
        <label>input label</label>
        <bp-input placeholder="name"></bp-input>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>select label</label>
        <bp-select>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2" selected>Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-select>
      </bp-field>

      <bp-field>
        <label>password label</label>
        <bp-password value="123456"></bp-password>
      </bp-field>

      <bp-field>
        <label>search label</label>
        <bp-search placeholder="search"></bp-search>
      </bp-field>

      <bp-field>
        <label>time label</label>
        <bp-time value="11:00"></bp-time>
      </bp-field>

      <bp-field>
        <label>month label</label>
        <bp-month></bp-month>
      </bp-field>

      <bp-field>
        <label>range label</label>
        <bp-range></bp-range>
      </bp-field>

      <bp-fieldset>
        <label>checkbox group label</label>

        <label>checkbox 1</label>
        <bp-checkbox checked></bp-checkbox>

        <label>checkbox 2</label>
        <bp-checkbox></bp-checkbox>

        <label>checkbox 3</label>
        <bp-checkbox></bp-checkbox>
      </bp-fieldset>

      <bp-fieldset>
        <label>radio group label</label>

        <label>radio 1</label>
        <bp-radio value="1" checked></bp-radio>

        <label>radio 2</label>
        <bp-radio value="2"></bp-radio>

        <label>radio 3</label>
        <bp-radio value="3"></bp-radio>
      </bp-fieldset>

      <bp-fieldset>
        <label>switch group label</label>

        <label>switch 1</label>
        <bp-switch checked></bp-switch>

        <label>switch 2</label>
        <bp-switch></bp-switch>

        <label>switch 3</label>
        <bp-switch></bp-switch>

        <bp-field-message>message text</bp-field-message>
      </bp-fieldset>

      <bp-field>
        <label>select label</label>
        <bp-select>
          <bp-option value="1">Option One</bp-option>
          <bp-option value="2" selected>Option Two</bp-option>
          <bp-option value="3">Option Three</bp-option>
        </bp-select>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>textarea label</label>
        <bp-textarea></bp-textarea>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-button>save</bp-button>
    </bp-form-group>
  </bp-card>
  `;
}

export function horizontal() {
  return /* html */`
  <bp-form-group layout="horizontal">
    <bp-field>
      <label>input label</label>
      <bp-input placeholder="name"></bp-input>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
    </bp-field>

    <bp-field>
      <label>password label</label>
      <bp-password value="123456"></bp-password>
    </bp-field>

    <bp-field>
      <label>search label</label>
      <bp-search placeholder="search"></bp-search>
    </bp-field>

    <bp-field>
      <label>time label</label>
      <bp-time value="11:00"></bp-time>
    </bp-field>

    <bp-field>
      <label>month label</label>
      <bp-month></bp-month>
    </bp-field>

    <bp-field>
      <label>range label</label>
      <bp-range></bp-range>
    </bp-field>

    <bp-fieldset>
      <label>checkbox group label</label>

      <label>checkbox 1</label>
      <bp-checkbox checked></bp-checkbox>

      <label>checkbox 2</label>
      <bp-checkbox></bp-checkbox>

      <label>checkbox 3</label>
      <bp-checkbox></bp-checkbox>
    </bp-fieldset>

    <bp-fieldset>
      <label>radio group label</label>

      <label>radio 1</label>
      <bp-radio value="1" checked></bp-radio>

      <label>radio 2</label>
      <bp-radio value="2"></bp-radio>

      <label>radio 3</label>
      <bp-radio value="3"></bp-radio>
    </bp-fieldset>

    <bp-fieldset>
      <label>switch group label</label>

      <label>switch 1</label>
      <bp-switch checked></bp-switch>

      <label>switch 2</label>
      <bp-switch></bp-switch>

      <label>switch 3</label>
      <bp-switch></bp-switch>

      <bp-field-message>message text</bp-field-message>
    </bp-fieldset>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>textarea label</label>
      <bp-textarea></bp-textarea>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-button>save</bp-button>
  </bp-form-group> 
  `;
}

export function vertical() {
  return /* html */`
  <bp-form-group>
    <bp-field>
      <label>input label</label>
      <bp-input placeholder="name"></bp-input>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
    </bp-field>

    <bp-field>
      <label>password label</label>
      <bp-password value="123456"></bp-password>
    </bp-field>

    <bp-field>
      <label>search label</label>
      <bp-search placeholder="search"></bp-search>
    </bp-field>

    <bp-field>
      <label>time label</label>
      <bp-time value="11:00"></bp-time>
    </bp-field>

    <bp-field>
      <label>month label</label>
      <bp-month></bp-month>
    </bp-field>

    <bp-field>
      <label>range label</label>
      <bp-range></bp-range>
    </bp-field>

    <bp-fieldset>
      <label>checkbox group label</label>

      <label>checkbox 1</label>
      <bp-checkbox checked></bp-checkbox>

      <label>checkbox 2</label>
      <bp-checkbox></bp-checkbox>

      <label>checkbox 3</label>
      <bp-checkbox></bp-checkbox>
    </bp-fieldset>

    <bp-fieldset>
      <label>radio group label</label>

      <label>radio 1</label>
      <bp-radio value="1" checked></bp-radio>

      <label>radio 2</label>
      <bp-radio value="2"></bp-radio>

      <label>radio 3</label>
      <bp-radio value="3"></bp-radio>
    </bp-fieldset>

    <bp-fieldset>
      <label>switch group label</label>

      <label>switch 1</label>
      <bp-switch checked></bp-switch>

      <label>switch 2</label>
      <bp-switch></bp-switch>

      <label>switch 3</label>
      <bp-switch></bp-switch>

      <bp-field-message>message text</bp-field-message>
    </bp-fieldset>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>textarea label</label>
      <bp-textarea></bp-textarea>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-button>save</bp-button>
  </bp-form-group>
  `;
}

export function verticalInline() {
  return /* html */`
  <bp-form-group layout="vertical-inline">
    <bp-field>
      <label>input label</label>
      <bp-input placeholder="name"></bp-input>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
    </bp-field>

    <bp-field>
      <label>password label</label>
      <bp-password value="123456"></bp-password>
    </bp-field>

    <bp-field>
      <label>search label</label>
      <bp-search placeholder="search"></bp-search>
    </bp-field>

    <bp-field>
      <label>time label</label>
      <bp-time value="11:00"></bp-time>
    </bp-field>

    <bp-field>
      <label>month label</label>
      <bp-month></bp-month>
    </bp-field>

    <bp-field>
      <label>range label</label>
      <bp-range></bp-range>
    </bp-field>

    <bp-fieldset>
      <label>checkbox group label</label>

      <label>checkbox 1</label>
      <bp-checkbox checked></bp-checkbox>

      <label>checkbox 2</label>
      <bp-checkbox></bp-checkbox>

      <label>checkbox 3</label>
      <bp-checkbox></bp-checkbox>
    </bp-fieldset>

    <bp-fieldset>
      <label>radio group label</label>

      <label>radio 1</label>
      <bp-radio value="1" checked></bp-radio>

      <label>radio 2</label>
      <bp-radio value="2"></bp-radio>

      <label>radio 3</label>
      <bp-radio value="3"></bp-radio>
    </bp-fieldset>

    <bp-fieldset>
      <label>switch group label</label>

      <label>switch 1</label>
      <bp-switch checked></bp-switch>

      <label>switch 2</label>
      <bp-switch></bp-switch>

      <label>switch 3</label>
      <bp-switch></bp-switch>

      <bp-field-message>message text</bp-field-message>
    </bp-fieldset>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>textarea label</label>
      <bp-textarea></bp-textarea>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-button>save</bp-button>
  </bp-form-group>
  `;
}

export function compact() {
  return /* html */`
  <bp-form-group layout="compact">
    <bp-field>
      <label>input label</label>
      <bp-input placeholder="name"></bp-input>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
    </bp-field>

    <bp-field>
      <label>password label</label>
      <bp-password value="123456"></bp-password>
    </bp-field>

    <bp-field>
      <label>search label</label>
      <bp-search placeholder="search"></bp-search>
    </bp-field>

    <bp-field>
      <label>time label</label>
      <bp-time value="11:00"></bp-time>
    </bp-field>

    <bp-field>
      <label>month label</label>
      <bp-month></bp-month>
    </bp-field>

    <bp-field>
      <label>range label</label>
      <bp-range></bp-range>
    </bp-field>

    <bp-fieldset>
      <label>checkbox group label</label>

      <label>checkbox 1</label>
      <bp-checkbox checked></bp-checkbox>

      <label>checkbox 2</label>
      <bp-checkbox></bp-checkbox>

      <label>checkbox 3</label>
      <bp-checkbox></bp-checkbox>
      <bp-field-message>message text</bp-field-message>
    </bp-fieldset>

    <bp-fieldset>
      <label>radio group label</label>

      <label>radio 1</label>
      <bp-radio value="1" checked></bp-radio>

      <label>radio 2</label>
      <bp-radio value="2"></bp-radio>

      <label>radio 3</label>
      <bp-radio value="3"></bp-radio>
      <bp-field-message>message text</bp-field-message>
    </bp-fieldset>

    <bp-fieldset>
      <label>switch group label</label>

      <label>switch 1</label>
      <bp-switch checked></bp-switch>

      <label>switch 2</label>
      <bp-switch></bp-switch>

      <label>switch 3</label>
      <bp-switch></bp-switch>

      <bp-field-message>message text</bp-field-message>
    </bp-fieldset>

    <bp-field>
      <label>select label</label>
      <bp-select>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2" selected>Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-select>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-field>
      <label>textarea label</label>
      <bp-textarea></bp-textarea>
      <bp-field-message>message text</bp-field-message>
    </bp-field>

    <bp-button>save</bp-button>
  </bp-form-group>
  `;
}