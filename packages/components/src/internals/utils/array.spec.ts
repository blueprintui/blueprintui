import { group } from '@blueprintui/components/internals';

describe('array utils', () => {
  it('should group items within array', () => {
    expect(group([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
  });
});
