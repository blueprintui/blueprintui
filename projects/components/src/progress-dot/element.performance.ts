import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/progress-dot.js';

describe('progress-dot performance', () => {
  const element = html`<bp-progress-dot></bp-progress-dot>`;

  it(`should bundle and treeshake under 7.5kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/progress-dot.js', { optimize: true })).kb
    ).toBeLessThan(7.5);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
