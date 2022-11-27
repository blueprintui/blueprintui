export const data = {
  title: 'Icons',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/icons.html'
}

export function render() {
  return /* markdown */`
The icon component provides a flexible way to render SVG based icon. Icons sourced from [Clarity](https://storybook.core.clarity.design/?path=/story/documentation-welcome--page) The icons can be used as a [standalone package](https://icons.blueprintui.dev/) or as part of the BlueprintUI components.

\`\`\`javascript
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/user.js';
\`\`\`

\`\`\`html
<bp-icon shape="user"></bp-icon>
\`\`\`

<style>
  #icons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  #icons bp-button-icon {
    --icon-width: 24px;
    --icon-height: 24px;
  }

  #icons bp-button-icon:hover {
    transform: scale(1.5);
  }
</style>
<div id="icons"></div>

## Badges

<div id="icon-badges" style="display: flex; gap:12px; flex-wrap: wrap;"></div>


## Size

<div id="icon-sizes" style="display: flex; gap:12px; flex-wrap: wrap;"></div>


<script type="module">
  import { shapes } from '@blueprintui/icons/shapes/shapes.js';
  import '@blueprintui/icons/shapes/all.js';
  import '@blueprintui/components/include/button-icon.js';
  import '@blueprintui/components/include/dialog.js';

  const icons = shapes.map(shape => {
    const btn = document.createElement('bp-button-icon');
    btn.shape = shape;
    return btn;
  });

  document.getElementById('icons').append(...icons);
  document.querySelector('#icons').addEventListener('click', event => {
    const dialog = document.createElement('bp-dialog');
    dialog.closable = true;
    dialog.modal = true;
    dialog.innerHTML = 
      '<bp-dialog-header><h2 bp-text="section">' + event.target.shape + '</h2></bp-dialog-header>' + 
      '<bp-icon shape="' + event.target.shape + '"></bp-icon>';
    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    document.body.appendChild(dialog);
  });

  const iconBadges = shapes.flatMap(shape => {
    const icon = document.createElement('bp-icon');
    const success = document.createElement('bp-icon');
    const warning = document.createElement('bp-icon');
    const danger = document.createElement('bp-icon');
    icon.badge = 'accent';
    success.badge = 'success';
    warning.badge = 'warning';
    danger.badge = 'danger';
    icon.shape = shape;
    success.shape = shape;
    warning.shape = shape;
    danger.shape = shape;
    return [icon, success, warning, danger];
  });

  const badges = document.querySelector('#icon-badges');
  iconBadges.forEach(icon => badges.appendChild(icon));


  const iconSizes = shapes.flatMap(shape => {
    const sm = document.createElement('bp-icon');
    const md = document.createElement('bp-icon');
    const lg = document.createElement('bp-icon');
    sm.size = 'sm';
    md.size = 'md';
    lg.size = 'lg';
    sm.shape = shape;
    md.shape = shape;
    lg.shape = shape;
    return [sm, md, lg];
  });

  const sizes = document.querySelector('#icon-sizes');
  iconSizes.forEach(icon => sizes.appendChild(icon));
</script>
  `;
}
