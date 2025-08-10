import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/breadcrumb.js';

describe('bp-breadcrumb performance', () => {
  const element = html`
    <bp-breadcrumb aria-label="breadcrumb">
      <a bp-text="link" href="#">Home</a>
      <a bp-text="link" href="#">Parent page</a>
      <p bp-text="content" aria-current="page">Current page</p>
    </bp-breadcrumb>
  `;

  it(`should bundle and treeshake under 6.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/breadcrumb.js', { optimize: true })).kb).toBeLessThan(
      6.8
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
