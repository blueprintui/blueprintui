export const metadata = {
  name: 'chat',
  elements: ['bp-chat-message', 'bp-chat-group'],
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/chat.js';
    </script>

    <bp-chat-group>
      <bp-chat-message type="received" arrow="left-start">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message type="sent" arrow="right-end">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message type="received" arrow="left-start">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message type="sent" arrow="right-end">hello there, this is a long message that just keeps going... </bp-chat-message>
      <bp-chat-message type="sent" arrow="right-end">
        hello there, this is a long message that just keeps going...<br />
        hello there, this is a long message that just keeps going...
      </bp-chat-message>
    </bp-chat-group>
    `;
}

export function color() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/chat.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-chat-message>hello there</bp-chat-message>
      <bp-chat-message color="green">hello there</bp-chat-message>
      <bp-chat-message color="blue">hello there</bp-chat-message>
      <bp-chat-message color="red">hello there</bp-chat-message>
      <bp-chat-message color="yellow">hello there</bp-chat-message>
      <bp-chat-message color="violet">hello there</bp-chat-message>
    </div>
    `;
}

export function longText() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/chat.js';
    </script>

    <div bp-layout="block gap:sm">
      <bp-chat-message>hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message color="green">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message color="blue">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message color="red">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message color="yellow">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message color="violet">hello there, this is a long message that just keeps going...</bp-chat-message>
      <bp-chat-message>
        <p>hello there, this is a long message that just keeps going...</p>
        <p>hello there, this is a long message that just keeps going...</p>
        <p>hello there, this is a long message that just keeps going...</p>
        <p>hello there, this is a long message that just keeps going...</p>
      </bp-chat-message>
    </div>
    `;
}

export function progress() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/chat.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-chat-message progress>hello there</bp-chat-message>
      <bp-chat-message progress color="green">hello there</bp-chat-message>
      <bp-chat-message progress color="blue">hello there</bp-chat-message>
      <bp-chat-message progress color="red">hello there</bp-chat-message>
      <bp-chat-message progress color="yellow">hello there</bp-chat-message>
      <bp-chat-message progress color="violet">hello there</bp-chat-message>
    </div>
    `;
}

export function arrow() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/chat.js';
    </script>

    <div bp-layout="grid cols:4 gap:sm" style="max-width: 500px">
      <bp-chat-message arrow="top-start">top-start</bp-chat-message>
      <bp-chat-message arrow="top">top</bp-chat-message>
      <bp-chat-message arrow="top-end">top-end</bp-chat-message>

      <bp-chat-message arrow="right-start">right-start</bp-chat-message>
      <bp-chat-message arrow="right">right</bp-chat-message>
      <bp-chat-message arrow="right-end">right-end</bp-chat-message>

      <bp-chat-message arrow="bottom-start">bottom-start</bp-chat-message>
      <bp-chat-message arrow="bottom">bottom</bp-chat-message>
      <bp-chat-message arrow="bottom-end">bottom-end</bp-chat-message>

      <bp-chat-message arrow="left-start">left-start</bp-chat-message>
      <bp-chat-message arrow="left">left</bp-chat-message>
      <bp-chat-message arrow="left-end">left-end</bp-chat-message>

      <bp-chat-message>none</bp-chat-message>
    </div>
    `;
}
