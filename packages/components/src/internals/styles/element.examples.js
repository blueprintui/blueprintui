export const metadata = {
  name: 'styles',
  elements: []
};

export function interaction() {
  return /* html */`
    <style>
      button {
        background: color-mix(in oklab, var(--background), black var(--bp-interaction-offset, 0%));
        color: var(--color, var(--bp-status-neutral-color-100));
        border: 0;
        padding: 12px;
        cursor: pointer;
      }

      button:hover,
      button[hover] {
        --bp-interaction-offset: var(--bp-interaction-hover-offset);
      }

      button:active,
      button[active] {
        --bp-interaction-offset: var(--bp-interaction-active-offset);
      }

      button:disabled,
      [disabled] {
        --bp-interaction-offset: var(--bp-interaction-disabled-offset);
      }

      button[selected] {
        --bp-interaction-offset: var(--bp-interaction-selected-offset);
      }
    </style>

    <section bp-layout="block gap:md">
      <div bp-layout="inline gap:md" style="--background: var(--bp-layer-container-background); --color: var(--bp-text-color-500);">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-neutral-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-accent-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-success-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-warning-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
      <div bp-layout="inline gap:md" style="--background: var(--bp-status-danger-background-200)">
        <button>button</button>
        <button hover>hover</button>
        <button active>active</button>
        <button disabled>disabled</button>
        <button selected>selected</button>
      </div>
    </section>
  `;
}