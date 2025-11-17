import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/telephone.js';

describe('bp-telephone performance', () => {
  const element = html`
    <bp-field>
      <label>Phone Number</label>
      <bp-telephone></bp-telephone>
    </bp-field>
  `;

  it(`should bundle and treeshake under 17.3kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/telephone.js', { optimize: true })).kb).toBeLessThan(
      17.3
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
