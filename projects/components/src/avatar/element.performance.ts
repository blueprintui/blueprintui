import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/avatar.js';

describe('bp-avatar performance', () => {
  const element = html`<bp-avatar aria-label="User">JD</bp-avatar>`;

  it(`should bundle and treeshake under 8.5kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/avatar.js', { optimize: true })).kb).toBeLessThan(
      8.5
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
