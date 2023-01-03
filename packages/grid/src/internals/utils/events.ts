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
