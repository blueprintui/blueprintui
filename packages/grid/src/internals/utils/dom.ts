/** right click with context menus & keyboard mouse control https://apple.stackexchange.com/questions/32715/how-do-i-open-the-context-menu-from-a-mac-keyboard */
export function contextMenuClick(event: MouseEvent) {
  return (event.buttons === 2 && !event.ctrlKey) || (event.buttons === 1 && event.ctrlKey);
}
