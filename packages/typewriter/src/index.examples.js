export const metadata = {
  name: 'keynav',
  elements: ['bp-keylist', 'bp-keygrid']
};

export function keylist() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keylist.js';
    </script>
    <bp-keylist>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keylist>
    `;
}

export function keylistVertical() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keylist.js';
    </script>
    <bp-keylist direction="block">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keylist>
    `;
}

export function keylistHorizontal() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keylist.js';
    </script>
    <bp-keylist direction="inline">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keylist>
    `;
}

export function keylistLoop() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keylist.js';
    </script>
    <bp-keylist loop>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keylist>
    `;
}

export function keygrid() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keygrid.js';
    </script>
    <bp-keygrid columns="5">
      <button>1-1</button>
      <button>1-2</button>
      <button>1-3</button>
      <button>1-4</button>
      <button>1-5</button>

      <button>2-1</button>
      <button>2-2</button>
      <button>2-3</button>
      <button>2-4</button>
      <button>2-5</button>

      <button>3-1</button>
      <button>3-2</button>
      <button>3-3</button>
      <button>3-4</button>
      <button>3-5</button>

      <button>4-1</button>
      <button>4-2</button>
      <button>4-3</button>
      <button>4-4</button>
      <button>4-5</button>
    </bp-keygrid>
    `;
}
