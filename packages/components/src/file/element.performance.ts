import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/file.js';

describe('bp-file performance', () => {
  const element = html`
    <bp-date>
      <label>label</label>
      <input type="file" />
    </bp-date>
  `;

  it(`should bundle and treeshake under 15.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/file.js', { optimize: true })).kb).toBeLessThan(15.8);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
