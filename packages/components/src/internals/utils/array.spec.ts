import { group, selectionStates } from '@blueprintui/components/internals';

describe('group', () => {
  it('should group items within array', () => {
    expect(group([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6]
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

  it('determine if any items in list are selected', () => {
    const items = [{ selected: false }, { selected: false }, { selected: false }];
    expect(selectionStates(items).allSelected).toEqual(false);
    expect(selectionStates(items).anySelected).toEqual(false);
    expect(selectionStates(items).noneSelected).toEqual(true);
  });
});
