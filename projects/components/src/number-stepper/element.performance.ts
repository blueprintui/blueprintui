import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/number-stepper.js';

describe('bp-number-stepper performance', () => {
  const element = html`
    <bp-field>
      <label>Quantity</label>
      <bp-number-stepper value="5" min="0" max="10"></bp-number-stepper>
    </bp-field>
  `;

  it(`should bundle and treeshake under 18kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/number-stepper.js', { optimize: true })).kb
    ).toBeLessThan(18);
  });

  it(`should render under 25ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(25);
  });
});
