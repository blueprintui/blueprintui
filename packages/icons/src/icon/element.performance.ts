import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/menu.js';
import { shapes } from '@blueprintui/icons/shapes/shapes.js';

describe('bp-icon performance', () => {
  const element = html`<bp-icon shape="menu"></bp-icon>`;

  it(`should bundle and treeshake component under 7kb`, async () => {
    expect((await testBundleSize('@blueprintui/icons/include.js', { optimize: true })).kb).toBeLessThan(7);
  });

  it(`should bundle load ${shapes.length} icons with a average of 0.2kb per icon totaling less than 78kb`, async () => {
    const bundle = await testBundleSize(shapes.map(s => `import '@blueprintui/icons/shapes/${s}.js'`, { optimize: true }).join(';'));
    expect(bundle.kb).toBeLessThan(78);
    expect(bundle.kb / shapes.length).toBeLessThan(0.2);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });

  it(`should render 50 elements under 30ms`, async () => {
    expect((await testRenderTime(element, { iterations: 50 })).duration).toBeLessThan(30);
  });
});
