export function createId(prefix = '_') {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}
