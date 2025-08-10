import {
  camelCaseToKebabCase,
  createId,
  isNumericString,
  getFromObjectPath,
  rgbToHex
} from '@blueprintui/components/internals';

describe('camelCaseToKebabCase', () => {
  it('should convert camel case strings to kebab case strings', () => {
    expect(camelCaseToKebabCase('camelCaseToKebabCase')).toBe('camel-case-to-kebab-case');
  });
});

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

describe('createId', () => {
  it('creates an guid', () => {
    expect(/[A-Za-z0-9]+/.test(createId().substring(1))).toBe(true);
  });

  it('shoudl default with a _ prefix', () => {
    // the _ prefix is helpful for dynamic classes/ids so the CSS selectors remain valid (selectors cannot start with a number)
    expect(createId().substring(0, 1)).toBe('_');
  });

  it('should prefix with given string', () => {
    expect(createId('PREFIX').substring(0, 6)).toBe('PREFIX');
  });
});

describe('getFromObjectPath', () => {
  it('gets an object from given path', () => {
    expect(getFromObjectPath('test.value', { test: { value: 'hello' } })).toBe('hello');
    expect(getFromObjectPath('test.value', { test: { value: null } })).toBe(null);
    expect(getFromObjectPath('test.value', { test: { value: 0 } })).toBe(0);
    expect(getFromObjectPath('test.value', { test: { value: '' } })).toBe('');
    expect(getFromObjectPath('test.value', { test: { value: false } })).toBe(false);
  });
});

describe('rgbToHex', () => {
  it('converts a given rgb value to hex', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
  });
});
