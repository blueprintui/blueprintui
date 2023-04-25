import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/search.js';

describe('bp-search performance', () => {
  const element = html`
    <bp-search>
      <label>label</label>
      <input type="search" />
    </bp-search>
  `;

  it(`should bundle and treeshake under 15.6kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/search.js', { optimize: true })).kb).toBeLessThan(
      15.6
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
