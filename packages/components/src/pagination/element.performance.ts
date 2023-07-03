import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/pagination.js';

describe('bp-pagination performance', () => {
  const element = html`
    <bp-pagination aria-label="pagination">
      <bp-button-icon slot="prev"></bp-button-icon>
      <bp-button-icon slot="next"></bp-button-icon>
    </bp-pagination>
  `;

  it(`should bundle and treeshake under 17.2kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/pagination.js', { optimize: true })).kb).toBeLessThan(
      17.2
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
