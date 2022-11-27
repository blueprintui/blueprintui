import { IconService } from '@blueprintui/icons';

const testIcon = {
  name: 'test',
  shape: {
    default: '<path d="M19.41,18l8.29-8.29a1,1,0,0,0-1.41-1.41L18,16.59,9.71,8.29A1,1,0,0,0,8.29,9.71L16.59,18,8.29,26.29a1,1,0,1,0,1.41,1.41L18,19.41l8.29,8.29a1,1,0,0,0,1.41-1.41Z"/>',
  }
};

describe('icon service: ', () => {
  it('should add icons to the registry using icon shapes', () => {
    IconService.add(testIcon);
    expect(IconService.registry.test).toEqual(testIcon);
  });
});
