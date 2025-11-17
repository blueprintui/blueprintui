import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/format-relative-time.js';

describe('bp-format-relative-time performance', () => {
  const element = html`<bp-format-relative-time>2024-11-16T10:00:00Z</bp-format-relative-time>`;

  it(`should bundle and treeshake under 8kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/format-relative-time.js', { optimize: true })).kb
    ).toBeLessThan(8);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
