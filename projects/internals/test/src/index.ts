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

export async function createVisualFixture(
  template?: TemplateResult,
  config?: { theme?: string; width?: string; height?: string }
): Promise<HTMLElement> {
  const defaultConfig = { theme: '', width: 'initial', height: 'initial' };
  config = { ...defaultConfig, ...config };

  document.documentElement.setAttribute('bp-theme', config.theme);
  document.documentElement.style.setProperty('--bp-text-font', 'Helvetica');
  document.body.setAttribute('bp-text', 'body');

  const style = document.createElement('style');
  style.innerHTML = `* { text-rendering: geometricprecision !important; }`;
  document.head.appendChild(style);

  const element = await createFixture(template);
  element.setAttribute('bp-layout', 'block gap:lg');
  element.setAttribute('style', `padding: 12px; width: ${config.width}; height: ${config.height};`);
  return element;
}

export function removeFixture(element: HTMLElement) {
  element.remove();
}

function retry(fn: any, maxTries = 10) {
  return fn().catch(() => (maxTries > 0 ? retry(fn, maxTries - 1) : Promise.reject()));
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
