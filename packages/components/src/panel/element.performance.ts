import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/panel.js';

describe('bp-panel performance', () => {
  const element = html`<bp-panel>panel</bp-panel>`;

  it(`should bundle and treeshake under 7kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/panel.js', { optimize: true })).kb).toBeLessThan(7);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(0.1);
  });
});
