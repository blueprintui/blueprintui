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

  it('should handle removing a value that does not exist in the attribute', () => {
    const element = document.createElement('div');
    element.setAttribute('data-attr', 'foo');

    removeAttributeValue(element, 'data-attr', 'baz');
    expect(element.getAttribute('data-attr')).toBe('foo');
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

  it('should create the attribute if it does not exist', () => {
    const element = document.createElement('div');
    expect(element.getAttribute('data-attr')).toBeNull();

    addAttributeValue(element, 'data-attr', 'foo');
    expect(element.getAttribute('data-attr')).toBe('foo');
  });

  it('should not duplicate existing values', () => {
    const element = document.createElement('div');
    element.setAttribute('data-attr', 'foo');

    addAttributeValue(element, 'data-attr', 'foo');
    expect(element.getAttribute('data-attr')).toBe('foo');
  });

  it('should trim whitespace from the added value', () => {
    const element = document.createElement('div');
    addAttributeValue(element, 'data-attr', '  bar  ');
    expect(element.getAttribute('data-attr')).toBe('bar');
  });
});
