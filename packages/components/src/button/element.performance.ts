import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button.js';

describe('bp-button performance', () => {
  const element = html`<bp-button>hello</bp-button>`;

  it(`should bundle and treeshake button under 8.2kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/button.js', { optimize: true })).kb).toBeLessThan(
      8.2
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
