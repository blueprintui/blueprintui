export const metadata = {
  name: 'button',
  elements: ['bp-button']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button.js';
    </script>

    <bp-button>default</bp-button>
    `;
}

export function all() {
  return /* html */`
  <div bp-layout="block gap:md">
  ${example()}${action()}${status()}${secondary()}${disabled()}${pressed()}${selected()}
  </div>
  `;
}

export function action() {
  return /* html */`
    <section bp-layout="inline gap:xs block:center">
      <bp-button>default</bp-button>
      <bp-button action="secondary">secondary</bp-button>
      <bp-button action="flat">flat</bp-button>
      <bp-button action="inline">inline</bp-button>
    </section>
  `;
}

export function status() {
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
    </section>
    `;
}

export function secondary() {
  return /* html */`
    <section bp-layout="inline gap:xs">
      <bp-button action="secondary">default</bp-button>
      <bp-button action="secondary" status="accent">accent</bp-button>
      <bp-button action="secondary" status="success">success</bp-button>
      <bp-button action="secondary" status="warning">warning</bp-button>
      <bp-button action="secondary" status="danger">danger</bp-button>
    </section>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button.js';
    </script>

    <section bp-layout="inline gap:xs block:center">
      <bp-button disabled>disabled</bp-button>
      <bp-button disabled action="secondary">disabled secondary</bp-button>
      <bp-button disabled action="flat">disabled flat</bp-button>
      <bp-button disabled action="inline">disabled inline</bp-button>
    </section>
    `;
}

export function pressed() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button.js';
    </script>

    <section bp-layout="inline gap:xs block:center">
      <bp-button pressed>default</bp-button>
      <bp-button pressed action="secondary">secondary</bp-button>
      <bp-button pressed action="flat">flat</bp-button>
      <bp-button pressed action="inline">inline</bp-button>
    </section>
    `;
}

export function selected() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button.js';
    </script>

    <section bp-layout="inline gap:xs block:center">
      <bp-button selected>default</bp-button>
      <bp-button selected action="secondary">secondary</bp-button>
      <bp-button selected action="flat">flat</bp-button>
      <bp-button selected action="inline">inline</bp-button>
    </section>
    `;
}

export function small() {
  return /* html */`
    <section bp-layout="inline gap:xs block:center">
      <bp-button size="sm">default</bp-button>
      <bp-button size="sm" action="secondary">secondary</bp-button>
      <bp-button size="sm" action="flat">flat</bp-button>
      <bp-button size="sm" action="inline">inline</bp-button>
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
      <bp-button action="secondary"><a href="#">link default</a></bp-button>
      <bp-button action="secondary" status="accent"><a href="#">link accent</a></bp-button>
      <bp-button action="secondary" status="success"><a href="#">link success</a></bp-button>
      <bp-button action="secondary" status="warning"><a href="#">link warning</a></bp-button>
      <bp-button action="secondary" status="danger"><a href="#">link danger</a></bp-button>
      <bp-button action="secondary" disabled><a href="#">link disabled</a></bp-button>
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
