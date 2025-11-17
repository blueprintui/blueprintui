import {
  badInput,
  patternMismatch,
  rangeOverflow,
  rangeUnderflow,
  stepMismatch,
  tooLong,
  tooShort,
  typeMismatch,
  valueMissing
} from '@blueprintui/components/forms';

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
    input.minLength = 5;
    input.value = 'abc';
    expect(tooShort(input)).toBe(true);

    input.value = 'test value';
    expect(tooShort(input)).toBe(false);
  });

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.minLength = 5;
    input.disabled = true;
    input.value = 'ab';

    expect(tooShort(input)).toBe(false);
  });

  it('should return false for elements without minlength attribute', async () => {
    const input = document.createElement('input');
    input.value = 'ab';

    expect(tooShort(input)).toBe(false);
  });

  it('should return false for empty values', async () => {
    const input = document.createElement('input');
    input.minLength = 5;
    input.value = '';

    expect(tooShort(input)).toBe(false);
  });

  it('should handle exact minlength match', async () => {
    const input = document.createElement('input');
    input.minLength = 5;
    input.value = '12345';

    expect(tooShort(input)).toBe(false);
  });
});

describe('tooLong', () => {
  it('should determine if string value is too long from given control', async () => {
    const input = document.createElement('input');
    input.maxLength = 5;
    expect(tooLong(input)).toBe(false);

    input.value = '123';
    expect(tooLong(input)).toBe(false);

    input.value = '123456';
    expect(tooLong(input)).toBe(true);
  });

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.maxLength = 5;
    input.disabled = true;
    input.value = '123456';

    expect(tooLong(input)).toBe(false);
  });

  it('should return false for elements without maxlength attribute', async () => {
    const input = document.createElement('input');
    input.value = '1234';

    expect(tooLong(input)).toBe(false);
  });

  it('should handle empty values correctly', async () => {
    const input = document.createElement('input');
    input.maxLength = 5;
    input.value = '';

    expect(tooLong(input)).toBe(false);
  });

  it('should handle exact maxlength match', async () => {
    const input = document.createElement('input');
    input.maxLength = 5;
    input.value = '12345';

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

describe('rangeUnderflow', () => {
  it('should determine if numeric value is below minimum', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '5';

    input.valueAsNumber = 3;
    expect(rangeUnderflow(input)).toBe(true);

    input.valueAsNumber = 5;
    expect(rangeUnderflow(input)).toBe(false);

    input.valueAsNumber = 7;
    expect(rangeUnderflow(input)).toBe(false);
  });

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '5';
    input.disabled = true;
    input.valueAsNumber = 3;

    expect(rangeUnderflow(input)).toBe(false);
  });

  it('should return false for elements without min attribute', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.valueAsNumber = 3;

    expect(rangeUnderflow(input)).toBe(false);
  });

  it('should return false for empty values', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '5';
    input.value = '';

    expect(rangeUnderflow(input)).toBe(false);
  });

  it('should handle decimal values', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '5.5';

    input.valueAsNumber = 5.4;
    expect(rangeUnderflow(input)).toBe(true);

    input.valueAsNumber = 5.5;
    expect(rangeUnderflow(input)).toBe(false);
  });
});

describe('rangeOverflow', () => {
  it('should determine if numeric value exceeds maximum', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.max = '10';

    input.valueAsNumber = 15;
    expect(rangeOverflow(input)).toBe(true);

    input.valueAsNumber = 10;
    expect(rangeOverflow(input)).toBe(false);

    input.valueAsNumber = 5;
    expect(rangeOverflow(input)).toBe(false);
  });

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.max = '10';
    input.disabled = true;
    input.valueAsNumber = 15;

    expect(rangeOverflow(input)).toBe(false);
  });

  it('should return false for elements without max attribute', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.valueAsNumber = 15;

    expect(rangeOverflow(input)).toBe(false);
  });

  it('should return false for empty values', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.max = '10';
    input.value = '';

    expect(rangeOverflow(input)).toBe(false);
  });

  it('should handle decimal values', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.max = '10.5';

    input.valueAsNumber = 10.6;
    expect(rangeOverflow(input)).toBe(true);

    input.valueAsNumber = 10.5;
    expect(rangeOverflow(input)).toBe(false);
  });
});

