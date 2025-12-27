import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-play.js';

describe('bp-button-play performance', () => {
  const element = html`<bp-button-play></bp-button-play>`;

  it(`should bundle and treeshake under 11.5kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-play.js', { optimize: true })).kb
    ).toBeLessThan(11.5);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
