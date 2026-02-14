import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/number.js';

describe('bp-number performance', () => {
  const element = html`
    <bp-field>
      <label>quantity</label>
      <bp-number value="10" min="0" max="100"></bp-number>
    </bp-field>
  `;

  it(`should bundle and treeshake under 18.1kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/number.js', { optimize: true })).kb).toBeLessThan(
      18.1
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
