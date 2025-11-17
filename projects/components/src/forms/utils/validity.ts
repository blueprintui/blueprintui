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
  const hasMinLength = !element.matches(':disabled') && element.hasAttribute('minlength');
  const minLength = parseInt(element.getAttribute('minlength'));
  return hasMinLength && element.value?.length > 0 && element.value.length < minLength;
}

export function tooLong(element: HTMLInputElement) {
  const hasMaxLength = !element.matches(':disabled') && element.hasAttribute('maxlength');
  const maxLength = parseInt(element.getAttribute('maxlength'));
  return hasMaxLength && element.value?.length > maxLength;
}

export function rangeUnderflow(element: HTMLInputElement) {
  const hasMin = !element.matches(':disabled') && element.hasAttribute('min');
  const min = parseFloat(element.getAttribute('min'));
  const value = parseFloat(element.value);
  return hasMin && !isNaN(value) && value < min;
}

export function rangeOverflow(element: HTMLInputElement) {
  const hasMax = !element.matches(':disabled') && element.hasAttribute('max');
  const max = parseFloat(element.getAttribute('max'));
  const value = parseFloat(element.value);
  return hasMax && !isNaN(value) && value > max;
}

export function stepMismatch(element: HTMLInputElement) {
  const hasStep = !element.matches(':disabled') && element.hasAttribute('step');
  const step = parseFloat(element.getAttribute('step'));
  const value = parseFloat(element.value);
  const min = element.hasAttribute('min') ? parseFloat(element.getAttribute('min')) : 0;

  if (!hasStep || isNaN(value) || isNaN(step) || step === 0) {
    return false;
  }

  const offset = value - min;
  return Math.abs(offset % step) > 0.000001; // Use small epsilon for floating point comparison
}

export function typeMismatch(element: HTMLInputElement) {
  if (element.matches(':disabled') || !element.value || element.value.length === 0) {
    return false;
  }

  switch (element.type) {
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(element.value);
    }
    case 'url': {
      try {
        new URL(element.value);
        return false;
      } catch {
        return true;
      }
    }
    default:
      return false;
  }
}

export function badInput(element: HTMLInputElement) {
  if (element.matches(':disabled')) {
    return false;
  }

  // badInput is typically set by the browser when it can't convert the input
  // For number inputs, check if value is non-empty but valueAsNumber is NaN
  if (element.type === 'number' && element.value !== '' && isNaN(element.valueAsNumber)) {
    return true;
  }

  return false;
}

export function patternMismatch(element: HTMLInputElement) {
  const pattern = !element.matches(':disabled') && element.hasAttribute('pattern');
  const regex = new RegExp(element.getAttribute('pattern'));
  return pattern && !regex.test(element.value);
}
