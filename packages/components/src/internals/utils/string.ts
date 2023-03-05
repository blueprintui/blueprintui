export function camelCaseToKebabCase(value: string) {
  return value.replace(/[A-Z]/g, l => `-${l.toLowerCase()}`);
}

export function isNumericString(val: string): boolean {
  return typeof val === 'string' && val.trim() !== '' && +val === +val;
}

export function createId(prefix = '_') {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}

export function getFromObjectPath(path: string, dataObj: any, fallback = `$\{${path}}`) {
  return path.split('.').reduce((res, key) => {
    try {
      const value = res[key];
      if (value === null || value === false || value === '' || value === 0) {
        return value;
      } else {
        return value || fallback;
      }
    } catch {
      return fallback;
    }
  }, dataObj);
}

export function rgbToHex(red: number, green: number, blue: number) {
  let r = red.toString(16);
  let g = green.toString(16);
  let b = blue.toString(16);

  if (r.length === 1) {
    r = '0' + r;
  }

  if (g.length === 1) {
    g = '0' + g;
  }

  if (b.length === 1) {
    b = '0' + b;
  }

  return `#${r}${g}${b}`;
}
