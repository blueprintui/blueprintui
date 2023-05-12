import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { createVisualFixture } from '@blueprintui/test';

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
    { width: '1024px', height: '768px', ...config }
  );
  return fixture;
}
