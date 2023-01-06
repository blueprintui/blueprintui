import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/toast.js';

describe('bp-toast performance', () => {
  // const element = html`<bp-toast status="accent">toast</bp-toast>`;

  it(`should bundle and treeshake under 17kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/toast.js', { optimize: true })).kb).toBeLessThan(17);
  });

  // disabled temporary due to dialog rendering over "element" preventing test from finishing
  // it(`should render under 20ms`, async () => {
  //   expect((await testRenderTime(element)).duration).toBeLessThan(20);
  // });
});
