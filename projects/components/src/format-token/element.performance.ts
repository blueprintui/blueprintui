import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/format-token.js';

describe('bp-format-token performance', () => {
  const element = html`<bp-format-token>hello world</bp-format-token>`;

  it(`should bundle and treeshake under 8kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/format-token.js', { optimize: true })).kb
    ).toBeLessThan(8);
  });

  it(`should render under 30ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(30);
  });
});
