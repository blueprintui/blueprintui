
export function isNumericString(val: string): boolean {
  return (typeof val === 'string') && (val.trim() !== '') && +val === +val;
}

export function createId(prefix = '_') {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}

export function isObject(val: any) {
  return val?.constructor === Object;
}

export function mergeObjects(...objs: object[]): object {
  const clone: any = {};
  objs.map(o => isObject(o) ? { ...o } : {}).forEach((obj: any) => {
    Object.keys(obj).forEach(prop => {
      const propVal = obj[prop];

      if (Array.isArray(propVal)) {
        clone[prop] = Array.from(propVal);
      } else if (isObject(propVal)) {
        clone[prop] = mergeObjects(clone[prop] || {}, propVal);
      } else {
        clone[prop] = propVal;
      }
    });
  });

  return clone;
}
