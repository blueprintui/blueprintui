import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/pin.js';

describe('bp-pin performance', () => {
  const element = html`
    <bp-field>
      <label>Verification Code</label>
      <bp-pin length="6"></bp-pin>
    </bp-field>
  `;

  it(`should bundle and treeshake under 18.3kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/pin.js', { optimize: true })).kb).toBeLessThan(18.3);
  });

  it(`should render under 25ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(25);
  });
});
