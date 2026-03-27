import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/range-time.js';

describe('bp-range-time performance', () => {
  const element = html`<bp-range-time value="30" max="120" aria-label="video progress"></bp-range-time>`;

  it(`should bundle and treeshake under 17kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/range-time.js', { optimize: true })).kb).toBeLessThan(
      17
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
