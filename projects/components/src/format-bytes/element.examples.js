export const metadata = {
  name: 'format-bytes',
  elements: ['bp-format-bytes']
};


/** @summary Formats and displays file sizes in human-readable format. */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-bytes.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-bytes>1024</bp-format-bytes>

      <bp-format-bytes>1048576</bp-format-bytes>

      <bp-format-bytes>1073741824</bp-format-bytes>
    </div>
    `;
}


/** @summary Demonstrates formatting with decimal vs binary display modes. */
export function binaryDisplay() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-bytes.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-bytes display="decimal">1024</bp-format-bytes>

      <bp-format-bytes display="binary">1024</bp-format-bytes>
    </div>
    `;
}


/** @summary Shows formatting with specific unit constraints like KB, MB, or GB. */
export function specificUnit() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-bytes.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-bytes unit="kb">1048576</bp-format-bytes>

      <bp-format-bytes unit="mb">1048576</bp-format-bytes>

      <bp-format-bytes unit="gb">1048576</bp-format-bytes>
    </div>
    `;
}


/** @summary Demonstrates short vs long unit display formats. */
export function unitDisplay() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-bytes.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-bytes unit-display="short">1048576</bp-format-bytes>

      <bp-format-bytes unit-display="long">1048576</bp-format-bytes>
    </div>
    `;
}


/** @summary Shows precision control with fraction digit settings. */
export function precision() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-bytes.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-bytes maximum-fraction-digits="0">1234567</bp-format-bytes>

      <bp-format-bytes maximum-fraction-digits="2">1234567</bp-format-bytes>

      <bp-format-bytes minimum-fraction-digits="3" maximum-fraction-digits="3">1234567</bp-format-bytes>
    </div>
    `;
}


/** @summary Demonstrates inline formatting within text content. */
export function text() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-bytes.js';
    </script>

    <p bp-text="content">The file size is <bp-format-bytes>1048576</bp-format-bytes> which is quite large.</p>
    `;
}
