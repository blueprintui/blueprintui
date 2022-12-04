import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/month.js';

describe('bp-month performance', () => {
  const element = html`
    <bp-month>
      <label>label</label>
      <input type="month" />
    </bp-month>
  `;

  it(`should bundle and treeshake under 20.5kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/month.js', { optimize: true })).kb).toBeLessThan(20.5);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});