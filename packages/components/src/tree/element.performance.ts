import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/tree.js';

describe('bp-tree performance', () => {
  const element = html`<bp-tree>
    <bp-tree-item>item</bp-tree-item>
    <bp-tree-item>item</bp-tree-item>
    <bp-tree-item>item</bp-tree-item>
  </bp-tree>`;

  it(`should bundle and treeshake under 18.1kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/tree.js', { optimize: true })).kb).toBeLessThan(18.1);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
