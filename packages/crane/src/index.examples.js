export const metadata = {
  name: 'crane',
  elements: ['bp-crane']
};

export function example() {
  return /* html */`
    <bp-crane>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <bp-dropzone></bp-dropzone>
    </bp-crane>

    <script type="module">
      import '@blueprintui/crane/include/crane.js';
      document.querySelector('bp-crane').addEventListener('bp-crane-drop', e => {
        e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target)
      });
    </script>
  `;
}

export function events() {
  return /* html */`
    <bp-crane>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <bp-dropzone></bp-dropzone>
    </bp-crane>

    <script type="module">
      import '@blueprintui/crane/include/crane.js';
      // document.querySelector('bp-crane').addEventListener('bp-crane-over', e => console.log('bp-crane-over', e));
      // document.querySelector('bp-crane').addEventListener('bp-crane-drag', e => console.log('bp-crane-drag', e));
      document.querySelector('bp-crane').addEventListener('bp-crane-start', e => console.log('bp-crane-start', e));
      document.querySelector('bp-crane').addEventListener('bp-crane-enter', e => console.log('bp-crane-enter', e));
      document.querySelector('bp-crane').addEventListener('bp-crane-leave', e => console.log('bp-crane-leave', e));
      document.querySelector('bp-crane').addEventListener('bp-crane-end', e => console.log('bp-crane-end', e));
      document.querySelector('bp-crane').addEventListener('bp-crane-drop', e => console.log('bp-crane-drop', e));
    </script>
  `;
}

export function multiList() {
  return /* html */`
    <section>
      <bp-crane>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <bp-dropzone></bp-dropzone>
      </bp-crane>
      <bp-crane>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>10</button>
        <button>11</button>
        <button>12</button>
        <bp-dropzone></bp-dropzone>
      </bp-crane>
    </section>
    <script type="module">
      import '@blueprintui/crane/include/crane.js';
      document.querySelector('section').addEventListener('bp-crane-drop', e => {
        e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
      });
    </script>
  `
}

export function handle() {
  return /* html */`
    <bp-crane>
      <div><button bp-crane="handle">1</button></div>
      <div><button bp-crane="handle">2</button></div>
      <div><button bp-crane="handle">3</button></div>
      <div><button bp-crane="handle">4</button></div>
      <div><button bp-crane="handle">5</button></div>
      <div><button bp-crane="handle">6</button></div>
      <bp-dropzone></bp-dropzone>
    </bp-crane>

    <script type="module">
      import '@blueprintui/crane/include/crane.js';
      document.querySelector('bp-crane').addEventListener('bp-crane-drop', e => {
        e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
      });
    </script>
    `;
}
