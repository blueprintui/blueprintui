import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/accordion.js';

describe('bp-accordion performance', () => {
  const element = html` <bp-accordion>
    <bp-accordion-panel>
      <bp-accordion-header>Expanded accordion panel</bp-accordion-header>
      <bp-accordion-content>
        <p bp-text="content">Expanded accordion content</p>
      </bp-accordion-content>
    </bp-accordion-panel>
    <bp-accordion-panel>
      <bp-accordion-header expanded>Disabled accordion header</bp-accordion-header>
      <bp-accordion-content>
        <p bp-text="content">Disabled accordion content</p>
      </bp-accordion-content>
    </bp-accordion-panel>
  </bp-accordion>`;

  it(`should bundle and treeshake under 11.7kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/accordion.js', { optimize: true })).kb).toBeLessThan(
      11.7
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
