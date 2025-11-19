export const loader = {
  accordion: () => import('@blueprintui/components/include/accordion.js'),
  alert: () => import('@blueprintui/components/include/alert.js'),
  badge: () => import('@blueprintui/components/include/badge.js'),
  breadcrumb: () => import('@blueprintui/components/include/breadcrumb.js'),
  'button-expand': () => import('@blueprintui/components/include/button-expand.js'),
  'button-group': () => import('@blueprintui/components/include/button-group.js'),
  'button-handle': () => import('@blueprintui/components/include/button-handle.js'),
  'button-icon': () => import('@blueprintui/components/include/button-icon.js'),
  'button-sort': () => import('@blueprintui/components/include/button-sort.js'),
  button: () => import('@blueprintui/components/include/button.js'),
  card: () => import('@blueprintui/components/include/card.js'),
  chat: () => import('@blueprintui/components/include/chat.js'),
  checkbox: () => import('@blueprintui/components/include/checkbox.js'),
  color: () => import('@blueprintui/components/include/color.js'),
  date: () => import('@blueprintui/components/include/date.js'),
  dialog: () => import('@blueprintui/components/include/dialog.js'),
  divider: () => import('@blueprintui/components/include/divider.js'),
  drawer: () => import('@blueprintui/components/include/drawer.js'),
  dropdown: () => import('@blueprintui/components/include/dropdown.js'),
  file: () => import('@blueprintui/components/include/file.js'),
  forms: () => import('@blueprintui/components/include/forms.js'),
  header: () => import('@blueprintui/components/include/header.js'),
  icon: () => import('@blueprintui/icons/include.js'),
  input: () => import('@blueprintui/components/include/input.js'),
  menu: () => import('@blueprintui/components/include/menu.js'),
  month: () => import('@blueprintui/components/include/month.js'),
  nav: () => import('@blueprintui/components/include/nav.js'),
  page: () => import('@blueprintui/components/include/page.js'),
  pagination: () => import('@blueprintui/components/include/pagination.js'),
  panel: () => import('@blueprintui/components/include/panel.js'),
  password: () => import('@blueprintui/components/include/password.js'),
  popover: () => import('@blueprintui/components/include/popover.js'),
  'progress-bar': () => import('@blueprintui/components/include/progress-bar.js'),
  'progress-circle': () => import('@blueprintui/components/include/progress-circle.js'),
  'progress-dot': () => import('@blueprintui/components/include/progress-dot.js'),
  radio: () => import('@blueprintui/components/include/radio.js'),
  range: () => import('@blueprintui/components/include/range.js'),
  'range-time': () => import('@blueprintui/components/include/range-time.js'),
  rating: () => import('@blueprintui/components/include/rating.js'),
  search: () => import('@blueprintui/components/include/search.js'),
  select: () => import('@blueprintui/components/include/select.js'),
  stepper: () => import('@blueprintui/components/include/stepper.js'),
  switch: () => import('@blueprintui/components/include/switch.js'),
  tabs: () => import('@blueprintui/components/include/tabs.js'),
  tag: () => import('@blueprintui/components/include/tag.js'),
  textarea: () => import('@blueprintui/components/include/textarea.js'),
  time: () => import('@blueprintui/components/include/time.js'),
  toast: () => import('@blueprintui/components/include/toast.js'),
  tooltip: () => import('@blueprintui/components/include/tooltip.js'),
  tree: () => import('@blueprintui/components/include/tree.js')
};

const imported: any = {};

function load(name: string) {
  const tag = name.toLowerCase().replace('bp-', '') as keyof typeof loader;
  if (!imported[tag] && loader[tag]) {
    imported[tag] = true;
    loader[tag]();
  }
}

Array.from(document.querySelectorAll('*')).forEach(e => load(e.nodeName));

new MutationObserver(mutations => {
  mutations.forEach(mutation => mutation.addedNodes.forEach(node => load(node.nodeName)));
}).observe(document, { childList: true, subtree: true });
