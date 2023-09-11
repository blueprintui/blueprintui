import componentSchema from '../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import iconSchema from '../../../packages/icons/dist/drafter/schema.json' assert { type: 'json' };
import gridSchema from '../../../packages/grid/dist/drafter/schema.json' assert { type: 'json' };

const schema = [...componentSchema, ...iconSchema, ...gridSchema];

export const data = {
  title: 'Components',
  tags: [],
  layout: 'base.11ty.js',
  container: false,
  permalink: 'docs/components.html',
}

export function render() {
  return /* markdown */`
<div bp-layout="block gap:md" style="padding: 36px">
  <h1 bp-text="heading">Components</h1>
</div>

<div bp-layout="grid" class="demo-grid demo-grid-all no-container">
  ${schema
    .filter(s => s.name !== 'internal')
    .filter(s => s.name !== 'shell')
    .filter(s => s.name !== 'popover')
    .filter(s => s.name !== 'drawer')
    .filter(s => s.name !== 'dialog')
    .filter(s => s.name !== 'toast')
    .filter(s => s.name !== 'dropdown')
    .filter(s => s.name !== 'tooltip')
    .filter(s => s.examples.find(e => e.name.includes('example'))).map(c => {
    return /* html */`
      <div class="demo-grid-card">
        <a href="${c.name !== 'grid' ? `/docs/components/${c.name}.html` : `/docs/${c.name}.html`}" aria-label="${c.name} documentation" class="demo-grid-card-link">
          <h3 bp-text="subsection">${c.name}</h3>
        </a>
        <div class="demo-grid-content">${c.examples.find(e => e.name.includes('example')).src}</div>
      </div>
    `;
  }).join('')}
</div>
  `;
}