export const metadata = {
  name: 'format-datetime',
  elements: ['bp-format-datetime']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-datetime.js';
    </script>
    
    <bp-format-datetime date-style="long" time-style="long">2023-07-28T04:20:17.434Z</bp-format-datetime>
    `;
}

export function date() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-datetime.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-datetime>2023-01-20</bp-format-datetime>
      
      <bp-format-datetime date-style="short">2023-01-20</bp-format-datetime>
      
      <bp-format-datetime date-style="long">2023-01-20</bp-format-datetime>
    </div>
    `;
}

export function time() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-datetime.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-datetime time-style="long">2023-07-28T04:20:17.434Z</bp-format-datetime>

      <bp-format-datetime time-style="short">2023-07-28T04:20:17.434Z</bp-format-datetime>
    </div>
    `;
}

export function text() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-datetime.js';
    </script>
    
    <p bp-text="body">test some text <bp-format-datetime date-style="long" time-style="long">2023-07-28T04:20:17.434Z</bp-format-datetime> test some text</p>
    `;
}
