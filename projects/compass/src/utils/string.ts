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
