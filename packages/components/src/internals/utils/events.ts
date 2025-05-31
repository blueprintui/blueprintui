export function createCustomEvent<T>(name: string, options: CustomEventInit = {}) {
  return new CustomEvent<T>(name, { bubbles: true, composed: true, ...options });
}

export async function eventWasDefaultPrevented(event: Event) {
  await Promise.resolve();
  return event?.defaultPrevented;
}

export function stopEvent(event: any) {
  event?.preventDefault();
  event?.stopPropagation();
}

export function onKeys(events: string[], event: KeyboardEvent, fn: () => any) {
  if (events.find(e => e === event.code)) {
    fn();
  }
}

export const getElementUpdates = (
  element: HTMLElement,
  propertyKey: string,
  fn: (value: any) => void
): MutationObserver => {
  if (element.hasAttribute(propertyKey)) {
    fn(element.getAttribute(propertyKey));
  } else if ((element as any)[propertyKey] !== undefined) {
    fn((element as any)[propertyKey]);
  }

  const updatedProp = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), propertyKey) as any;

  if (updatedProp) {
    try {
      Object.defineProperty(element, propertyKey, {
        get: updatedProp.get,
        set: val => {
          fn(val);
          updatedProp.set.call(element, val);
        }
      });
    } catch {
      return null;
    }
  }

  return listenForAttributeChange(element, propertyKey, val => fn(val));
};

export function listenForAttributeChange(
  element: HTMLElement,
  attrName: string,
  fn: (attrValue: string | null) => void
) {
  const observer = new MutationObserver(mutations => {
    if (mutations.find(m => m.attributeName === attrName)) {
      fn(element.getAttribute(attrName));
    }
  });

  observer.observe(element, { attributes: true });
  return observer;
}

export function listenForAttributeListChange(
  element: HTMLElement,
  attrNames: string[],
  fn: (mutation: MutationRecord) => void
): MutationObserver {
  const observer = new MutationObserver(mutations => {
    const mutation = mutations.find(m => attrNames.find(i => m.attributeName === i));
    if (mutation) {
      fn(mutation);
    }
  });

  observer.observe(element, { attributes: true, attributeFilter: attrNames, subtree: true });
  return observer;
}

export type TouchedElement = HTMLElement & { __bpTouched?: boolean };

export function onFirstInteraction(element: HTMLElement): Promise<null> {
  return new Promise(resolve => {
    const update = () => {
      resolve(null);
      (element as TouchedElement).__bpTouched = true;
    };

    if ((element as TouchedElement).__bpTouched) {
      resolve(null);
    }

    element.addEventListener('pointerdown', update, { once: true, passive: true }); // prevent SRs like NVDA from anouncing "clickable" https://github.com/nvaccess/nvda/issues/5830
    element.addEventListener('mouseover', update, { once: true, passive: true });
    element.addEventListener('keydown', update, { once: true, passive: true });
    element.addEventListener('focus', update, { once: true, passive: true });
  });
}
