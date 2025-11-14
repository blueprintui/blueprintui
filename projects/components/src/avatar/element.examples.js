export const metadata = {
  name: 'avatar',
  elements: ['bp-avatar']
};

/**
 * @summary Basic avatar usage with icon, text initials, and image content options
 */
export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/shapes/user.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-avatar aria-label="User avatar">
        <bp-icon shape="user" type="solid"></bp-icon>
      </bp-avatar>
      <bp-avatar aria-label="John Doe">JD</bp-avatar>
      <bp-avatar>
        <img src="/assets/images/browsers/chrome.svg" alt="chrome browser" loading="lazy" />
      </bp-avatar>
    </div>
    `;
}

/**
 * @summary Avatar shape variants including circle (default), square, and rounded styles
 */
export function shapes() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/shapes/user.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-avatar aria-label="default avatar"></bp-avatar>
      <bp-avatar shape="square" aria-label="square avatar"></bp-avatar>
      <bp-avatar shape="rounded" aria-label="rounded avatar"></bp-avatar>
    </div>
    `;
}

/**
 * @summary Status indicators for user presence or state using accent, success, warning, and danger colors
 */
export function status() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-avatar aria-label="Default user"></bp-avatar>
      <bp-avatar status="accent" aria-label="User with accent status"></bp-avatar>
      <bp-avatar status="success" aria-label="Online user"></bp-avatar>
      <bp-avatar status="warning" aria-label="User with warning"></bp-avatar>
      <bp-avatar status="danger" aria-label="User with danger status"></bp-avatar>
    </div>
    `;
}

/**
 * @summary Custom avatar sizing using CSS variables with small, medium, and large examples
 */
export function sizes() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-avatar aria-label="small avatar" style="--size: var(--bp-size-700)"></bp-avatar>
      <bp-avatar aria-label="medium avatar"></bp-avatar>
      <bp-avatar aria-label="large avatar" style="--size: var(--bp-size-900)"></bp-avatar>
    </div>
    `;
}

/**
 * @summary Text-based avatars displaying user initials as content for multiple users
 */
export function initials() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-avatar aria-label="John Doe">JD</bp-avatar>
      <bp-avatar aria-label="Sarah Smith">SS</bp-avatar>
      <bp-avatar aria-label="Mike Johnson">MJ</bp-avatar>
      <bp-avatar aria-label="Emily Brown">EB</bp-avatar>
    </div>
    `;
}

/**
 * @summary Image-based avatars using the default slot for custom graphics or photos
 */
export function images() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div bp-layout="inline gap:sm">
      <bp-avatar>
        <img src="/assets/images/browsers/safari.svg" alt="safari browser" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="/assets/images/browsers/firefox.svg" alt="firefox browser" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="/assets/images/browsers/edge.svg" alt="edge browser" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="/assets/images/browsers/chrome.svg" alt="chrome browser" loading="lazy" />
      </bp-avatar>
    </div>
    `;
}

/**
 * @summary Icon-based avatars demonstrating different entity types like users, organizations, teams, and settings
 */
export function icons() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/user.js';
      import '@blueprintui/icons/shapes/building.js';
      import '@blueprintui/icons/shapes/employee-group.js';
      import '@blueprintui/icons/shapes/cog.js';
    </script>

    <div bp-layout="inline gap:sm">
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

/**
 * @summary Stacked avatar group pattern with overlapping layout and overflow count indicator
 */
export function group() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/avatar.js';
    </script>

    <div class="avatar-group" bp-layout="inline">
      <bp-avatar>
        <img src="/assets/images/browsers/safari.svg" alt="safari browser" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="/assets/images/browsers/firefox.svg" alt="firefox browser" loading="lazy" />
      </bp-avatar>
      <bp-avatar>
        <img src="/assets/images/browsers/chrome.svg" alt="chrome browser" loading="lazy" />
      </bp-avatar>
      <bp-avatar aria-label="More users">+5</bp-avatar>
    </div>

    <style>
      .avatar-group bp-avatar:not(:last-of-type) {
        margin-right: calc(-1 * var(--bp-space-xs));
      }
    </style>
    `;
}
