export function isObject(val: any) {
  return val?.constructor === Object;
}

export function mergeObjects(...objs: object[]): object {
  const clone: any = {};
  objs
    .map(o => (isObject(o) ? { ...o } : {}))
    .forEach((obj: any) => {
      Object.keys(obj).forEach(prop => {
        const propVal = obj[prop];

        if (Array.isArray(propVal)) {
          const initial = Array.isArray(clone[prop]) ? clone[prop] : [];
          clone[prop] = [...initial, ...Array.from(propVal)];
        } else if (isObject(propVal)) {
          clone[prop] = mergeObjects(clone[prop] || {}, propVal);
        } else {
          clone[prop] = propVal;
        }
      });
    });

  return clone;
}
