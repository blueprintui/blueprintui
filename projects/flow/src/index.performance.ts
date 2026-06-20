import '@blueprintui/flow/include/core.js';

describe('flow performance', () => {
  it('should have bundle size under limit', async () => {
    const size = await import('@blueprintui/test').then(m =>
      m.testBundleSize(import.meta.url, { components: ['bp-flow'] })
    );
    expect(size).toBeLessThan(50000); // 50kb limit
  });
});
