import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-mute.js';

describe('bp-button-mute performance', () => {
  const element = html`<bp-button-mute></bp-button-mute>`;

  it(`should bundle and treeshake under 11.5kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-mute.js', { optimize: true })).kb
    ).toBeLessThan(11.5);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
