import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/textarea.js';

describe('bp-textarea performance', () => {
  const element = html`
    <bp-textarea>
      <label>label</label>
      <textarea></textarea>
    </bp-textarea>
  `;

  it(`should bundle and treeshake under 16.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/textarea.js', { optimize: true })).kb).toBeLessThan(
      16.8
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
