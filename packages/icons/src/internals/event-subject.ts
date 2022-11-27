import { createId } from './utils.js';

export class BroadcastSubscription {
  #channel: BroadcastChannel;
  constructor(public fn: (value: any) => void, channelId: string) {
    this.#channel = new BroadcastChannel(channelId);
    this.#channel.addEventListener('message', e => fn(e.data));
  }

  unsubscribe() {
    this.#channel.close();
  }
}

export class BroadcastSubject<T> {
  #id = createId();
  #channel: BroadcastChannel;

  constructor() {
    this.#channel = new BroadcastChannel(this.#id);
  }

  subscribe(fn: (value: T) => void) {
    return new BroadcastSubscription(fn, this.#id);
  }

  emit(value: T) {
    this.#channel.postMessage(value);
  }

  toEventObservable() {
    return (this as unknown) as BroadcastObservable<T>;
  }
}

export interface BroadcastObservable<T> extends Pick<BroadcastSubject<T>, 'subscribe'> {} // eslint-disable-line @typescript-eslint/no-empty-interface
