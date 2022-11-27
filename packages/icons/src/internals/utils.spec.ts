import { isNumericString } from './utils.js';

describe('isNumericString', () => {
  it('should determine if string is of number type', () => {
    expect(isNumericString('0')).toBe(true);
    expect(isNumericString('-1')).toBe(true);
    expect(isNumericString('123')).toBe(true);
    expect(isNumericString('123.456')).toBe(true);
    expect(isNumericString('')).toBe(false);
    expect(isNumericString('value')).toBe(false);
    expect(isNumericString(null)).toBe(false);
    expect(isNumericString(undefined)).toBe(false);
  });
});