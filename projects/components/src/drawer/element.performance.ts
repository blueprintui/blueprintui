import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/drawer.js';

describe('bp-drawer performance', () => {
  // const element = html`<bp-drawer closable>hello there</bp-drawer>`;

  it(`should bundle and treeshake under 12.4kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/drawer.js', { optimize: true })).kb).toBeLessThan(
      12.4
    );
  });

  // disabled temporary due to dialog rendering over "element" preventing test from finishing
  // it(`should render under 20ms`, async () => {
  //   expect((await testRenderTime(element)).duration).toBeLessThan(2);
  // });
});
