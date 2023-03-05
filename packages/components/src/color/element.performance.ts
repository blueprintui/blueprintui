import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/color.js';

describe('bp-color performance', () => {
  const element = html`
    <bp-color>
      <label>color</label>
      <input type="color" />
    </bp-color>
  `;

  it(`should bundle and treeshake under 15.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/color.js', { optimize: true })).kb).toBeLessThan(
      15.8
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
