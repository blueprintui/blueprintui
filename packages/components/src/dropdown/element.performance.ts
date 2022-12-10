import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/dropdown.js';

describe('bp-dropdown performance', () => {
  // const element = html`<bp-dropdown>hello there</bp-dropdown>`;

  it(`should bundle and treeshake under 15.7kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/dropdown.js', { optimize: true })).kb).toBeLessThan(15.7);
  });

  // disabled temporary due to dialog rendering over "element" preventing test from finishing
  // it(`should render under 20ms`, async () => {
  //   expect((await testRenderTime(element)).duration).toBeLessThan(2);
  // });
});
