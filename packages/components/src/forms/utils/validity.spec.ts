import { valueMissing, tooShort, tooLong, patternMismatch } from '@blueprintui/components/forms';

describe('valueMissing', () => {
  it('should determine if value is missing from given control', async () => {
    const input = document.createElement('input');
    expect(valueMissing(input)).toBe(false);

    input.required = true;
    expect(valueMissing(input)).toBe(true);

    input.value = 'test';
    expect(valueMissing(input)).toBe(false);
  });

  it('should determine if value is missing for various types', async () => {
    const input = document.createElement('input');
    input.required = true;

    input.value = '';
    expect(valueMissing(input)).toBe(true);

    input.value = null;
    expect(valueMissing(input)).toBe(true);

    input.value = 'test';
    expect(valueMissing(input)).toBe(false);
  });
});

describe('tooShort', () => {
  it('should determine if string value is too short from given control', async () => {
    const input = document.createElement('input');
    input.min = '3';
    expect(tooShort(input)).toBe(true);

    input.value = 'test';
    expect(tooShort(input)).toBe(false);
  });

  it('should determine if numeric value is too short from given control', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '3';
    expect(tooShort(input)).toBe(false);

    input.valueAsNumber = 4;
    expect(tooShort(input)).toBe(false);

    input.valueAsNumber = 2;
    expect(tooShort(input)).toBe(true);
  });
});

describe('tooLong', () => {
  it('should determine if string value is too long from given control', async () => {
    const input = document.createElement('input');
    input.max = '3';
    expect(tooLong(input)).toBe(false);

    input.value = '123';
    expect(tooLong(input)).toBe(false);

    input.value = '1234';
    expect(tooLong(input)).toBe(true);
  });

  it('should determine if numeric value is too large from given control', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.max = '3';
    expect(tooLong(input)).toBe(false);

    input.valueAsNumber = 3;
    expect(tooLong(input)).toBe(false);

    input.valueAsNumber = 4;
    expect(tooLong(input)).toBe(true);
  });
});

describe('patternMismatch', () => {
  it('should determine if input value does not match given pattern regex', async () => {
    const input = document.createElement('input');
    input.pattern = '[0-9]{3} [0-9]{3} [0-9]{4}';
    expect(patternMismatch(input)).toBe(true);

    input.value = '012 345 6789';
    expect(patternMismatch(input)).toBe(false);
  });
});
