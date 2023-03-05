import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-expand.js';

describe('bp-button-expand performance', () => {
  const element = html`<bp-button-expand></bp-button-expand>`;

  it(`should bundle and treeshake under 11kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-expand.js', { optimize: true })).kb
    ).toBeLessThan(11);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
