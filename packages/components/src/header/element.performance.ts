import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/header.js';

describe('bp-header performance', () => {
  const element = html`
    <bp-header>
      <bp-header-item>header</bp-header-item>
      <bp-header-item bp-layout="align:right">item</bp-header-item>
      <bp-header-item>item</bp-header-item>
    </bp-header>
  `;

  it(`should bundle and treeshake under 7.9kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/header.js', { optimize: true })).kb).toBeLessThan(
      7.9
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
