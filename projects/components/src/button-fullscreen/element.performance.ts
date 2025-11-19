import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-fullscreen.js';
import '@blueprintui/icons/shapes/fullscreen.js';
import '@blueprintui/icons/shapes/fullscreen-exit.js';

describe('bp-button-fullscreen performance', () => {
  const element = html`<bp-button-fullscreen aria-label="enter fullscreen"></bp-button-fullscreen>`;

  it(`should bundle and treeshake under 12kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-fullscreen.js', { optimize: true })).kb
    ).toBeLessThan(12);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
