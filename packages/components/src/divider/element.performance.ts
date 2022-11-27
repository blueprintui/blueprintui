import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/divider.js';

describe('bp-divider performance', () => {
  const element = html`
    <bp-divider></bp-divider>
  `;

  it(`should bundle and treeshake under 6.5kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/divider.js', { optimize: true })).kb).toBeLessThan(6.5);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
