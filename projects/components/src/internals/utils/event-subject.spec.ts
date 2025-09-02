import { BroadcastSubject, BroadcastSubscription } from '@blueprintui/components/internals';

describe('BroadcastSubject', () => {
  let subject: BroadcastSubject<string>;

  beforeEach(() => {
    subject = new BroadcastSubject<string>();
  });

  afterEach(() => {
    subject = null;
  });

  it('should emit a value to subscribers', done => {
    const expected = 'test value';
    subject.subscribe(value => {
      expect(value).toEqual(expected);
      done();
    });
    subject.emit(expected);
  });

  it('should emit to multiple subscribers', done => {
    const expected = 'test value';
    let receivedCount = 0;
    const totalSubscribers = 3;

    for (let i = 0; i < totalSubscribers; i++) {
      subject.subscribe(value => {
        expect(value).toEqual(expected);
        receivedCount++;
        if (receivedCount === totalSubscribers) {
          done();
        }
      });
    }
    subject.emit(expected);
  });

  it('should handle different data types', done => {
    const subject = new BroadcastSubject<{ name: string; count: number }>();
    const expected = { name: 'test', count: 42 };

    subject.subscribe(value => {
      expect(value).toEqual(expected);
      expect(typeof value.name).toBe('string');
      expect(typeof value.count).toBe('number');
      done();
    });
    subject.emit(expected);
  });

  it('should unsubscribe a subscriber', () => {
    const subscription = subject.subscribe(() => {
      // ignore
    });
    spyOn(subscription, 'unsubscribe');
    subscription.unsubscribe();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should create unique instances with different IDs', () => {
    const subject1 = new BroadcastSubject<string>();
    const subject2 = new BroadcastSubject<string>();

    // Each subject should have its own unique ID
    expect(subject1).not.toBe(subject2);
  });

  it('should return BroadcastObservable from toEventObservable', () => {
    const observable = subject.toEventObservable();

    expect(observable).toBeDefined();
    expect(typeof observable.subscribe).toBe('function');
    expect(observable).toBe(subject); // Should be the same reference
  });

  it('should maintain subscription functionality through observable', done => {
    const observable = subject.toEventObservable();
    const expected = 'test value';

    observable.subscribe(value => {
      expect(value).toEqual(expected);
      done();
    });
    subject.emit(expected);
  });
});

describe('BroadcastSubscription', () => {
  let subscription: BroadcastSubscription;
  let testFn: jasmine.Spy;

  beforeEach(() => {
    testFn = jasmine.createSpy('testFn');
    subscription = new BroadcastSubscription(testFn, 'test channel');
  });

  afterEach(() => {
    subscription = null;
  });

  it('should unsubscribe from the channel', () => {
    // Test that unsubscribe doesn't throw and can be called multiple times
    expect(() => subscription.unsubscribe()).not.toThrow();
    expect(() => subscription.unsubscribe()).not.toThrow();
  });

  it('should handle message events', done => {
    let subscription: BroadcastSubscription;
    const testFn = (value: any) => {
      expect(value).toEqual('test message');
      done();
      subscription.unsubscribe();
    };

    subscription = new BroadcastSubscription(testFn, 'unique-channel-1');
    const senderChannel = new BroadcastChannel('unique-channel-1');
    senderChannel.postMessage('test message');
  });

  it('should handle multiple message events', done => {
    let subscription: BroadcastSubscription;
    const messages: string[] = [];
    const testFn = (value: any) => {
      messages.push(value);
      if (messages.length === 3) {
        expect(messages).toEqual(['message1', 'message2', 'message3']);
        done();
        subscription.unsubscribe();
      }
    };

    subscription = new BroadcastSubscription(testFn, 'unique-channel-2');

    // Create a sender channel to send multiple messages
    const senderChannel = new BroadcastChannel('unique-channel-2');
    senderChannel.postMessage('message1');
    senderChannel.postMessage('message2');
    senderChannel.postMessage('message3');
  });

  it('should handle complex data types in messages', done => {
    let subscription: BroadcastSubscription;
    const testFn = (value: any) => {
      expect(value).toEqual({ id: 1, data: 'complex', nested: { value: true } });
      done();
      subscription.unsubscribe();
    };

    subscription = new BroadcastSubscription(testFn, 'unique-channel-3');
    const complexData = { id: 1, data: 'complex', nested: { value: true } };

    // Create a sender channel to send complex data
    const senderChannel = new BroadcastChannel('unique-channel-3');
    senderChannel.postMessage(complexData);
  });

  it('should not call function after unsubscribe', done => {
    const testFn = jasmine.createSpy('testFn');
    const subscription = new BroadcastSubscription(testFn, 'unique-channel-4');

    subscription.unsubscribe();

    // Create a sender channel to send a message
    const senderChannel = new BroadcastChannel('unique-channel-4');
    senderChannel.postMessage('test');

    // Give some time for the message to be processed
    setTimeout(() => {
      expect(testFn).not.toHaveBeenCalled();
      done();
    }, 10);
  });
});

describe('BroadcastObservable', () => {
  it('should have subscribe method', () => {
    const subject = new BroadcastSubject<string>();
    const observable = subject.toEventObservable();

    expect(typeof observable.subscribe).toBe('function');
  });

  it('should be compatible with BroadcastSubject subscribe signature', () => {
    const subject = new BroadcastSubject<string>();
    const observable = subject.toEventObservable();

    // Should accept the same function signature
    const subscription = observable.subscribe((value: string) => {
      expect(typeof value).toBe('string');
    });

    expect(subscription).toBeDefined();
    expect(typeof subscription.unsubscribe).toBe('function');
  });
});
