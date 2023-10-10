import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/select.js';

describe('bp-search performance', () => {
  const element = html`
    <bp-select>
      <label>label</label>
      <select>
        <option>option one</option>
        <option>option two</option>
        <option>option three</option>
      </select>
    </bp-select>
  `;

  it(`should bundle and treeshake under 16.4kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/select.js', { optimize: true })).kb).toBeLessThan(
      16.4
    );
  });

  it(`should render under 25ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(25);
  });
});
