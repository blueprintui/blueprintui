export function valueMissing(element: any) {
  return (
    !element.matches(':disabled') &&
    (element.hasAttribute('required') || element.required) &&
    element.value !== null &&
    element.value !== undefined &&
    element.value?.length === 0
  );
}

export function tooShort(element: HTMLInputElement) {
  const min = !element.matches(':disabled') && element.hasAttribute('min');
  const minimum = parseFloat(element.getAttribute('min'));
  const value = element.type === 'number' ? parseInt(element.value) : element.value?.length;
  return min && value < minimum;
}

export function tooLong(element: HTMLInputElement) {
  const max = !element.matches(':disabled') && element.hasAttribute('max');
  const maximum = parseFloat(element.getAttribute('max'));
  const value = element.type === 'number' ? parseInt(element.value) : element.value?.length;
  return max && value > maximum;
}

export function patternMismatch(element: HTMLInputElement) {
  const pattern = !element.matches(':disabled') && element.hasAttribute('pattern');
  const regex = new RegExp(element.getAttribute('pattern'));
  return pattern && !regex.test(element.value);
}

// todo:
// interface ValidityState {
//   readonly badInput: boolean;
//   readonly rangeOverflow: boolean;
//   readonly rangeUnderflow: boolean;
//   readonly stepMismatch: boolean;
//   readonly typeMismatch: boolean;
// }
