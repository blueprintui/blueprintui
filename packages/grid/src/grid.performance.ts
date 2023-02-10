import { html } from 'lit';
import { testBundleSize, testRenderTime } from 'web-test-runner-performance/browser.js';

describe('bp-grid bundle performance', () => {
  it(`should bundle and treeshake core in under 14.4kb`, async () => {
    const result = await testBundleSize(`import '@blueprintui/grid/include/core.js'`);
    expect(result.kb).toBeLessThan(14.4);
  });

  it(`should bundle and treeshake footer in under 6.3kb`, async () => {
    const result = await testBundleSize(`import '@blueprintui/grid/include/footer.js'`);
    expect(result.kb).toBeLessThan(6.3);
  });

  it(`should bundle and treeshake pagination in under 16.6kb`, async () => {
    const result = await testBundleSize(`import '@blueprintui/grid/include/pagination.js'`);
    expect(result.kb).toBeLessThan(16.6);
  });

  it(`should bundle and treeshake placeholder in under 8.1kb`, async () => {
    const result = await testBundleSize(`import '@blueprintui/grid/include/placeholder.js'`);
    expect(result.kb).toBeLessThan(8.1);
  });

  it(`should bundle and treeshake keynav in under 11.1kb`, async () => {
    const result = await testBundleSize(`import '@blueprintui/grid/include/keynav.js'`);
    expect(result.kb).toBeLessThan(11.1);
  });

  it(`should bundle all under 22.5kb`, async () => {
    const result = await testBundleSize(`
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid/include/pagination.js';
      import '@blueprintui/grid/include/placeholder.js';
    `);
    expect(result.kb).toBeLessThan(22.5);
  });
});

describe('bp-grid render performance', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('bp-theme', 'modern');
  });

  it('should render 100 rows under 150ms', async () => {
    const result = await testRenderTime(html`
    <bp-grid height="390">
      <bp-grid-column>Column 1</bp-grid-column>
      <bp-grid-column>Column 2</bp-grid-column>
      <bp-grid-column>Column 3</bp-grid-column>
      <bp-grid-column>Column 4</bp-grid-column>
      ${Array.from(Array(100).keys()).map(i => html`
        <bp-grid-row>
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
