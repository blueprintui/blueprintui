import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/input.js';

describe('bp-input performance', () => {
  const element = html`
    <bp-input>
      <label>label</label>
      <input type="text" />
    </bp-input>
  `;

  it(`should bundle and treeshake under 15.2kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/input.js', { optimize: true })).kb).toBeLessThan(
      15.2
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
