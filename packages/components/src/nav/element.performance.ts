import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/home.js';

describe('bp-nav performance', () => {
  const element = html`
    <bp-nav expandable style="--height: 350px">
      <bp-nav-item href="#">
        <bp-icon shape="home"></bp-icon>
        item 1
      </bp-nav-item>
      <bp-nav-item href="#" selected>
        <bp-icon shape="home"></bp-icon>
        item 2
      </bp-nav-item>
      <bp-nav-item href="#">
        <bp-icon shape="home"></bp-icon>
        item 3
      </bp-nav-item>
    </bp-nav>
  `;

  it(`should bundle and treeshake under 11.9kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/nav.js', { optimize: true })).kb).toBeLessThan(11.9);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
