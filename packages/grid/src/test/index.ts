import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { createVisualFixture } from '@blueprintui/components/test';

export async function createGridVisualFixture(
  template: string,
  config?: { theme?: string; width?: string; height?: string }
) {
  const fixture = await createVisualFixture(
    html`
      <style>
        bp-grid {
          --row-content-visibility: visible;
        }
      </style>
      ${unsafeHTML(template)}
    `,
    config
  );
  return fixture;
}