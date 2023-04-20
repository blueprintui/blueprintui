export const metadata = {
  name: 'rating',
  elements: ['bp-rating']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/rating.js';
    </script>

    <bp-field>
      <label>rating</label>
      <bp-rating></bp-rating>
    </bp-field>
  `;
}

export function vertical() {
  return /* html */`
    <bp-form-group layout="vertical">
      <bp-field>
        <label>label</label>
        <bp-rating value="3"></bp-rating>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field>
        <label>disabled</label>
        <bp-rating value="3" disabled></bp-rating>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field status="error">
        <label>error</label>
        <bp-rating value="3"></bp-rating>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field status="success">
        <label>success</label>
        <bp-rating value="3"></bp-rating>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function horizontal() {
  return /* html */`
    <bp-form-group layout="horizontal">
      <bp-field layout="horizontal">
        <label>label</label>
        <bp-rating></bp-rating>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal">
        <label>disabled</label>
        <bp-rating disabled></bp-rating>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="error">
        <label>error</label>
        <bp-rating></bp-rating>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="horizontal" status="success">
        <label>success</label>
        <bp-rating></bp-rating>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function compact() {
  return /* html */`
    <bp-form-group layout="compact">
      <bp-field layout="compact">
        <label>label</label>
        <bp-rating></bp-rating>
        <bp-field-message>message text</bp-field-message>
      </bp-field>

      <bp-field layout="compact">
        <label>disabled</label>
        <bp-rating disabled></bp-rating>
        <bp-field-message>disabled message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="error">
        <label>error</label>
        <bp-rating></bp-rating>
        <bp-field-message status="error">error message</bp-field-message>
      </bp-field>

      <bp-field layout="compact" status="success">
        <label>success</label>
        <bp-rating></bp-rating>
        <bp-field-message status="success">success message</bp-field-message>
      </bp-field>
    </bp-form-group>
  `;
}

export function ratingInline() {
  return /* html */`
    <bp-rating placeholder="rating" aria-label="rating"></bp-rating>
  `;
}
