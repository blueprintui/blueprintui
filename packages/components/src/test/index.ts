import { TemplateResult, render } from 'lit';

export function createFixture(template?: TemplateResult): Promise<HTMLElement> {
  const element = document.createElement('div');
  document.body.appendChild(element);

  if (template) {
    render(template, element);
  }

  return Promise.all(
    Array.from(document.querySelectorAll(':not(:defined)')).map(el => customElements.whenDefined(el.tagName))
  ).then(() => element);
}

export function removeFixture(element: HTMLElement) {
  element.remove();
}

function retry(fn: any, maxTries = 10) {
  return fn().catch(() => (maxTries > 0 ? retry(fn, maxTries--) : Promise.reject()));
}

export function elementIsStable(component: any) {
  return retry(() => (component.updateComplete ? Promise.resolve('') : Promise.reject()));
}

export function nextRepaint() {
  return new Promise(r => requestAnimationFrame(() => r('')));
}

export function emulateClick(component: HTMLElement | Element) {
  const event1 = new MouseEvent('mousedown');
  const event2 = new MouseEvent('mouseup');
  const event3 = new MouseEvent('click');
  component.dispatchEvent(event1);
  component.dispatchEvent(event2);
  component.dispatchEvent(event3);
}

/** helpful for capturing a single event in a async test */
export function onceEvent(element: HTMLElement | Document, event: string) {
  return new Promise<any>(resolve => element.addEventListener(event, e => resolve(e)));
}
