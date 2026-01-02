import { enableScrollLock, disableScrollLock } from './scroll-lock.js';

describe('scroll-lock', () => {
  afterEach(() => {
    disableScrollLock();
    document.documentElement.style.scrollbarGutter = '';
  });

  it('should enable scroll lock', () => {
    enableScrollLock();
    expect(document.documentElement.style.scrollbarGutter).toBe('stable');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should disable scroll lock', () => {
    enableScrollLock();
    disableScrollLock();
    expect(document.body.style.overflow).toBe('');
  });
});
