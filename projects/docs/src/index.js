import '@blueprintui/components/include/page.js';
import '@blueprintui/components/include/panel.js';
import '@blueprintui/components/include/header.js';
import '@blueprintui/components/include/tree.js';
import '@blueprintui/components/include/alert.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/components/include/button-group.js';
import '@blueprintui/components/include/divider.js';
import '@blueprintui/icons/shapes/pop-out.js';
import '@blueprintui/icons/shapes/arrow.js';
import '@blueprintui/icons/shapes/color-palette.js';
import '@blueprintui/icons/shapes/number-list.js';
import '@blueprintui/icons/shapes/highlighter.js';
import '@blueprintui/icons/shapes/attachment.js';
import '@blueprintui/icons/shapes/font-size.js';
import '@blueprintui/icons/shapes/italic.js';
import '@blueprintui/icons/shapes/flask.js';
import '@blueprintui/components/include/lazy.js';
import '@blueprintui/components/include/forms.js';
import './index.css';

const spaceSelect = document.querySelector('#theme-space');
const colorSelect = document.querySelector('#theme-color');

let themes = localStorage.getItem('themes') ? JSON.parse(localStorage.getItem('themes')) : { color: 'dark', spacing: '' };
setTheme();

colorSelect.addEventListener('change', e => {
  themes.color = e.target.value;
  setTheme();
});

spaceSelect.addEventListener('change', e => {
  themes.spacing = e.target.value;
  setTheme();
});

function setTheme() {
  setTimeout(() => {
    colorSelect.value = themes.color;
    spaceSelect.value = themes.spacing;
  }, 100);
  document.querySelector(':root').setAttribute('bp-theme', `${themes.color} ${themes.spacing}`);
  localStorage.setItem('themes', JSON.stringify(themes));
}

const nav = document.querySelector('#nav-panel');

new ResizeObserver(entries => {
  for (let entry of entries) {
    const cr = entry.contentRect;
    nav.hidden = cr.width < 1024;
  }
}).observe(document.body);

setTimeout(() => {
  const navScroll = nav?.shadowRoot?.querySelector('slot:not([name])');
  if (navScroll) {
    navScroll.scrollTo(0, localStorage.getItem('nav-scroll-position') || 0);
    navScroll.addEventListener('scrollend', () => localStorage.setItem('nav-scroll-position', navScroll.scrollTop));
  }
}, 0);
