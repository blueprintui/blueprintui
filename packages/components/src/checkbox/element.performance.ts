import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/checkbox.js';

describe('bp-checkbox performance', () => {
  const element = html`
    <bp-field>
      <label>checkbox</label>
      <bp-checkbox></bp-checkbox>
      <bp-field-message>message text</bp-field-message>
    </bp-field>
  `;

  it(`should bundle and treeshake under 15.7kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/checkbox.js', { optimize: true })).kb).toBeLessThan(
      15.7
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
