export const metadata = {
  name: 'popover-mixin',
  elements: ['demo-popover', 'demo-tooltip', 'demo-toggletip', 'demo-modal']
};

/** @summary Basic popover using the PopoverMixin with a vanilla custom element. */
export function basic() {
  return /* html */ `
    <style>
      demo-popover {
        background: #fff;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
    </style>
    <button popovertarget="demo-basic">Open Popover</button>
    <demo-popover id="demo-basic">
      <p>Basic popover content</p>
    </demo-popover>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoPopover extends PopoverMixin(HTMLElement) {
        connectedCallback() {
          super.connectedCallback();
          this.shadowRoot.innerHTML = '<slot></slot>';
        }
      }

      if (!customElements.get('demo-popover')) {
        customElements.define('demo-popover', DemoPopover);
      }
    </script>
  `;
}

/** @summary Popover with CSS anchor positioning. The popover anchors to the trigger button. */
export function anchorPositioning() {
  return /* html */ `
    <style>
      demo-anchor {
        background: #fff;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        position: fixed;
        position-area: bottom span-right;
        margin-top: 8px;
      }
    </style>
    <div style="padding: 24px;">
      <button id="anchor-trigger" popovertarget="demo-anchor">Anchored Popover</button>
    </div>
    <demo-anchor id="demo-anchor" anchor="anchor-trigger">
      <p>I am anchored below the button</p>
    </demo-anchor>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoAnchor extends PopoverMixin(HTMLElement) {
        connectedCallback() {
          super.connectedCallback();
          this.shadowRoot.innerHTML = '<slot></slot>';
        }
      }

      customElements.define('demo-anchor', DemoAnchor);
    </script>
  `;
}

/** @summary Tooltip using hint popover type with Interest Invokers API for hover/focus. */
export function tooltip() {
  return /* html */ `
    <style>
      demo-tooltip {
        background: #333;
        color: #fff;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        position: fixed;
        position-area: top center;
        margin-bottom: 8px;
      }
    </style>
    <div style="padding: 48px;">
      <button id="tooltip-trigger" interestfor="demo-tooltip">Hover for tooltip</button>
    </div>
    <demo-tooltip id="demo-tooltip" anchor="tooltip-trigger">
      Helpful tooltip text
    </demo-tooltip>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

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
    </script>
  `;
}

/** @summary Toggletip using the Popover API for click-based toggle. */
export function toggletip() {
  return /* html */ `
    <style>
      demo-toggletip {
        background: #fff;
        border: 1px solid #ccc;
        padding: 12px 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        position: fixed;
        position-area: bottom span-right;
        margin-top: 8px;
      }
    </style>
    <div style="padding: 24px;">
      <button id="toggletip-trigger" popovertarget="demo-toggletip">Click for info</button>
    </div>
    <demo-toggletip id="demo-toggletip" anchor="toggletip-trigger">
      Click the button again to close
    </demo-toggletip>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoToggletip extends PopoverMixin(HTMLElement) {
        get popoverConfig() {
          return {
            type: 'auto',
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

      customElements.define('demo-toggletip', DemoToggletip);
    </script>
  `;
}

/** @summary Modal dialog with focus trap and scroll lock enabled. */
export function modal() {
  return /* html */ `
    <style>
      body {
        min-height: 200vh;
      }

      demo-modal {
        background: #fff;
        border: 1px solid #ccc;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        position: fixed;
        inset: 0;
        margin: auto;
        width: 320px;
        height: fit-content;
      }

      demo-modal::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }

      demo-modal h3 {
        margin-top: 0;
      }

      demo-modal input {
        display: block;
        width: 100%;
        padding: 8px;
        margin: 12px 0;
        box-sizing: border-box;
      }
    </style>
    <button popovertarget="demo-modal">Open Modal</button>
    <demo-modal id="demo-modal">
      <h3>Modal Dialog</h3>
      <p>Focus is trapped and scroll is locked.</p>
      <input type="text" placeholder="Try tabbing through" />
      <button popovertarget="demo-modal" popovertargetaction="hide">Close</button>
    </demo-modal>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

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
    </script>
  `;
}

