import { getOffesetDifference } from '@blueprintui/components/internals';

describe('getOffsetDifference', () => {
  it('should return the difference of two positive numbers', () => {
    expect(getOffesetDifference(15, 5)).toBe(-10);
    expect(getOffesetDifference(5, 15)).toBe(10);
  });

  it('should return the difference of two negative numbers', () => {
    expect(getOffesetDifference(-15, -5)).toBe(10);
    expect(getOffesetDifference(-5, -15)).toBe(-10);
  });

  it('should return the difference negative and positive numbers', () => {
    expect(getOffesetDifference(-5, 15)).toBe(20);
    expect(getOffesetDifference(-15, 5)).toBe(20);
    expect(getOffesetDifference(15, -5)).toBe(-20);
    expect(getOffesetDifference(5, -15)).toBe(-20);
  });
});
