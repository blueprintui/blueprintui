import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-resize.js';

describe('bp-button-resize performance', () => {
  // const element = html`<bp-button-resize></bp-button-resize>`;

  it(`should bundle and treeshake under 9.8kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-resize.js', { optimize: true })).kb
    ).toBeLessThan(9.8);
  });

  // it(`should render under 20ms`, async () => {
  //   expect((await testRenderTime(element)).duration).toBeLessThan(20);
  // });
});
