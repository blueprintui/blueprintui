export const metadata = {
  name: 'avatar',
  elements: ['bp-avatar']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/shapes/user.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-avatar aria-label="User avatar">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="John Doe">JD</bp-avatar>
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=1" alt="User 1" loading="lazy" />
      </bp-avatar>
    </div>
    `;
}

export function shapes() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/shapes/user.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-avatar shape="circle" aria-label="Circle avatar">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar shape="square" aria-label="Square avatar">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar shape="rounded" aria-label="Rounded avatar">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
    </div>
    `;
}

export function status() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/shapes/user.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-avatar aria-label="Default user">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar status="accent" aria-label="User with accent status">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar status="success" aria-label="Online user">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar status="warning" aria-label="User with warning">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar status="danger" aria-label="User with danger status">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
    </div>
    `;
}

export function sizes() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/shapes/user.js';
    </script>

    <div bp-layout="inline gap:md" style="align-items: center">
      <bp-avatar aria-label="Small avatar" style="--size: var(--bp-size-600)">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="Medium avatar" style="--size: var(--bp-size-800)">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="Large avatar">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="Extra large avatar" style="--size: var(--bp-size-1100)">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
    </div>
    `;
}

export function initials() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-avatar aria-label="John Doe">JD</bp-avatar>
      <bp-avatar aria-label="Sarah Smith">SS</bp-avatar>
      <bp-avatar aria-label="Mike Johnson">MJ</bp-avatar>
      <bp-avatar aria-label="Emily Brown">EB</bp-avatar>
    </div>
    `;
}

export function images() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=1" alt="User 1" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=2" alt="User 2" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=3" alt="User 3" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=4" alt="User 4" loading="lazy" />
      </bp-avatar>
    </div>
    `;
}

export function icons() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/shapes/user.js';
      import '@blueprintui/icons/shapes/building.js';
      import '@blueprintui/icons/shapes/employee-group.js';
      import '@blueprintui/icons/shapes/cog.js';
    </script>

    <div bp-layout="inline gap:md">
      <bp-avatar aria-label="User">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="Organization">
        <bp-icon shape="building" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="Team">
        <bp-icon shape="employee-group" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="Settings">
        <bp-icon shape="cog" type="solid"></bp-icon>
      </bp-avatar>
    </div>
    `;
}

export function group() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div class="avatar-group" bp-layout="inline">
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=5" alt="User 1" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=6" alt="User 2" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="https://i.pravatar.cc/150?img=7" alt="User 3" loading="lazy" />
      </bp-avatar>
      <bp-avatar aria-label="More users">+5</bp-avatar>
    </div>

    <style>
      .avatar-group bp-avatar:not(:first-of-type) {
        margin-left: calc(-1 * var(--bp-space-400));
      }
    </style>
    `;
}
