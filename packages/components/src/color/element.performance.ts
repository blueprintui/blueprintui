import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/color.js';

describe('bp-color performance', () => {
  const element = html`
    <bp-field>
      <label>label</label>
      <bp-color></bp-color>
    </bp-field>
  `;

  it(`should bundle and treeshake under 18kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/color.js', { optimize: true })).kb).toBeLessThan(18);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
