export const metadata = {
  name: 'format-number',
  elements: ['bp-format-number']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-number.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-number>1234567</bp-format-number>

      <bp-format-number format="percent">123.4567</bp-format-number>

      <bp-format-number format="decimal">123.4567</bp-format-number>
    </div>
    `;
}

export function currency() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-number.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-number currency="USD">12345.67</bp-format-number>

      <bp-format-number currency="EUR">12345.67</bp-format-number>
    </div>
    `;
}

export function text() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-number.js';
    </script>
    
    <p bp-text="content">test some text <bp-format-number>1234567</bp-format-number> test some text</p>
    `;
}
