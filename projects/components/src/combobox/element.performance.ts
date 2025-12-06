import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/combobox.js';

describe('bp-combobox performance', () => {
  const element = html`
    <bp-field>
      <label>label</label>
      <bp-combobox>
        <bp-option value="1">Option One</bp-option>
        <bp-option value="2">Option Two</bp-option>
        <bp-option value="3">Option Three</bp-option>
      </bp-combobox>
    </bp-field>
  `;

  it(`should bundle and treeshake under 20kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/combobox.js', { optimize: true })).kb).toBeLessThan(
      20
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
