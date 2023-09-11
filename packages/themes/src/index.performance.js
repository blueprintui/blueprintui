import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it('should keep default theme tokens under 1.5kb', async () => {
    expect((await testBundleSize(`import '@blueprintui/themes/index.min.css'`, { optimize: true })).kb).toBeLessThan(
      1.5
    );
  });

  it('should keep dark theme tokens under 0.45kb', async () => {
    expect(
      (await testBundleSize(`import '@blueprintui/themes/dark/index.min.css'`, { optimize: true })).kb
    ).toBeLessThan(0.45);
  });

  it('should keep compact theme tokens under 0.15kb', async () => {
    expect(
      (await testBundleSize(`import '@blueprintui/themes/compact/index.min.css'`, { optimize: true })).kb
    ).toBeLessThan(0.15);
  });
});
