import { contextMenuClick } from './dom.js';

describe('dom utils - contextMenuClick', () => {
  it('should determine if click was a context menu', () => {
    const mockContext = { buttons: 2, ctrlKey: false } as MouseEvent;
    expect(contextMenuClick(mockContext)).toEqual(true);
  });
});
