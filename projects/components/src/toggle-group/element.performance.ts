import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/toggle-group.js';

describe('bp-toggle-group performance', () => {
  const element = html`
    <bp-field>
      <label>Time frame</label>
      <bp-toggle-group name="timeframe" value="day">
        <bp-toggle-group-option value="day" checked>Day</bp-toggle-group-option>
        <bp-toggle-group-option value="week">Week</bp-toggle-group-option>
        <bp-toggle-group-option value="month">Month</bp-toggle-group-option>
      </bp-toggle-group>
    </bp-field>
  `;

  it(`should bundle and treeshake under 17kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/toggle-group.js', { optimize: true })).kb
    ).toBeLessThan(17);
  });

  it(`should render under 25ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(25);
  });
});
