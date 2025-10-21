/**
 * Type-safe event dispatching utility for web components.
 *
 * This provides compile-time type safety for custom events while maintaining
 * the same event names at runtime.
 */

/**
 * Dispatches a strongly typed custom event from a host element.
 *
 * @template TEventMap - The event map interface defining available events
 * @param host - The element that will dispatch the event
 * @param type - The event name
 * @param detail - The event detail (optional, based on the event type)
 * @param options - Additional CustomEventInit options
 * @returns The dispatched event
 *
 * @example
 * // Define event map
 * interface MyEventMap {
 *   open: CustomEvent<void>;
 *   change: CustomEvent<{ value: string }>;
 * }
 *
 * // Dispatch typed events
 * dispatchTypedEvent<MyEventMap, 'open'>(this, 'open');
 * dispatchTypedEvent<MyEventMap, 'change'>(this, 'change', { value: 'test' });
 */
export function dispatchTypedEvent<
  TEventMap extends Record<string, Event>,
  K extends keyof TEventMap = keyof TEventMap
>(
  host: HTMLElement,
  type: K,
  detail?: TEventMap[K] extends CustomEvent<infer D> ? D : never,
  options: Omit<CustomEventInit, 'detail'> = {}
): TEventMap[K] {
  const event = new CustomEvent(type as string, {
    bubbles: true,
    composed: true,
    ...options,
    detail
  }) as unknown as TEventMap[K];

  host.dispatchEvent(event);
  return event;
}

/**
 * Type definition for adding strongly typed addEventListener to components.
 *
 * Components should use declaration merging to add type-safe event listeners:
 *
 * @example
 * export interface BpDialog {
 *   addEventListener<K extends keyof BpDialogEventMap>(
 *     type: K,
 *     listener: (this: BpDialog, ev: BpDialogEventMap[K]) => any,
 *     options?: boolean | AddEventListenerOptions
 *   ): void;
 *   addEventListener(
 *     type: string,
 *     listener: EventListenerOrEventListenerObject,
 *     options?: boolean | AddEventListenerOptions
 *   ): void;
 * }
 */
export type TypedEventTarget<TEventMap extends Record<string, Event>> = {
  addEventListener<K extends keyof TEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: TEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof TEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: TEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
};
