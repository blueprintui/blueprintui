export function createCustomEvent<T>(name: string, options: CustomEventInit = {}) {
  return new CustomEvent<T>(name, { bubbles: true, composed: true, ...options });
}
