import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/range.js';

describe('bp-range performance', () => {
  const element = html`
    <bp-range>
      <label>label</label>
      <input type="range" />
    </bp-range>
  `;

  it(`should bundle and treeshake under 16.2kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/range.js', { optimize: true })).kb).toBeLessThan(
      16.2
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
