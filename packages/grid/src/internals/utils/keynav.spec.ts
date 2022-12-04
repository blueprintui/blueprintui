import { KeyNavigationCode, validKeyNavigationCode } from '@blueprintui/components/internals';

describe('validKeyNavigationCode(): ', () => {
  it('should validate key code is valid navigation option', () => {
    expect(validKeyNavigationCode({ code: 'invalid' } as KeyboardEvent)).toBe(false);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.Home } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.End } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.PageUp } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.PageDown } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.ArrowUp } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.ArrowDown } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.ArrowLeft } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyNavigationCode.ArrowRight } as KeyboardEvent)).toBe(true);
  });
});