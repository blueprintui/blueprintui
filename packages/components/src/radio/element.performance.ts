import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/radio.js';

describe('bp-radio performance', () => {
  const element = html`
    <bp-fieldset>
      <label>label</label>

      <label>radio 1</label>
      <bp-radio value="1" checked></bp-radio>

      <label>radio 2</label>
      <bp-radio value="2"></bp-radio>
    </bp-fieldset>
  `;

  it(`should bundle and treeshake under 15.1kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/radio.js', { optimize: true })).kb).toBeLessThan(
      15.1
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
