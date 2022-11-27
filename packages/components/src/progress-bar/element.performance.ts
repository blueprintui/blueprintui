import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/progress-bar.js';

describe('bp-progress-bar performance', () => {
  const element = html`
    <bp-progress-bar value="75"></bp-progress-bar>
  `;

  it(`should bundle and treeshake under 7kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/progress-bar.js', { optimize: true })).kb).toBeLessThan(7);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
