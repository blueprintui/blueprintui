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

  it('should unsubscribe a subscriber', () => {
    const subscription = subject.subscribe(() => {
      // ignore
    });
    spyOn(subscription, 'unsubscribe');
    subscription.unsubscribe();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});

describe('BroadcastSubscription', () => {
  let subscription: BroadcastSubscription;

  beforeEach(() => {
    subscription = new BroadcastSubscription(() => {
      // ignore
    }, 'test channel');
  });

  afterEach(() => {
    subscription = null;
  });

  it('should unsubscribe from the channel', () => {
    subscription.unsubscribe();
    expect(subscription).toBeTruthy(); // todo: test that the channel is closed
  });
});