/** @summary The [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) allows declarative popover control. */
export function popoverApi() {
  return /* html */ `
    <style>
      demo-popover-api {
        background: #fff;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
    </style>
    <button popovertarget="popover-api-demo">Toggle (popovertarget)</button>
    <button popovertarget="popover-api-demo" popovertargetaction="show">Show</button>
    <button popovertarget="popover-api-demo" popovertargetaction="hide">Hide</button>
    <demo-popover-api id="popover-api-demo">
      Controlled via Popover API attributes
    </demo-popover-api>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoPopoverApi extends PopoverMixin(HTMLElement) {
        connectedCallback() {
          super.connectedCallback();
          this.shadowRoot.innerHTML = '<slot></slot>';
        }
      }

      customElements.define('demo-popover-api', DemoPopoverApi);
    </script>
  `;
}

/** @summary The [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) provides command-based control. */
export function invokerCommandsApi() {
  return /* html */ `
    <style>
      demo-command {
        background: #fff;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
    </style>
    <button commandfor="command-demo" command="toggle-popover">Toggle (command)</button>
    <button commandfor="command-demo" command="show-popover">Show</button>
    <button commandfor="command-demo" command="hide-popover">Hide</button>
    <demo-command id="command-demo">
      Controlled via Invoker Commands API
    </demo-command>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoCommand extends PopoverMixin(HTMLElement) {
        connectedCallback() {
          super.connectedCallback();
          this.shadowRoot.innerHTML = '<slot></slot>';
        }
      }

      customElements.define('demo-command', DemoCommand);
    </script>
  `;
}

/** @summary The [Interest Invokers API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers) triggers on hover/focus. */
export function interestInvokersApi() {
  return /* html */ `
    <style>
      demo-interest {
        background: #333;
        color: #fff;
        padding: 8px 12px;
        border-radius: 4px;
        position: fixed;
        position-area: top center;
        margin-bottom: 8px;
      }
    </style>
    <div style="padding: 128px;">
      <button id="interest-trigger" interestfor="interest-demo">Hover or focus me</button>
    </div>
    <demo-interest id="interest-demo" anchor="interest-trigger">
      Shows on interest, hides on lose interest
    </demo-interest>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoInterest extends PopoverMixin(HTMLElement) {
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

      customElements.define('demo-interest', DemoInterest);
    </script>
  `;
}

/** @summary Listening to open and close events. */
export function events() {
  return /* html */ `
    <style>
      demo-events {
        background: #fff;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
      #event-log {
        background: #f5f5f5;
        padding: 12px;
        margin-top: 16px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        max-height: 80px;
        overflow-y: auto;
      }
    </style>
    <button popovertarget="events-demo">Toggle Popover</button>
    <demo-events id="events-demo">
      Open and close to see events
    </demo-events>
    <div id="event-log">Events:</div>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoEvents extends PopoverMixin(HTMLElement) {
        connectedCallback() {
          super.connectedCallback();
          this.shadowRoot.innerHTML = '<slot></slot>';
        }
      }

      customElements.define('demo-events', DemoEvents);

      const popover = document.querySelector('#events-demo');
      const log = document.querySelector('#event-log');

      popover.addEventListener('open', () => {
        log.innerHTML += '<div>open</div>';
        log.scrollTop = log.scrollHeight;
      });

      popover.addEventListener('close', () => {
        log.innerHTML += '<div>close</div>';
        log.scrollTop = log.scrollHeight;
      });
    </script>
  `;
}

/** @summary Programmatic control using showPopover, hidePopover, and togglePopover. */
export function programmatic() {
  return /* html */ `
    <style>
      demo-programmatic {
        background: #fff;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
    </style>
    <div style="display: flex; gap: 8px;">
      <button id="show-btn">showPopover()</button>
      <button id="hide-btn">hidePopover()</button>
      <button id="toggle-btn">togglePopover()</button>
    </div>
    <demo-programmatic id="programmatic-demo">
      Controlled programmatically
    </demo-programmatic>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoProgrammatic extends PopoverMixin(HTMLElement) {
        connectedCallback() {
          super.connectedCallback();
          this.shadowRoot.innerHTML = '<slot></slot>';
        }
      }

      customElements.define('demo-programmatic', DemoProgrammatic);

      const popover = document.querySelector('#programmatic-demo');

      document.querySelector('#show-btn').addEventListener('click', () => {
        popover.showPopover();
      });

      document.querySelector('#hide-btn').addEventListener('click', () => {
        popover.hidePopover();
      });

      document.querySelector('#toggle-btn').addEventListener('click', () => {
        popover.togglePopover();
      });
    </script>
  `;
}

