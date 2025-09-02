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

  it('should return false for disabled elements regardless of required state', async () => {
    const input = document.createElement('input');
    input.required = true;
    input.disabled = true;

    expect(valueMissing(input)).toBe(false);

    input.value = '';
    expect(valueMissing(input)).toBe(false);
  });

  it('should handle required attribute vs property', async () => {
    const input = document.createElement('input');

    // Test with required attribute
    input.setAttribute('required', '');
    expect(valueMissing(input)).toBe(true);

    // Test with required property
    input.removeAttribute('required');
    input.required = true;
    expect(valueMissing(input)).toBe(true);
  });

  it('should handle undefined and null values correctly', async () => {
    const input = document.createElement('input');
    input.required = true;

    input.value = undefined;
    expect(valueMissing(input)).toBe(false);

    input.value = null;
    expect(valueMissing(input)).toBe(true);

    input.value = '';
    expect(valueMissing(input)).toBe(true);
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

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.min = '3';
    input.disabled = true;
    input.value = 'ab';

    expect(tooShort(input)).toBe(false);
  });

  it('should return false for elements without min attribute', async () => {
    const input = document.createElement('input');
    input.value = 'ab';

    expect(tooShort(input)).toBe(false);
  });

  it('should handle empty values correctly', async () => {
    const input = document.createElement('input');
    input.min = '3';
    input.value = '';

    expect(tooShort(input)).toBe(true);
  });

  it('should handle numeric input with empty value', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '3';
    input.value = '';

    expect(tooShort(input)).toBe(false);
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

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.max = '3';
    input.disabled = true;
    input.value = '1234';

    expect(tooLong(input)).toBe(false);
  });

  it('should return false for elements without max attribute', async () => {
    const input = document.createElement('input');
    input.value = '1234';

    expect(tooLong(input)).toBe(false);
  });

  it('should handle empty values correctly', async () => {
    const input = document.createElement('input');
    input.max = '3';
    input.value = '';

    expect(tooLong(input)).toBe(false);
  });

  it('should handle numeric input with empty value', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.max = '3';
    input.value = '';

    expect(tooLong(input)).toBe(false);
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

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.pattern = '[0-9]{3}';
    input.disabled = true;
    input.value = 'abc';

    expect(patternMismatch(input)).toBe(false);
  });

  it('should return false for elements without pattern attribute', async () => {
    const input = document.createElement('input');
    input.value = 'abc';

    expect(patternMismatch(input)).toBe(false);
  });

  it('should handle empty values correctly', async () => {
    const input = document.createElement('input');
    input.pattern = '[0-9]+';
    input.value = '';

    expect(patternMismatch(input)).toBe(true);
  });

  it('should handle various regex patterns', async () => {
    const input = document.createElement('input');

    // Email pattern
    input.pattern = '[a-z]+@[a-z]+\\.[a-z]+';
    input.value = 'test@example.com';
    expect(patternMismatch(input)).toBe(false);

    input.value = 'invalid-email';
    expect(patternMismatch(input)).toBe(true);

    // Simple numeric pattern
    input.pattern = '[0-9]{4}';
    input.value = '1234';
    expect(patternMismatch(input)).toBe(false);

    input.value = '123';
    expect(patternMismatch(input)).toBe(true);
  });
});
