import '@blueprintui/components/include/shell.js';
import '@blueprintui/components/include/header.js';
import '@blueprintui/components/include/drawer.js';
import '@blueprintui/components/include/alert.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/components/include/button-icon-group.js';
import '@blueprintui/components/include/divider.js';
import '@blueprintui/components/include/nav.js';
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
import './index.css';

const shell = document.querySelector('bp-shell');
const drawerBtn = document.querySelector('#drawer-btn');
const dropdown = document.querySelector('#theme-dropdown');
const themeBtn = document.querySelector('#theme-btn');
const spaceSelect = document.querySelector('#theme-space');
const colorSelect = document.querySelector('#theme-color');
drawerBtn.addEventListener('click', () => shell.open = !shell.open);
themeBtn.addEventListener('click', () => dropdown.hidden = false);
dropdown.addEventListener('close', () => dropdown.hidden = true);

let themes = localStorage.getItem('themes') ? JSON.parse(localStorage.getItem('themes')) : { color: 'modern modern-dark', spacing: '' };
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
