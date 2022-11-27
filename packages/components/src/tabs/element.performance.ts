import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/tabs.js';

describe('bp-tabs performance', () => {
  const element = html`
    <bp-tabs>
      <bp-tab-list aria-label="example tablist">
        <bp-tab selected>tab one</bp-tab>
        <bp-tab>tab two</bp-tab>
        <bp-tab>tab three</bp-tab>
      </bp-tab-list>
      <bp-tab-panel>panel one</bp-tab-panel>
      <bp-tab-panel>panel two</bp-tab-panel>
      <bp-tab-panel>panel three</bp-tab-panel>
    </bp-tabs>
  `;

  it(`should bundle and treeshake under 8.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/tabs.js', { optimize: true })).kb).toBeLessThan(8.8);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
