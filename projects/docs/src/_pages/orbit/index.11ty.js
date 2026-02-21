export const data = {
  title: '@blueprintui/orbit',
  description: 'Zero-dependency popover mixin and CSS anchor positioning utilities for Web Components.',
  layout: 'single-page.11ty.js',
  templateEngineOverride: '11ty.js,md',
  permalink: 'orbit.html',
  browserColor: '#c077e4'
}

export function render(data) {
  return /* markdown */`
<style>
  :root {
    --orbit-color: oklch(0.69 0.17 313.55) !important;
    scrollbar-color: var(--bp-scrollbar-color);
    scrollbar-width: var(--bp-scrollbar-width);
  }

  bp-button {
    --color: var(--orbit-color) !important;
    --border: 1px solid var(--orbit-color) !important;
  }

  main {
    margin: 0 auto;
    max-width: 1220px;
    padding: 48px 24px 96px 24px;
  }

  footer {
    padding: 12px;
    background: var(--orbit-color);
  }

  footer bp-divider {
    --background: var(--bp-text-color-200);
  }

  footer a {
    text-decoration: none;
    color: var(--bp-text-color-200);
  }

  .demos {
    padding: 24px;
    border: 1px solid var(--bp-object-border-color-200);
    border-radius: 8px;
  }

  .demos p {
    margin: 0;
  }

  demo-popover,
  demo-anchor,
  demo-toggletip,
  demo-tooltip,
  demo-popover-api,
  demo-command,
  demo-programmatic,
  demo-events,
  demo-manual,
  demo-modal {
    background: var(--bp-layer-background-200);
    border: 1px solid var(--bp-object-border-color-200);
    border-radius: var(--bp-object-border-radius-100);
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  demo-anchor,
  demo-toggletip {
    position: fixed;
    position-area: bottom span-right;
    margin-top: 8px;
  }

  demo-tooltip,
  demo-interest {
    position: fixed;
    position-area: top center;
    margin-bottom: 8px;
    min-width: fit-content;
  }

  demo-modal {
    position: fixed;
    inset: 0;
    margin: auto;
    width: 320px;
    height: fit-content;

    &::backdrop {
      background: rgba(0, 0, 0, 0.5);
    }

    h3 {
      margin-top: 0;
    }

    bp-input {
      --border: 1px solid var(--bp-object-border-color-200);
      margin: 12px 0;
    }
  }

  #event-log {
    border-radius: var(--bp-object-border-radius-100);
    background: var(--bp-color-gray-1000);
    scrollbar-color: var(--bp-scrollbar-color);
    scrollbar-width: var(--bp-scrollbar-width);
    padding: 12px;
    margin-top: 16px;
    font-family: monospace;
    font-size: 12px;
    max-height: 80px;
    overflow-y: auto;
  }
</style>
<main bp-layout="block gap:lg">
  <div bp-layout="block inline:center gap:sm">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(280, 60%, 70%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(280, 50%, 45%);stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="10" fill="url(#orbitGrad)"/>
      <ellipse cx="50" cy="50" rx="28" ry="12" fill="none" stroke="url(#orbitGrad)" stroke-width="2" transform="rotate(-25 50 50)"/>
      <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="url(#orbitGrad)" stroke-width="2" transform="rotate(25 50 50)"/>
      <circle cx="76" cy="42" r="5" fill="url(#orbitGrad)"/>
      <circle cx="14" cy="40" r="4" fill="url(#orbitGrad)"/>
    </svg>
    <h1 bp-text="heading center" style="--font-size: 72px; font-weight: 200;">Orbit</h1>
    <h1 bp-text="section center" bp-layout="m-t:sm">Zero-dependency mixin for creating Web Component popovers.</h1>
    <div style="width: 350px; align-self: center; margin-top: 12px">

  \`\`\`bash
  npm install @blueprintui\/orbit
  \`\`\`
  </div>

  <div bp-layout="inline gap:xs inline:center m-t:xs">
    <bp-button action="secondary">
      <a href="https://github.com/blueprintui/blueprintui/tree/main/projects/orbit">GitHub <svg width="12" height="12" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"></path></svg></a>
    </bp-button>
    <bp-button action="secondary">
      <a href="https://www.npmjs.com/package/@blueprintui/orbit">NPM</a>
    </bp-button>
  </div>
</div>

## PopoverMixin

The \`PopoverMixin\` provides popover functionality for any Web Component. It uses the native [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) with [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning).

<div bp-layout="grid gap:md cols:12" class="demos">

<div bp-layout="block gap:sm col:8@md">

\`\`\`javascript
import { PopoverMixin } from '@blueprintui/orbit/popover';

class MyPopover extends PopoverMixin(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('my-popover', MyPopover);
\`\`\`

\`\`\`html
<button popovertarget="my-popover">show</button>
<my-popover id="my-popover">content</my-popover>
\`\`\`

</div>

<div bp-layout="col:4@md">
  <bp-button action="secondary" popovertarget="demo-basic">show popover</bp-button>
  <demo-popover id="demo-basic">
    <p>basic popover content</p>
  </demo-popover>
</div>

</div>

## CSS Anchor Positioning

Popovers automatically anchor to their trigger element using CSS Anchor Positioning.
You can optionally set the anchor position using the \`anchor\` attribute/property to anchor to
another element that is not the trigger element.

<div bp-layout="grid gap:md cols:12" class="demos">

<div bp-layout="block gap:sm col:8@md">

\`\`\`html
<button id="anchor-trigger" popovertarget="demo-anchor">
  anchored popover
</button>
<demo-anchor id="demo-anchor" anchor="anchor-trigger">
  anchored below the button
</demo-anchor>
\`\`\`

\`\`\`css
demo-anchor {
  position: fixed;
  position-area: bottom span-right;
  margin-top: 8px;
}
\`\`\`

</div>

<div bp-layout="col:4@md">
  <bp-button action="secondary" id="anchor-trigger" popovertarget="demo-anchor">anchored popover</bp-button>
  <demo-anchor id="demo-anchor" anchor="anchor-trigger">
    <p>anchored below the button</p>
  </demo-anchor>
</div>

</div>

## Tooltip (Hint)

Use the \`hint\` popover type with the [Interest Invokers API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers) for tooltips that appear on hover/focus.

<div bp-layout="grid gap:md cols:12" class="demos">

<div bp-layout="block gap:sm col:8@md">

\`\`\`javascript
class DemoTooltip extends PopoverMixin(HTMLElement) {
  get popoverConfig() {
    return {
      type: 'hint',
      modal: false,
      focusTrap: false,
      scrollLock: false
    };
  }
}
\`\`\`

\`\`\`html
<button interestfor="demo-tooltip">hover for tooltip</button>
<demo-tooltip id="demo-tooltip">tooltip text</demo-tooltip>
\`\`\`

</div>

<div bp-layout="col:4@md">
  <bp-button action="secondary" id="tooltip-trigger" interestfor="demo-tooltip">hover for tooltip</bp-button>
  <demo-tooltip id="demo-tooltip" anchor="tooltip-trigger">
    tooltip text
  </demo-tooltip>
</div>

</div>

## Modal Dialog

Enable \`modal\`, \`focusTrap\`, and \`scrollLock\` for dialog-style popovers.

<div bp-layout="grid gap:md cols:12" class="demos">

<div bp-layout="block gap:sm col:8@md">

\`\`\`javascript
class DemoModal extends PopoverMixin(HTMLElement) {
  get popoverConfig() {
    return {
      type: 'auto',
      modal: true,
      focusTrap: true,
      scrollLock: true
    };
  }
}
\`\`\`

</div>

<div bp-layout="col:4@md">
  <bp-button action="secondary" popovertarget="demo-modal">show modal</bp-button>
  <demo-modal id="demo-modal">
    <h3>Modal Dialog</h3>
    <p>Focus is trapped and scroll is locked.</p>
    <bp-field>
      <bp-input placeholder="Try tabbing through" />
    </bp-field>
    <bp-button action="secondary" popovertarget="demo-modal" popovertargetaction="hide">Close</bp-button>
  </demo-modal>
</div>

</div>

## Popover API

The [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) enables declarative popover control with \`popovertarget\`.

<div bp-layout="grid gap:md cols:12" class="demos">

<div bp-layout="block gap:sm col:8@md">

\`\`\`html
<button popovertarget="popover">toggle</button>
<button popovertarget="popover" popovertargetaction="show">show</button>
<button popovertarget="popover" popovertargetaction="hide">hide</button>
\`\`\`

</div>

<div bp-layout="inline gap:xs col:4@md">
  <bp-button action="secondary" popovertarget="popover-api-demo">toggle</bp-button>
  <bp-button action="secondary" popovertarget="popover-api-demo" popovertargetaction="show">show</bp-button>
  <bp-button action="secondary" popovertarget="popover-api-demo" popovertargetaction="hide">hide</bp-button>
  <demo-popover-api id="popover-api-demo">
    controlled via popover api
  </demo-popover-api>
</div>

</div>

## Invoker Commands API

The [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) provides command-based control.

<div bp-layout="grid gap:md cols:12" class="demos">

<div bp-layout="block gap:sm col:8@md">

\`\`\`html
<button commandfor="popover" command="toggle-popover">toggle</button>
<button commandfor="popover" command="show-popover">show</button>
<button commandfor="popover" command="hide-popover">hide</button>
\`\`\`

</div>

<div bp-layout="inline gap:xs col:4@md">
  <bp-button action="secondary" commandfor="command-demo" command="toggle-popover">toggle</bp-button>
  <bp-button action="secondary" commandfor="command-demo" command="show-popover">show</bp-button>
  <bp-button action="secondary" commandfor="command-demo" command="hide-popover">hide</bp-button>
  <demo-command id="command-demo">
    controlled via commands api
  </demo-command>
</div>

</div>

## Events

Listen to \`open\` and \`close\` events on popover elements. The \`toggle\` and \`beforetoggle\` events are native to the Popover API.
The \`open\` and \`close\` events are Custom Events fired by the PopoverMixin.

<div bp-layout="grid gap:md cols:12 cols:6@md" class="demos">

<div bp-layout="block gap:sm">

\`\`\`javascript
popover.addEventListener('toggle', () => console.log('toggle'));
popover.addEventListener('beforetoggle', () => console.log('beforetoggle'));
popover.addEventListener('open', () => console.log('open'));
popover.addEventListener('close', () => console.log('close'));
\`\`\`

</div>

<div>
  <bp-button action="secondary" popovertarget="events-demo">toggle popover</bp-button>
  <demo-events id="events-demo">
    open and close to see events
  </demo-events>
  <div id="event-log">Events:</div>
</div>

</div>

## Programmatic Control

Use \`showPopover()\`, \`hidePopover()\`, and \`togglePopover()\` methods.

<div bp-layout="grid gap:md cols:12 cols:6@md" class="demos">

<div bp-layout="block gap:sm">

\`\`\`javascript
popover.showPopover();
popover.hidePopover();
popover.togglePopover();
\`\`\`

</div>

<div bp-layout="inline gap:xs">
  <bp-button action="secondary" id="show-btn">showPopover()</bp-button>
  <bp-button action="secondary" id="hide-btn">hidePopover()</bp-button>
  <bp-button action="secondary" id="toggle-btn">togglePopover()</bp-button>
  <demo-programmatic id="programmatic-demo">
    controlled programmatically
  </demo-programmatic>
</div>

</div>

## API

### PopoverMixin

Apply to any \`HTMLElement\` subclass to add popover functionality.

\`\`\`javascript
import { PopoverMixin } from '@blueprintui/orbit/popover';

class MyPopover extends PopoverMixin(HTMLElement) {
  get popoverConfig() {
    return {
      type: 'auto',      // 'auto' | 'manual' | 'hint'
      modal: false,      // Show backdrop, set aria-modal
      focusTrap: false,  // Trap focus within popover
      scrollLock: false  // Prevent page scroll
    };
  }
}
\`\`\`

### Properties

| Property | Type | Description |
|----------|------|-------------|
| \`open\` | \`boolean\` | Controls popover visibility |
| \`anchor\` | \`string \\| HTMLElement\` | Anchor element ID or reference |
| \`popoverConfig\` | \`PopoverConfig\` | Configuration options (override getter) |

### Events

| Event | Description |
|-------|-------------|
| \`toggle\` | Fired when popover is toggled |
| \`beforetoggle\` | Fired before popover is toggled |
| \`open\` | Fired when popover opens |
| \`close\` | Fired when popover closes |

### CSS Properties

| Name | Description |
|------|-------------|
| \`interest-delay\` | Delay of interest in milliseconds |
| \`interest-delay-start\` | Delay start of interest in milliseconds |
| \`interest-delay-end\` | Delay end of interest in milliseconds |

## Native Popover Type Behaviors

| Behavior                  | auto           | hint         | manual |
| ------------------------- | -------------- | ------------ | ------ |
| Escape key closes         | ✅             | ✅           | ❌     |
| Click outside closes      | ✅             | ✅           | ❌     |
| Opens → closes other auto | ✅             | ❌           | ❌     |
| Multiple can coexist      | ⚠️ nested only | ⚠️ with auto | ✅     |

## Common Popover Behaviors

| Component | Popover Type | Focus Trap | Modal Default | Scroll Lock |
| --------- | ------------ | ---------- | ------------- | ----------- |
| Tooltip   | \`hint\`       | ❌         | ❌            | ❌          |
| Toggletip | \`auto\`       | ❌         | ❌            | ❌          |
| Toast     | \`manual\`     | ❌         | ❌            | ❌          |
| Dropdown  | \`auto\`       | ⚠️ managed | ❌            | ❌          |
| Drawer    | \`auto\`       | ✅         | ✅            | ✅          |
| Dialog    | \`auto\`       | ✅         | ✅            | ✅          |

</main>
<footer bp-layout="inline gap:sm inline:center">
  <a bp-text="link" href="https://blueprintui.dev">BlueprintUI</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://github.com/blueprintui/blueprintui/tree/main/projects/orbit">GitHub</a>
  <bp-divider orientation="vertical"></bp-divider>
  <a bp-text="link" href="https://www.npmjs.com/package/@blueprintui/orbit">NPM</a>
</footer>

<script type="module">
  import '@blueprintui/components/include/divider.js';
  import '@blueprintui/components/include/button.js';
  import '@blueprintui/components/include/forms.js';
  import '@blueprintui/components/include/input.js';
  import { PopoverMixin } from '@blueprintui/orbit';

  // Basic popover
  class DemoPopover extends PopoverMixin(HTMLElement) {
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-popover', DemoPopover);

  // Anchor popover
  class DemoAnchor extends PopoverMixin(HTMLElement) {
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-anchor', DemoAnchor);

  // Tooltip
  class DemoTooltip extends PopoverMixin(HTMLElement) {
    get popoverConfig() {
      return {
        type: 'hint',
        modal: false,
        focusTrap: false,
        scrollLock: false
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-tooltip', DemoTooltip);

  // Modal
  class DemoModal extends PopoverMixin(HTMLElement) {
    get popoverConfig() {
      return {
        type: 'auto',
        modal: true,
        focusTrap: true,
        scrollLock: true
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-modal', DemoModal);

  // Popover API demo
  class DemoPopoverApi extends PopoverMixin(HTMLElement) {
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-popover-api', DemoPopoverApi);

  // Command demo
  class DemoCommand extends PopoverMixin(HTMLElement) {
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-command', DemoCommand);

  // Events demo
  class DemoEvents extends PopoverMixin(HTMLElement) {
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-events', DemoEvents);

  const eventsPopover = document.querySelector('#events-demo');
  const eventLog = document.querySelector('#event-log');

  eventsPopover.addEventListener('open', () => {
    eventLog.innerHTML += '<div>open</div>';
    eventLog.scrollTop = eventLog.scrollHeight;
  });

  eventsPopover.addEventListener('close', () => {
    eventLog.innerHTML += '<div>close</div>';
    eventLog.scrollTop = eventLog.scrollHeight;
  });

  eventsPopover.addEventListener('beforetoggle', () => {
    eventLog.innerHTML += '<div>beforetoggle</div>';
    eventLog.scrollTop = eventLog.scrollHeight;
  });

  eventsPopover.addEventListener('toggle', () => {
    eventLog.innerHTML += '<div>toggle</div>';
    eventLog.scrollTop = eventLog.scrollHeight;
  });

  // Programmatic demo
  class DemoProgrammatic extends PopoverMixin(HTMLElement) {
    connectedCallback() {
      super.connectedCallback();
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
  customElements.define('demo-programmatic', DemoProgrammatic);

  const programmaticPopover = document.querySelector('#programmatic-demo');

  document.querySelector('#show-btn').addEventListener('click', () => {
    programmaticPopover.showPopover();
  });

  document.querySelector('#hide-btn').addEventListener('click', () => {
    programmaticPopover.hidePopover();
  });

  document.querySelector('#toggle-btn').addEventListener('click', () => {
    programmaticPopover.togglePopover();
  });
</script>
  `
}