/** @summary Manual control of the popover. All behavior is controlled by the developer. Keynav behaviors are disabled. */
export function manual() {
  return /* html */ `
    <style>
      demo-manual {
        padding: 16px;
        position: fixed;
        inset: 0;
      }
    </style>
    <button id="manual-trigger" popovertarget="demo-manual">Show Popover</button>
    <demo-manual id="demo-manual" anchor="manual-trigger">
      Manual control
      <button popovertarget="demo-manual" popovertargetaction="hide">Close</button>
    </demo-manual>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoManual extends PopoverMixin(HTMLElement) {
        get popoverConfig() {
          return {
            type: 'manual',
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

      customElements.define('demo-manual', DemoManual);
    </script>
  `;
}

/** @summary The popover can be opened from a shadow root. */
export function shadowRoot() {
  return /* html */ `
    <style>
      demo-popover {
        position-anchor: auto;
        position-area: right;
        margin: 0;
      }
    </style>
    <ui-shadow-root id="ui-shadow-root">
      <template shadowrootmode="open">
        <style>
          :host {
            background: #fff;
            border: 1px solid #ccc;
            padding: 16px;
            border-radius: 4px;
            width: 50vw;
            height: 50vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
        <button popovertarget="shadow-root-demo">Open Popover</button>
      </template>
    </ui-shadow-root>

    <demo-popover id="shadow-root-demo">
      <p>popover</p>
    </demo-popover>

    <script type="module">
      import { PopoverMixin } from '@blueprintui/orbit/popover';

      class DemoPopover extends PopoverMixin(HTMLElement) {
        connectedCallback() {
          super.connectedCallback();
          this.shadowRoot.innerHTML = '<slot></slot>';
        }
      }

      if (!customElements.get('demo-popover')) {
        customElements.define('demo-popover', DemoPopover);
      }

      // demonstrates that opening the popover with an assigned source allows cross shadow root popover anchor positioning
      const source = document.querySelector('#ui-shadow-root').shadowRoot.querySelector('button');
      const popover = document.querySelector('#shadow-root-demo');
      source.addEventListener('click', () => popover.showPopover({ source }));
    </script>
  `;
}

/** @summary Multiple anchor popovers can be opened and anchored to different elements at the same time. */
export function multiAnchorPopovers() {
  return /* html */ `
<style>
  section {
    padding: 48px;
  }

  [popover] {
    background: transparent;
    flex-direction: column;
    position-anchor: auto;
    position-area: bottom span-right;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition-timing-function: ease;
    transition-property: opacity, overlay, transform;
    transition-duration: 300ms;
    transition-behavior: allow-discrete;

    ~ [popover] {
      position-area: right span-bottom;
    }

    &:popover-open {
      display: flex;
      opacity: 1;
      transform: translateY(0);

      @starting-style {
        opacity: 0;
        transform: translateY(-10%);
      }
    }

    &:has(+ [popover]:popover-open) > button[popovertarget] {
      background: oklch(0 0 0 / 0.15);
    }

    button {
      background: oklch(0 0 0 / 0.05);
      position: relative;
      border-radius: 0;
      border: 0;
      padding: 8px;
      min-width: 100px;
      text-align: left;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 12px;

      &:hover {
        background: oklch(0 0 0 / 0.15);
      }

      &[popovertarget]::after {
        content: '▶';
        display: inline-block;
        margin-left: auto;
        font-size: 0.8em;
        vertical-align: middle;
        color: #484848;
      }
    }
  }
</style>
<section>
  <button id="anchor" popovertarget="menu-1">anchor</button>
  <menu id="menu-1" popover>
    <button>menu item</button>
    <button>menu item</button>
    <button popovertarget="menu-2">menu item</button>
    <button>menu item</button>
  </menu>
  <menu id="menu-2" popover>
    <button>menu item</button>
    <button popovertarget="menu-3">menu item</button>
    <button>menu item</button>
  </menu>
  <menu id="menu-3" popover>
    <button>menu item</button>
    <button>menu item</button>
    <button>menu item</button>
  </menu>
</section>
  `;
}
