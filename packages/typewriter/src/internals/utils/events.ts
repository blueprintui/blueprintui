
export function onChildListMutation(element: HTMLElement, fn: (mutation?: MutationRecord) => void) {
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        fn(mutation);
      }
    }
  });
  observer.observe(element, { childList: true });
  return observer;
}

export function onFirstInteraction(element: HTMLElement): Promise<null> {
  return new Promise(resolve => {
    const update = () => {
      resolve(null);
      (element as any).__bpTouched = true;
    };

    if ((element as any).__bpTouched) {
      resolve(null);
    }

    element.addEventListener('pointerdown', update, { once: true, passive: true }); // prevent SRs like NVDA from anouncing "clickable" https://github.com/nvaccess/nvda/issues/5830
    element.addEventListener('mouseover', update, { once: true, passive: true });
    element.addEventListener('keydown', update, { once: true, passive: true });
    element.addEventListener('focus', update, { once: true, passive: true });
  });
}
