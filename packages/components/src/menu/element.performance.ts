import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/menu.js';

describe('bp-menu performance', () => {
  const element = html`
    <bp-menu>
      <bp-menu-item>menu item</bp-menu-item>
      <bp-menu-item selected>item selected</bp-menu-item>
      <bp-menu-item disabled>item disabled</bp-menu-item>
      <bp-menu-item>menu item</bp-menu-item>
    </bp-menu>
  `;

  it(`should bundle and treeshake under 9.3kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/menu.js', { optimize: true })).kb).toBeLessThan(9.3);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
