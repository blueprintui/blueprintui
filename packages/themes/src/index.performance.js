import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it('should keep default theme tokens under 1.2kb', async () => {
    expect((await testBundleSize(`import '@blueprintui/themes/index.min.css'`, { optimize: true })).kb).toBeLessThan(1.2);
  });

  it('should keep dark theme tokens under 0.4kb', async () => {
    expect((await testBundleSize(`import '@blueprintui/themes/dark/index.min.css'`, { optimize: true })).kb).toBeLessThan(0.4);
  });

  it('should keep compact theme tokens under 0.1kb', async () => {
    expect((await testBundleSize(`import '@blueprintui/themes/compact/index.min.css'`, { optimize: true })).kb).toBeLessThan(0.1);
  });

  it('should keep modern theme tokens under 0.78kb', async () => {
    expect((await testBundleSize(`import '@blueprintui/themes/modern/index.min.css'`, { optimize: true })).kb).toBeLessThan(0.78);
  });

  it('should keep modern theme tokens under 0.4kb', async () => {
    expect((await testBundleSize(`import '@blueprintui/themes/modern-dark/index.min.css'`, { optimize: true })).kb).toBeLessThan(0.4);
  });
});
