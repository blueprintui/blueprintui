export const metadata = {
  name: 'keynav',
  elements: ['bp-keynav']
};

export function block() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav.js';
    </script>
    <bp-keynav layout="block" loop>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keynav>
    `;
}

export function inline() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav.js';
    </script>
    <bp-keynav layout="inline" loop>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keynav>
    `;
}

export function grid() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav.js';
    </script>
    <bp-keynav layout="grid">
      <button>1-1</button>
      <button>1-2</button>
      <button>1-3</button>
      <button>1-4</button>

      <button>2-1</button>
      <button>2-2</button>
      <button>2-3</button>
      <button>2-4</button>

      <button>3-1</button>
      <button>3-2</button>
      <button>3-3</button>
      <button>3-4</button>

      <button>4-1</button>
      <button>4-2</button>
      <button>4-3</button>
      <button>4-4</button>
    </bp-keynav>
    `;
}

export function links() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav.js';
    </script>
    <bp-keynav layout="inline" loop>
      <a href="#">link 1</a>
      <a href="#">link 2</a>
      <a href="#">link 3</a>
    </bp-keynav>
    `;
}

export function nestedSimple() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav.js';
    </script>
    <bp-keynav layout="inline" loop>
      <div><a href="#">link 1</a></div>
      <div><a href="#">link 2</a></div>
      <div><a href="#">link 3</a></div>
    </bp-keynav>
    `;
}

export function nestedComplex() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav.js';
    </script>
    <style>
      bp-keynav {
        display: flex;
        gap: 24px;
      }

      bp-keynav div {
        display: flex;
        gap: 6px;
      }
    </style>
    <bp-keynav layout="inline" loop>
      <div><a href="#">link 1-1</a><a href="#">link 1-2</a></div>
      <div><a href="#">link 2-1</a><a href="#">link 2-2</a></div>
      <div><a href="#">link 3-1</a><a href="#">link 3-2</a></div>
    </bp-keynav>
    `;
}