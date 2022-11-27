import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/user.js';

describe('bp-button-icon performance', () => {
  const element = html`<bp-button-icon shape="user"></bp-button-icon>`;

  it(`should bundle and treeshake under 9.6kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/button-icon.js', { optimize: true })).kb).toBeLessThan(9.6);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
