import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-group.js';

describe('bp-button-group performance', () => {
  const element = html`
    <bp-button-group>
      <bp-button>item</bp-button>
      <bp-button>item</bp-button>
      <bp-button>item</bp-button>
    </bp-button-group>
  `;

  it(`should bundle and treeshake under 8kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-group.js', { optimize: true })).kb
    ).toBeLessThan(8);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
