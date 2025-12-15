export const metadata = {
  name: 'virtual-list',
  elements: ['bp-virtual-list']
};

export function example() {
  return /* html */ `
    <bp-virtual-list id="list" height="400px" item-height="44" item-count="10000"></bp-virtual-list>

    <script type="module">
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = document.getElementById('list');
      const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

      list.addEventListener('bp-range-change', ({ detail: { start, end } }) => {
        list.innerHTML = data.slice(start, end)
          .map(item => '<div class="item">' + item.name + '</div>')
          .join('');
      });
    </script>

    <style>
      .item {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        height: 44px;
        box-sizing: border-box;
      }
    </style>
  `;
}

export function scrollToIndex() {
  return /* html */ `
    <div style="margin-bottom: 16px;">
      <bp-button action="outline" id="btn-jump">Jump to item 500</bp-button>
      <bp-button action="outline" id="btn-smooth">Smooth scroll to item 500</bp-button>
      <bp-button action="outline" id="btn-top">Back to top</bp-button>
    </div>

    <bp-virtual-list id="list" height="400px" item-height="44" item-count="10000"></bp-virtual-list>

    <script type="module">
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = document.getElementById('list');
      const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

      list.addEventListener('bp-range-change', ({ detail: { start, end } }) => {
        list.innerHTML = data.slice(start, end)
          .map(item => '<div class="item">' + item.name + '</div>')
          .join('');
      });

      document.getElementById('btn-jump').addEventListener('click', () => {
        list.scrollToIndex(500);
      });

      document.getElementById('btn-smooth').addEventListener('click', () => {
        list.scrollToIndex(500, 'smooth');
      });

      document.getElementById('btn-top').addEventListener('click', () => {
        list.scrollToIndex(0, 'smooth');
      });
    </script>

    <style>
      .item {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        height: 44px;
        box-sizing: border-box;
      }
    </style>
  `;
}

export function scrollEvents() {
  return /* html */ `
    <pre id="scroll-info" bp-text="code">
      Scroll position: 0, Direction: idle
    </pre>

    <bp-virtual-list id="list" height="400px" item-height="44" item-count="10000"></bp-virtual-list>

    <script type="module">
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = document.getElementById('list');
      const info = document.getElementById('scroll-info');
      const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

      list.addEventListener('bp-range-change', ({ detail: { start, end } }) => {
        list.innerHTML = data.slice(start, end)
          .map(item => '<div class="item">' + item.name + '</div>')
          .join('');
      });

      list.addEventListener('bp-scroll', ({ detail }) => {
        info.textContent = 'Scroll position: ' + detail.scrollTop + ', Direction: ' + detail.direction;
      });
    </script>
    
    <style>
      .item {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        height: 44px;
        box-sizing: border-box;
      }
    </style>
  `;
}

export function customOverscan() {
  return /* html */ `
    <bp-virtual-list id="list" height="400px" item-height="44" item-count="10000" overscan="10"></bp-virtual-list>

    <script type="module">
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = document.getElementById('list');
      const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

      list.addEventListener('bp-range-change', ({ detail: { start, end, count } }) => {
        console.log('Rendering ' + count + ' items (start: ' + start + ', end: ' + end + ')');
        list.innerHTML = data.slice(start, end)
          .map(item => '<div class="item">' + item.name + '</div>')
          .join('');
      });
    </script>

    <style>
      .item {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        height: 44px;
        box-sizing: border-box;
      }
    </style>
  `;
}

export function variableItemHeight() {
  return /* html */ `
    <div style="margin-bottom: 16px;">
      <button id="btn-small">Small items (30px)</button>
      <button id="btn-medium">Medium items (44px)</button>
      <button id="btn-large">Large items (80px)</button>
    </div>

    <bp-virtual-list id="list" height="400px" item-height="44" item-count="10000"></bp-virtual-list>

    <script type="module">
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = document.getElementById('list');
      const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

      function updateItems({ detail: { start, end } }) {
        const itemHeight = list.itemHeight;
        list.innerHTML = data.slice(start, end)
          .map(item => '<div class="item" style="height: ' + itemHeight + 'px">' + item.name + '</div>')
          .join('');
      }

      list.addEventListener('bp-range-change', updateItems);

      document.getElementById('btn-small').addEventListener('click', () => {
        list.itemHeight = 30;
        list.refresh();
      });

      document.getElementById('btn-medium').addEventListener('click', () => {
        list.itemHeight = 44;
        list.refresh();
      });

      document.getElementById('btn-large').addEventListener('click', () => {
        list.itemHeight = 80;
        list.refresh();
      });
    </script>

    <style>
      .item {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        display: flex;
        align-items: center;
      }
    </style>
  `;
}

export function dynamicItemCount() {
  return /* html */ `
    <div style="margin-bottom: 16px;">
      <button id="btn-100">100 items</button>
      <button id="btn-1000">1,000 items</button>
      <button id="btn-10000">10,000 items</button>
      <button id="btn-100000">100,000 items</button>
    </div>

    <bp-virtual-list id="list" height="400px" item-height="44" item-count="1000">
    </bp-virtual-list>

    <script type="module">
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = document.getElementById('list');
      let data = [];

      function generateData(count) {
        data = Array.from({ length: count }, (_, i) => ({ id: i, name: 'Item ' + i }));
        list.itemCount = count;
        list.refresh();
      }

      list.addEventListener('bp-range-change', ({ detail: { start, end } }) => {
        list.innerHTML = data.slice(start, end)
          .map(item => '<div class="item">' + item.name + '</div>')
          .join('');
      });

      generateData(1000);

      document.getElementById('btn-100').addEventListener('click', () => generateData(100));
      document.getElementById('btn-1000').addEventListener('click', () => generateData(1000));
      document.getElementById('btn-10000').addEventListener('click', () => generateData(10000));
      document.getElementById('btn-100000').addEventListener('click', () => generateData(100000));
    </script>

    <style>
      .item {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        height: 44px;
        box-sizing: border-box;
      }
    </style>
  `;
}

export function styledScrollbar() {
  return /* html */ `
    <bp-virtual-list id="list" height="400px" item-height="44" item-count="10000" style="
      --scrollbar-width: thin;
      --scrollbar-color: #888 #f0f0f0;
    ">
    </bp-virtual-list>

    <script type="module">
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = document.getElementById('list');
      const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: 'Item ' + i }));

      list.addEventListener('bp-range-change', ({ detail: { start, end } }) => {
        list.innerHTML = data.slice(start, end)
          .map(item => '<div class="item">' + item.name + '</div>')
          .join('');
      });
    </script>

    <style>
      .item {
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
        height: 44px;
        box-sizing: border-box;
      }
    </style>
  `;
}
