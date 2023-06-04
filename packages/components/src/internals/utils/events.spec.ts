import {
  stopEvent,
  onKeys,
  listenForAttributeChange,
  onFirstInteraction,
  listenForAttributeListChange
} from '@blueprintui/components/internals';

describe('stopEvent', () => {
  it('should prevent default and stop propagation of the event', () => {
    const event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    };

    stopEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should not throw an error if event is undefined', () => {
    expect(() => stopEvent(undefined)).not.toThrow();
  });
});

describe('onKeys', () => {
  it('should call the provided function if the event code matches any of the provided events', () => {
    const events = ['KeyA', 'KeyB', 'KeyC'];
    const eventA = new KeyboardEvent('keydown', { code: 'KeyA' });
    const eventB = new KeyboardEvent('keydown', { code: 'KeyB' });
    const eventC = new KeyboardEvent('keydown', { code: 'KeyC' });
    const fn = jasmine.createSpy('fn');

    onKeys(events, eventA, fn);
    onKeys(events, eventB, fn);
    onKeys(events, eventC, fn);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should not call the provided function if the event code does not match any of the provided events', () => {
    const events = ['KeyA', 'KeyB', 'KeyC'];
    const eventD = new KeyboardEvent('keydown', { code: 'KeyD' });
    const fn = jasmine.createSpy('fn');

    onKeys(events, eventD, fn);

    expect(fn).not.toHaveBeenCalled();
  });
});

describe('listenForAttributeListChange', () => {
  let element: HTMLElement;
  let observer: MutationObserver;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    observer.disconnect();
    document.body.removeChild(element);
  });

  it('should call the callback when an attribute in the list changes', async () => {
    const callback = jasmine.createSpy('callback');
    observer = listenForAttributeListChange(element, ['class', 'data-foo'], callback);

    element.setAttribute('class', 'foo');
    await new Promise(resolve => setTimeout(resolve, 0)); // observers are async
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(jasmine.any(MutationRecord));

    element.setAttribute('data-foo', 'bar');
    await new Promise(resolve => setTimeout(resolve, 0)); // observers are async
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(jasmine.any(MutationRecord));

    element.setAttribute('data-baz', 'qux');
    await new Promise(resolve => setTimeout(resolve, 0)); // observers are async
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('onFirstInteraction', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it('should resolve the promise when the element is interacted with', async () => {
    const promise = onFirstInteraction(element);
    element.dispatchEvent(new Event('touchstart'));
    await expectAsync(promise).toBeResolved();
  });

  it('should resolve the promise only once', async () => {
    const promise = onFirstInteraction(element);
    element.dispatchEvent(new Event('touchstart'));
    element.dispatchEvent(new Event('mouseover'));
    element.dispatchEvent(new Event('keydown'));
    element.dispatchEvent(new Event('focus'));
    await expectAsync(promise).toBeResolved();
  });
});

describe('listenForAttributeChange', () => {
  let element: HTMLElement;
  let observer: MutationObserver;

  beforeEach(() => {
    element = document.createElement('div');
    observer = listenForAttributeChange(element, 'data-test', () => {
      // ignore
    });
  });

  afterEach(() => {
    observer.disconnect();
  });

  it('should call the callback when the attribute changes', async () => {
    const callback = jasmine.createSpy('callback');
    observer = listenForAttributeChange(element, 'data-test', callback);

    element.setAttribute('data-test', 'new value');
    await new Promise(resolve => setTimeout(resolve, 0)); // observers are async

    expect(callback).toHaveBeenCalledWith('new value');
  });

  it('should not call the callback when a different attribute changes', () => {
    const callback = jasmine.createSpy('callback');
    observer = listenForAttributeChange(element, 'data-test', callback);

    element.setAttribute('class', 'new-class');

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call the callback when the attribute is removed', () => {
    const callback = jasmine.createSpy('callback');
    observer = listenForAttributeChange(element, 'data-test', callback);

    element.removeAttribute('data-test');

    expect(callback).not.toHaveBeenCalled();
  });
});
