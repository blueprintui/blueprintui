import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/tooltip.js';

describe('bp-tooltip performance', () => {
  // const element = html`<bp-tooltip>hello there</bp-tooltip>`;

  it(`should bundle and treeshake under 16.5kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/tooltip.js', { optimize: true })).kb).toBeLessThan(
      16.5
    );
  });

  // disabled temporary due to dialog rendering over "element" preventing test from finishing
  // it(`should render under 20ms`, async () => {
  //   expect((await testRenderTime(element)).duration).toBeLessThan(2);
  // });
});
