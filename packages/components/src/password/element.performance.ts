import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/password.js';

describe('bp-password performance', () => {
  const element = html`
    <bp-password>
      <label>label</label>
      <input type="password" />
    </bp-password>
  `;

  it(`should bundle and treeshake under 15.5kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/password.js', { optimize: true })).kb).toBeLessThan(15.5);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
