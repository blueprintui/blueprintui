import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/tag.js';

describe('bp-tag performance', () => {
  const element = html`<bp-tag status="accent">tag</bp-tag>`;

  it(`should bundle and treeshake under 7.9kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/tag.js', { optimize: true })).kb).toBeLessThan(7.9);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
