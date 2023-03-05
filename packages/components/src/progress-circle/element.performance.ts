import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/progress-circle.js';

describe('bp-progress-circle performance', () => {
  const element = html` <bp-progress-circle value="75"></bp-progress-circle> `;

  it(`should bundle and treeshake under 8kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/progress-circle.js', { optimize: true })).kb
    ).toBeLessThan(8);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
