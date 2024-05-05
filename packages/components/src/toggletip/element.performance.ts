import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/toggletip.js';

describe('bp-toggletip performance', () => {
  // const element = html`<bp-toggletip>hello there</bp-toggletip>`;

  it(`should bundle and treeshake under 12kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/toggletip.js', { optimize: true })).kb).toBeLessThan(
      12
    );
  });

  // disabled temporary due to dialog rendering over "element" preventing test from finishing
  // it(`should render under 20ms`, async () => {
  //   expect((await testRenderTime(element)).duration).toBeLessThan(2);
  // });
});
