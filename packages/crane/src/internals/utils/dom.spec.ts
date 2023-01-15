import { removeAttributeValue, addAttributeValue } from './dom.js';

describe('removeAttributeValue', () => {
  it('should remove a given value of an attribute', async () => {
    const element = document.createElement('div');
    element.setAttribute('data-attr', 'foo bar');
    expect(element.getAttribute('data-attr')).toBe('foo bar');

    removeAttributeValue(element, 'data-attr', 'foo');
    expect(element.getAttribute('data-attr')).toBe('bar');
  });

  it('should remove attribute if no value', async () => {
    const element = document.createElement('div');
    element.setAttribute('data-attr', 'foo bar');
    expect(element.getAttribute('data-attr')).toBe('foo bar');

    removeAttributeValue(element, 'data-attr', 'foo');
    expect(element.getAttribute('data-attr')).toBe('bar');

    removeAttributeValue(element, 'data-attr', 'bar');
    expect(element.getAttribute('data-attr')).toBe(null);
  });
});

describe('addAttributeValue', () => {
  it('should add a given value to an attribute', async () => {
    const element = document.createElement('div');
    element.setAttribute('data-attr', 'foo');
    expect(element.getAttribute('data-attr')).toBe('foo');

    addAttributeValue(element, 'data-attr', 'bar');
    expect(element.getAttribute('data-attr')).toBe('foo bar');
  });
});
