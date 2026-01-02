import { createCustomEvent } from './events.js';

describe('createCustomEvent', () => {
  it('should create a custom event', () => {
    const event = createCustomEvent('test');
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.type).toBe('test');
  });

  it('should create event with bubbles and composed by default', () => {
    const event = createCustomEvent('test');
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('should create event with detail', () => {
    const detail = { foo: 'bar' };
    const event = createCustomEvent('test', { detail });
    expect(event.detail).toEqual(detail);
  });

  it('should merge custom options', () => {
    const event = createCustomEvent('test', { cancelable: true });
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
    expect(event.cancelable).toBe(true);
  });
});
