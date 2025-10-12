import { createId } from './string.js';

export function attachInternals(element: HTMLElement & { _internals?: ElementInternals }) {
  try {
    element._internals = element.attachInternals();
  } catch {
    return;
  }
}

export function associateAriaDescribedBy(element: HTMLElement, descriptions: HTMLElement[]) {
  element.setAttribute(
    'aria-describedby',
    descriptions
      .map(d => {
        d.id = d.id?.length ? d.id : createId();
        return d.id;
      })
      .join(' ')
  );
}

export function associateInputAndLabel(input: HTMLInputElement, label: HTMLLabelElement) {
  if (input && label) {
    input.id = input.id?.length ? input.id : createId();
    label.setAttribute('for', input.id);
    label.addEventListener('click', () => input.focus());
  }
}

export function associateInputToDatalist(input: HTMLInputElement, datalist: HTMLDataListElement) {
  if (datalist) {
    input.id = input.id?.length ? input.id : createId();
    datalist.id = `${input.id}-datalist`;
    input.setAttribute('list', datalist.id);
  }
}

export function associateAriaLabel(label: HTMLElement, element: HTMLElement) {
  if (label) {
    label.id = label.id?.length ? label.id : createId();
    element?.setAttribute('aria-labelledby', label.id);
  }
}

export function associateFieldNames(inputs: HTMLInputElement[]) {
  const name = createId();
  inputs.filter(i => !i.name && !i.getAttribute('name')).forEach(i => i.setAttribute('name', name));
}
