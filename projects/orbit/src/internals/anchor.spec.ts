import { setupCSSAnchor, getPositionArea } from './anchor.js';

describe('anchor utilities', () => {
  describe('setupCSSAnchor', () => {
    it('should set up CSS anchor positioning', () => {
      const anchor = document.createElement('div');
      const target = document.createElement('div');

      const anchorName = setupCSSAnchor(anchor, target);

      expect(anchor.style.anchorName).toBe(anchorName);
      expect(target.style.positionAnchor).toBe(anchorName);
      expect(anchorName).toMatch(/^--_[a-z0-9]{7}$/);
    });

    it('should reuse existing anchor name', () => {
      const anchor = document.createElement('div');
      const target1 = document.createElement('div');
      const target2 = document.createElement('div');

      const anchorName1 = setupCSSAnchor(anchor, target1);
      const anchorName2 = setupCSSAnchor(anchor, target2);

      expect(anchorName1).toBe(anchorName2);
    });
  });

  describe('getPositionArea', () => {
    it('should return correct position area for center', () => {
      expect(getPositionArea('center')).toBe('center');
    });

    it('should return correct position area for top', () => {
      expect(getPositionArea('top')).toBe('top center');
    });

    it('should return correct position area for bottom-start', () => {
      expect(getPositionArea('bottom-start')).toBe('bottom span-right');
    });

    it('should return correct position area for bottom-end', () => {
      expect(getPositionArea('bottom-end')).toBe('bottom span-left');
    });

    it('should return default for unknown position', () => {
      expect(getPositionArea('invalid' as any)).toBe('bottom center');
    });
  });
});
