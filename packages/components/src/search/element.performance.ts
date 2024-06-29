import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/search.js';

describe('bp-search performance', () => {
  const element = html`
    <bp-field>
      <label>label</label>
      <bp-search></bp-search>
    </bp-field>
  `;

  it(`should bundle and treeshake under 16.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/search.js', { optimize: true })).kb).toBeLessThan(
      16.8
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
