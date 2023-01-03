import { KeyCode, validKeyNavigationCode } from './keynav.js';

describe('validKeyNavigationCode(): ', () => {
  it('should validate key code is valid navigation option', () => {
    expect(validKeyNavigationCode({ code: 'invalid' } as KeyboardEvent)).toBe(false);
    expect(validKeyNavigationCode({ code: KeyCode.Home } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.End } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.PageUp } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.PageDown } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowUp } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowDown } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowLeft } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowRight } as KeyboardEvent)).toBe(true);
  });
});
