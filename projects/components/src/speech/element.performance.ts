import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/speech.js';

describe('bp-speech performance', () => {
  const element = html`<bp-speech></bp-speech>`;

  it(`should bundle and treeshake under 12kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/speech.js', { optimize: true })).kb).toBeLessThan(12);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
