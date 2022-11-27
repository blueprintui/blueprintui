export const metadata = {
  name: 'button',
  elements: ['bp-button']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button.js';
    </script>

    <section bp-layout="inline gap:xs">
      <bp-button>default</bp-button>
      <bp-button status="accent">accent</bp-button>
      <bp-button status="success">success</bp-button>
      <bp-button status="warning">warning</bp-button>
      <bp-button status="danger">danger</bp-button>
      <bp-button disabled>disabled</bp-button>
    </section>
    `;
}

export function formSubmit() {
  return /* html */`
    <form>
      <bp-button status="accent">submit form</bp-button>
    </form>

    <script type="module">
      import '@blueprintui/components/include/button.js';

      const form = document.querySelector('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('submit!');
      });
    </script>
    `;
}

export function outline() {
  return /* html */`
    <section bp-layout="inline gap:xs">
      <bp-button action="outline">default</bp-button>
      <bp-button action="outline" status="accent">accent</bp-button>
      <bp-button action="outline" status="success">success</bp-button>
      <bp-button action="outline" status="warning">warning</bp-button>
      <bp-button action="outline" status="danger">danger</bp-button>
      <bp-button action="outline" disabled>disabled</bp-button>
    </section>
  `;
}

export function small() {
  return /* html */`
    <section bp-layout="inline gap:xs">
      <bp-button size="sm">default</bp-button>
      <bp-button size="sm" status="accent">accent</bp-button>
      <bp-button size="sm" status="success">success</bp-button>
      <bp-button size="sm" status="warning">warning</bp-button>
      <bp-button size="sm" status="danger">danger</bp-button>
      <bp-button size="sm" disabled>disabled</bp-button>
    </section>
  `;
}

export function smallOutline() {
  return /* html */`
    <section bp-layout="inline gap:xs">
      <bp-button size="sm" action="outline">default</bp-button>
      <bp-button size="sm" action="outline" status="accent">accent</bp-button>
      <bp-button size="sm" action="outline" status="success">success</bp-button>
      <bp-button size="sm" action="outline" status="warning">warning</bp-button>
      <bp-button size="sm" action="outline" status="danger">danger</bp-button>
      <bp-button size="sm" action="outline" disabled>disabled</bp-button>
    </section>
  `;
}

export function flat() {
  return /* html */`
    <section bp-layout="inline gap:xs">
      <bp-button action="flat">flat button</bp-button>
      <bp-button size="sm" action="flat">flat small</bp-button>
    </section>
  `;
}

export function link() {
  return /* html */`
    <section bp-layout="inline gap:xs">
      <bp-button><a href="#">link default</a></bp-button>
      <bp-button status="accent"><a href="#">link accent</a></bp-button>
      <bp-button status="success"><a href="#">link success</a></bp-button>
      <bp-button status="warning"><a href="#">link warning</a></bp-button>
      <bp-button status="danger"><a href="#">link danger</a></bp-button>
      <bp-button disabled><a href="#">link disabled</a></bp-button>
    </section>
    <section bp-layout="inline gap:xs m-t:sm">
      <bp-button action="outline"><a href="#">link default</a></bp-button>
      <bp-button action="outline" status="accent"><a href="#">link accent</a></bp-button>
      <bp-button action="outline" status="success"><a href="#">link success</a></bp-button>
      <bp-button action="outline" status="warning"><a href="#">link warning</a></bp-button>
      <bp-button action="outline" status="danger"><a href="#">link danger</a></bp-button>
      <bp-button action="outline" disabled><a href="#">link disabled</a></bp-button>
    </section>
  `;
}