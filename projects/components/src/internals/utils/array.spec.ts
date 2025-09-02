import { group, selectionStates } from '@blueprintui/components/internals';

describe('group', () => {
  it('should group items within array', () => {
    expect(group([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6]
    ]);
  });

  it('should handle empty array', () => {
    expect(group([], 2)).toEqual([]);
  });

  it('should handle array with odd number of elements', () => {
    expect(group([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should handle group size larger than array length', () => {
    expect(group([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it('should handle group size of 1', () => {
    expect(group([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('should handle group size of 0', () => {
    expect(() => group([1, 2, 3], 0)).toThrow();
  });

  it('should handle negative group size', () => {
    expect(() => group([1, 2, 3], -1)).toThrow();
  });

  it('should handle different data types in array', () => {
    expect(group(['a', 1, true, null, undefined, {}], 2)).toEqual([
      ['a', 1],
      [true, null],
      [undefined, {}]
    ]);
  });
});

describe('selectionStates', () => {
  it('determine if all items in list are selected', () => {
    const items = [{ selected: true }, { selected: true }, { selected: true }];
    expect(selectionStates(items).allSelected).toEqual(true);
    expect(selectionStates(items).anySelected).toEqual(true);
    expect(selectionStates(items).noneSelected).toEqual(false);
  });

  it('determine if any items in list are selected', () => {
    const items = [{ selected: false }, { selected: true }, { selected: true }];
    expect(selectionStates(items).allSelected).toEqual(false);
    expect(selectionStates(items).anySelected).toEqual(true);
    expect(selectionStates(items).noneSelected).toEqual(false);
  });

  it('determine if no items in list are selected', () => {
    const items = [{ selected: false }, { selected: false }, { selected: false }];
    expect(selectionStates(items).allSelected).toEqual(false);
    expect(selectionStates(items).anySelected).toEqual(false);
    expect(selectionStates(items).noneSelected).toEqual(true);
  });

  it('should handle empty array', () => {
    const items: { selected: boolean }[] = [];
    expect(selectionStates(items).allSelected).toEqual(true);
    expect(selectionStates(items).anySelected).toEqual(false);
    expect(selectionStates(items).noneSelected).toEqual(true);
  });

  it('should handle single item array', () => {
    const selectedItem = [{ selected: true }];
    expect(selectionStates(selectedItem).allSelected).toEqual(true);
    expect(selectionStates(selectedItem).anySelected).toEqual(true);
    expect(selectionStates(selectedItem).noneSelected).toEqual(false);

    const unselectedItem = [{ selected: false }];
    expect(selectionStates(unselectedItem).allSelected).toEqual(false);
    expect(selectionStates(unselectedItem).anySelected).toEqual(false);
    expect(selectionStates(unselectedItem).noneSelected).toEqual(true);
  });

  it('should handle large array', () => {
    const largeArray = Array.from({ length: 100 }, (_, i) => ({ selected: i % 2 === 0 }));
    const states = selectionStates(largeArray);
    expect(states.allSelected).toEqual(false);
    expect(states.anySelected).toEqual(true);
    expect(states.noneSelected).toEqual(false);
  });
});
