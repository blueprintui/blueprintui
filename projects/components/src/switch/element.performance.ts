import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/switch.js';

describe('bp-switch performance', () => {
  const element = html`
    <bp-switch>
      <label>label</label>
      <input type="checkbox" />
    </bp-switch>
  `;

  it(`should bundle and treeshake under 18kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/switch.js', { optimize: true })).kb).toBeLessThan(18);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
