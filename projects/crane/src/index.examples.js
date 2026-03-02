export const metadata = {
  name: 'crane',
  elements: ['bp-draggable-list']
};

export function example() {
  return /* html */`
    <bp-draggable-list>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <bp-draggable-dropzone></bp-draggable-dropzone>
    </bp-draggable-list>

    <script type="module">
      import '@blueprintui/crane/include/draggable-list.js';
      document.querySelector('bp-draggable-list').addEventListener('bp-draggable-drop', e => {
        e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target)
      });
    </script>
  `;
}

export function events() {
  return /* html */`
    <bp-draggable-list>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <bp-draggable-dropzone></bp-draggable-dropzone>
    </bp-draggable-list>

    <script type="module">
      import '@blueprintui/crane/include/draggable-list.js';
      document.querySelector('bp-draggable-list').addEventListener('bp-draggable-start', e => console.log('bp-draggable-start', e));
      document.querySelector('bp-draggable-list').addEventListener('bp-draggable-enter', e => console.log('bp-draggable-enter', e));
      document.querySelector('bp-draggable-list').addEventListener('bp-draggable-leave', e => console.log('bp-draggable-leave', e));
      document.querySelector('bp-draggable-list').addEventListener('bp-draggable-end', e => console.log('bp-draggable-end', e));
      document.querySelector('bp-draggable-list').addEventListener('bp-draggable-drop', e => console.log('bp-draggable-drop', e));
    </script>
  `;
}

export function multiList() {
  return /* html */`
    <section>
      <bp-draggable-list>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <bp-draggable-dropzone></bp-draggable-dropzone>
      </bp-draggable-list>
      <bp-draggable-list>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>10</button>
        <button>11</button>
        <button>12</button>
        <bp-draggable-dropzone></bp-draggable-dropzone>
      </bp-draggable-list>
    </section>
    <script type="module">
      import '@blueprintui/crane/include/draggable-list.js';
      document.querySelector('section').addEventListener('bp-draggable-drop', e => {
        e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
      });
    </script>
  `
}

export function handle() {
  return /* html */`
    <bp-draggable-list>
      <div><button bp-draggable="handle">1</button></div>
      <div><button bp-draggable="handle">2</button></div>
      <div><button bp-draggable="handle">3</button></div>
      <div><button bp-draggable="handle">4</button></div>
      <div><button bp-draggable="handle">5</button></div>
      <div><button bp-draggable="handle">6</button></div>
      <bp-draggable-dropzone></bp-draggable-dropzone>
    </bp-draggable-list>

    <script type="module">
      import '@blueprintui/crane/include/draggable-list.js';
      document.querySelector('bp-draggable-list').addEventListener('bp-draggable-drop', e => {
        e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
      });
    </script>
    `;
}
