export function enableScrollLock(): void {
  document.documentElement.style.scrollbarGutter = 'stable';
  document.body.style.overflow = 'hidden';
}

export function disableScrollLock(): void {
  document.body.style.overflow = '';
}
