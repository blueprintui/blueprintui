import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/alert.js';

describe('bp-alert performance', () => {
  const element = html`<bp-alert>hello there</bp-alert>`;

  it(`should bundle and treeshake under 12.5kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/alert.js', { optimize: true })).kb).toBeLessThan(
      12.5
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});

describe('bp-alert-group performance', () => {
  const element = html`
    <bp-alert-group>
      <bp-alert>hello there</bp-alert>
      <bp-alert>hello there</bp-alert>
    </bp-alert-group>
  `;

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
