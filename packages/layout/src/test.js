import { html } from 'lit';

export const styles = html`
  <style>
    [bp-layout] > div:not([bp-layout~='inline']):not([bp-layout~='block']):not([bp-layout~='grid']) {
      background: var(--bp-layer-background-200);
      min-width: 60px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    [demo] {
      border: 1px solid var(--bp-object-border-color-200);
    }

    hr {
      border-color: var(--bp-text-color-500);
    }
  </style>
`;
