import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/format-datetime.js';

describe('bp-format-datetime performance', () => {
  const element = html`<bp-format-datetime></bp-format-datetime>`;

  it(`should bundle and treeshake under 7kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/format-datetime.js', { optimize: true })).kb
    ).toBeLessThan(7);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
