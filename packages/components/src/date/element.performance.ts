import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/date.js';

describe('bp-date performance', () => {
  const element = html`
    <bp-date>
      <label>label</label>
      <input type="date" />
    </bp-date>
  `;

  it(`should bundle and treeshake under 20.2kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/date.js', { optimize: true })).kb).toBeLessThan(20.2);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
