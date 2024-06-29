import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/input.js';

describe('bp-input performance', () => {
  const element = html`
    <bp-field>
      <label>label</label>
      <bp-input></bp-input>
    </bp-field>
  `;

  it(`should bundle and treeshake under 16.6kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/input.js', { optimize: true })).kb).toBeLessThan(
      16.6
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
