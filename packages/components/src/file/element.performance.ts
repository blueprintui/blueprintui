import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/file.js';

describe('bp-file performance', () => {
  const element = html`
    <bp-field>
      <label>label</label>
      <bp-date></bp-date>
    </bp-field>
  `;

  it(`should bundle and treeshake under 16.9kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/file.js', { optimize: true })).kb).toBeLessThan(16.9);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
