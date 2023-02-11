import { html } from 'lit';
import { testBundleSize, testRenderTime } from 'web-test-runner-performance/browser.js';

describe('bp-grid bundle performance', () => {
  it(`should bundle and treeshake pro column resize in under 8.3kb`, async () => {
    const result = await testBundleSize(`import '@blueprintui/grid-pro/include/column-resize.js'`);
    expect(result.kb).toBeLessThan(8.3);
  });

  it(`should bundle and treeshake pro range selection in under 10.8kb`, async () => {
    const result = await testBundleSize(`import '@blueprintui/grid-pro/include/range-selection.js'`);
    expect(result.kb).toBeLessThan(10.8);
  });
});

describe('bp-grid render performance', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('bp-theme', 'modern');
  });

  it('should render 100 rows under 150ms', async () => {
    const result = await testRenderTime(html` <bp-grid height="390">
      <bp-grid-column>Column 1</bp-grid-column>
      <bp-grid-column>Column 2</bp-grid-column>
      <bp-grid-column>Column 3</bp-grid-column>
      <bp-grid-column>Column 4</bp-grid-column>
      ${Array.from(Array(100).keys()).map(
        i => html` <bp-grid-row>
          <bp-grid-cell>${i}-1</bp-grid-cell>
          <bp-grid-cell>${i}-2</bp-grid-cell>
          <bp-grid-cell>${i}-3</bp-grid-cell>
          <bp-grid-cell>${i}-4</bp-grid-cell>
        </bp-grid-row>`
      )}
    </bp-grid>`);

    expect(result.duration).toBeLessThan(50);
  });

  it('should render 1000 rows under 1000ms', async () => {
    const result = await testRenderTime(html` <bp-grid height="390">
      <bp-grid-column>Column 1</bp-grid-column>
      <bp-grid-column>Column 2</bp-grid-column>
      <bp-grid-column>Column 3</bp-grid-column>
      <bp-grid-column>Column 4</bp-grid-column>
      ${Array.from(Array(1000).keys()).map(
        i => html`<bp-grid-row>
          <bp-grid-cell>${i}-1</bp-grid-cell>
          <bp-grid-cell>${i}-2</bp-grid-cell>
          <bp-grid-cell>${i}-3</bp-grid-cell>
          <bp-grid-cell>${i}-4</bp-grid-cell>
        </bp-grid-row>`
      )}
    </bp-grid>`);

    expect(result.duration).toBeLessThan(300);
  });
});
