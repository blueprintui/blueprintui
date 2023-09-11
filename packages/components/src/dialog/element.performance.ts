import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/dialog.js';

describe('bp-dialog performance', () => {
  // const element = html`<bp-dialog closable>hello there</bp-dialog>`;

  it(`should bundle and treeshake under 14kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/dialog.js', { optimize: true })).kb).toBeLessThan(14);
  });

  // disabled temporary due to dialog rendering over "element" preventing test from finishing
  // it(`should render under 20ms`, async () => {
  //   expect((await testRenderTime(element)).duration).toBeLessThan(2);
  // });
});
