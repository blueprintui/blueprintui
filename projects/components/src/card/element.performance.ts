import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/card.js';

describe('bp-card performance', () => {
  const element = html`
    <bp-card>
      <bp-card-header>header</bp-card-header>
      <p>content</p>
      <bp-card-footer>footer</bp-card-footer>
    </bp-card>
  `;

  it(`should bundle and treeshake under 6.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/card.js', { optimize: true })).kb).toBeLessThan(6.8);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
