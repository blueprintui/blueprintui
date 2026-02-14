import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/password.js';

describe('bp-password performance', () => {
  const element = html`
    <bp-field>
      <label>label</label>
      <bp-password></bp-password>
    </bp-field>
  `;

  it(`should bundle and treeshake under 19kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/password.js', { optimize: true })).kb).toBeLessThan(
      19
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
