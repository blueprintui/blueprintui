import { getElementLanguageDirection, matchInterpolate } from '@blueprintui/components/internals';

describe('dynamicInterpolate()', () => {
  it('should apply dynamic property values to template tag literal', () => {
    const value = { prefix: 'one', suffix: 'two' };
    expect(matchInterpolate('prefix ${prefix} middle ${suffix} suffix', value)).toBe('prefix one middle two suffix');
  });

  it('should apply nested dynamic property values to template tag literal', () => {
    const value = { nested: { prefix: 'one', suffix: 'two'} };
    expect(matchInterpolate('prefix ${nested.prefix} middle ${nested.suffix} suffix', value)).toBe('prefix one middle two suffix');
  });
});

describe('getElementLanguageDirection()', () => {
  it('should get the language direction of a given element', () => {
    expect(getElementLanguageDirection(document.body)).toBe('ltr');
  });
});
