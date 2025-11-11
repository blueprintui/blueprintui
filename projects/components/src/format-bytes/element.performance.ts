import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/format-bytes.js';

describe('bp-format-bytes performance', () => {
  const element = html`<bp-format-bytes></bp-format-bytes>`;

  it(`should bundle and treeshake under 7kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/format-bytes.js', { optimize: true })).kb
    ).toBeLessThan(7);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