describe('stepMismatch', () => {
  it('should determine if value does not match step increment', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '5';

    input.valueAsNumber = 5;
    expect(stepMismatch(input)).toBe(false);

    input.valueAsNumber = 10;
    expect(stepMismatch(input)).toBe(false);

    input.valueAsNumber = 3;
    expect(stepMismatch(input)).toBe(true);
  });

  it('should use min as base for step calculation', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '2';
    input.step = '5';

    input.valueAsNumber = 2;
    expect(stepMismatch(input)).toBe(false);

    input.valueAsNumber = 7;
    expect(stepMismatch(input)).toBe(false);

    input.valueAsNumber = 12;
    expect(stepMismatch(input)).toBe(false);

    input.valueAsNumber = 5;
    expect(stepMismatch(input)).toBe(true);
  });

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '5';
    input.disabled = true;
    input.valueAsNumber = 3;

    expect(stepMismatch(input)).toBe(false);
  });

  it('should return false for elements without step attribute', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.valueAsNumber = 3;

    expect(stepMismatch(input)).toBe(false);
  });

  it('should return false for empty values', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '5';
    input.value = '';

    expect(stepMismatch(input)).toBe(false);
  });

  it('should handle decimal steps', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '0.5';

    input.valueAsNumber = 0.5;
    expect(stepMismatch(input)).toBe(false);

    input.valueAsNumber = 1.0;
    expect(stepMismatch(input)).toBe(false);

    input.valueAsNumber = 0.3;
    expect(stepMismatch(input)).toBe(true);
  });

  it('should return false for step of 0', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '0';
    input.valueAsNumber = 5;

    expect(stepMismatch(input)).toBe(false);
  });
});

describe('typeMismatch', () => {
  it('should validate email type inputs', async () => {
    const input = document.createElement('input');
    input.type = 'email';

    input.value = 'invalid-email';
    expect(typeMismatch(input)).toBe(true);

    input.value = 'test@example.com';
    expect(typeMismatch(input)).toBe(false);

    input.value = 'user@domain.co.uk';
    expect(typeMismatch(input)).toBe(false);
  });

  it('should validate url type inputs', async () => {
    const input = document.createElement('input');
    input.type = 'url';

    input.value = 'not-a-url';
    expect(typeMismatch(input)).toBe(true);

    input.value = 'https://example.com';
    expect(typeMismatch(input)).toBe(false);

    input.value = 'http://test.org/path';
    expect(typeMismatch(input)).toBe(false);
  });

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.type = 'email';
    input.disabled = true;
    input.value = 'invalid-email';

    expect(typeMismatch(input)).toBe(false);
  });

  it('should return false for empty values', async () => {
    const input = document.createElement('input');
    input.type = 'email';
    input.value = '';

    expect(typeMismatch(input)).toBe(false);
  });

  it('should return false for non-validatable types', async () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'any value';

    expect(typeMismatch(input)).toBe(false);
  });

  it('should handle edge cases in email validation', async () => {
    const input = document.createElement('input');
    input.type = 'email';

    input.value = '@example.com';
    expect(typeMismatch(input)).toBe(true);

    input.value = 'user@';
    expect(typeMismatch(input)).toBe(true);

    input.value = 'user@domain';
    expect(typeMismatch(input)).toBe(true);
  });
});

describe('badInput', () => {
  it('should detect bad input in number fields', async () => {
    const input = document.createElement('input');
    input.type = 'number';

    // Simulate browser behavior where value exists but valueAsNumber is NaN
    Object.defineProperty(input, 'value', { value: 'abc', writable: true, configurable: true });
    Object.defineProperty(input, 'valueAsNumber', { value: NaN, writable: true, configurable: true });

    expect(badInput(input)).toBe(true);
  });

  it('should return false for valid numeric input', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.valueAsNumber = 123;

    expect(badInput(input)).toBe(false);
  });

  it('should return false for empty number input', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.value = '';

    expect(badInput(input)).toBe(false);
  });

  it('should return false for disabled elements', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.disabled = true;

    Object.defineProperty(input, 'value', { value: 'abc', writable: true, configurable: true });
    Object.defineProperty(input, 'valueAsNumber', { value: NaN, writable: true, configurable: true });

    expect(badInput(input)).toBe(false);
  });

  it('should return false for non-number inputs', async () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'abc';

    expect(badInput(input)).toBe(false);
  });
});
