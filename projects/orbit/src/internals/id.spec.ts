import { createId } from './id.js';

describe('createId', () => {
  it('should create a unique ID with default prefix', () => {
    const id = createId();
    expect(id).toMatch(/^_[a-z0-9]{7}$/);
  });

  it('should create a unique ID with custom prefix', () => {
    const id = createId('test-');
    expect(id).toMatch(/^test-[a-z0-9]{7}$/);
  });

  it('should create different IDs on each call', () => {
    const id1 = createId();
    const id2 = createId();
    expect(id1).not.toBe(id2);
  });
});
