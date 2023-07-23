import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/stepper.js';

describe('bp-stepper performance', () => {
  const element = html`
    <bp-stepper aria-label="stepper">
      <a bp-text="link" href="#">Home</a>
      <a bp-text="link" href="#">Parent page</a>
      <p bp-text="content" aria-current="page">Current page</p>
    </bp-stepper>
  `;

  it(`should bundle and treeshake under 9.8kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/stepper.js', { optimize: true })).kb).toBeLessThan(
      69.8
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
