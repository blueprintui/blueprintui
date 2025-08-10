import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/time.js';

describe('bp-time performance', () => {
  const element = html`
    <bp-time>
      <label>label</label>
      <input type="time" />
    </bp-time>
  `;

  it(`should bundle and treeshake under 22.1kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/time.js', { optimize: true })).kb).toBeLessThan(22.1);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
