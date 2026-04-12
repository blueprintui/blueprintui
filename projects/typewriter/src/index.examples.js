export const metadata = {
  name: 'keynav',
  elements: ['bp-keynav-list-list']
};

export function block() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav-list.js';
    </script>
    <bp-keynav-list layout="block" loop>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keynav-list>
    `;
}

export function inline() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav-list.js';
    </script>
    <bp-keynav-list layout="inline" loop>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </bp-keynav-list>
    `;
}

export function grid() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav-list.js';
    </script>
    <bp-keynav-list layout="grid">
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
    </bp-keynav-list>
    `;
}

export function links() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav-list.js';
    </script>
    <bp-keynav-list layout="inline" loop>
      <a href="#">link 1</a>
      <a href="#">link 2</a>
      <a href="#">link 3</a>
    </bp-keynav-list>
    `;
}

export function nestedSimple() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav-list.js';
    </script>
    <bp-keynav-list layout="inline" loop>
      <div><a href="#">link 1</a></div>
      <div><a href="#">link 2</a></div>
      <div><a href="#">link 3</a></div>
    </bp-keynav-list>
    `;
}

export function nestedComplex() {
  return /* html */`
    <script type="module">
      import '@blueprintui/typewriter/include/keynav-list.js';
    </script>
    <style>
      bp-keynav-list {
        display: flex;
        gap: 24px;
      }

      bp-keynav-list div {
        display: flex;
        gap: 6px;
      }
    </style>
    <bp-keynav-list layout="inline" loop>
      <div><a href="#">link 1-1</a><a href="#">link 1-2</a></div>
      <div><a href="#">link 2-1</a><a href="#">link 2-2</a></div>
      <div><a href="#">link 3-1</a><a href="#">link 3-2</a></div>
    </bp-keynav-list>
    `;
}
export { block as example };
