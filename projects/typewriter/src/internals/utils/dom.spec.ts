import { contextMenuClick } from './dom.js';

describe('dom utils - contextMenuClick', () => {
  it('should detect right click without ctrl as context menu', () => {
    expect(contextMenuClick({ buttons: 2, ctrlKey: false } as MouseEvent)).toBe(true);
  });

  it('should detect ctrl+left click as context menu (macOS)', () => {
    expect(contextMenuClick({ buttons: 1, ctrlKey: true } as MouseEvent)).toBe(true);
  });

  it('should not detect right click with ctrl as context menu', () => {
    expect(contextMenuClick({ buttons: 2, ctrlKey: true } as MouseEvent)).toBe(false);
  });

  it('should not detect regular left click as context menu', () => {
    expect(contextMenuClick({ buttons: 1, ctrlKey: false } as MouseEvent)).toBe(false);
  });

  it('should not detect no-button event as context menu', () => {
    expect(contextMenuClick({ buttons: 0, ctrlKey: false } as MouseEvent)).toBe(false);
  });
});
