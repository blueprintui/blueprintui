import { getMonths, getYearSelection } from '@blueprintui/components/internals';

describe('getMonths', () => {
  it('should return month formatted strings', () => {
    expect(getMonths()).toEqual(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
  });
});


describe('getYearSelection', () => {
  it('should return the next decade of years from given year', () => {
    expect(getYearSelection(2000)).toEqual([1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008]);
  });
});
