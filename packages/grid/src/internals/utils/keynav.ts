export function validKeyNavigationCode(e: KeyboardEvent) {
  return (
    e.code === KeyNavigationCode.ArrowUp ||
    e.code === KeyNavigationCode.ArrowDown ||
    e.code === KeyNavigationCode.ArrowLeft ||
    e.code === KeyNavigationCode.ArrowRight ||
    e.code === KeyNavigationCode.End ||
    e.code === KeyNavigationCode.Home ||
    e.code === KeyNavigationCode.PageUp ||
    e.code === KeyNavigationCode.PageDown
  );
}

export enum KeyNavigationCode {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  End = 'End',
  Home = 'Home',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
}