import '@blueprintui/components/include/header.js';
import '@blueprintui/components/include/drawer.js';
import '@blueprintui/components/include/alert.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/components/include/divider.js';
import '@blueprintui/components/include/nav.js';
import './index.css';

const nav = document.querySelector('bp-nav');
const drawer = document.querySelector('bp-drawer');
const navBtn = document.querySelector('[aria-label="menu"]');

navBtn.addEventListener('click', () => drawer.hidden = !drawer.hidden);

drawer.addEventListener('close', () => drawer.hidden = true);

new ResizeObserver((entries) => {
  drawer.hidden = true;
  if (entries[0].contentRect.width > 1099) {
    drawer.after(nav);
  } else {
    if (!Array.from(drawer.children).includes(nav)) {
      drawer.appendChild(nav);
    }
  }
}).observe(document.body);