export function getExample(schema, exampleName, options = { }) {
  const example =  schema.examples.find(e => e.name === exampleName);
  const heading = example.name !== 'example' && options.title !== false ? `<h2 id="example-${example.name}" bp-text="heading" bp-layout="m-t:md">${example.name}</h2>` : '';
  return /* markdown */`
${heading}
<div class="element-example" bp-layout="m-b:md">
<div>${example.src.replace(/\r?\n|\r/g, '')}</div>
<details>
  <summary>code</summary>

\`\`\`html
${example.src}
\`\`\`
</details>
</div>
`;
}

export function getImport(schema) {
  return /* markdown */`
<h2 id="install" bp-text="heading" bp-layout="m-t:md">Install</h2>

\`\`\`typescript
import '@blueprintui/components/include/${schema.name}.js'; // bundlers/npm
\`\`\`

\`\`\`html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/components/include/${schema.name}.js/+esm'; // CDN
</script>
\`\`\`
  `;
}

export function getDescription(schema, elementName) {
  const element = schema.elements.find(e => e.tagName === elementName);
  return `${element ? `${element.description}` : ``}`;
}

export function getAPI(schema) {
  return /* markdown */`${schema.elements.map(e => /* html */`
<h2 id="${e.tagName}-api" bp-text="subheading" bp-layout="m-t:md">${e.tagName}</h2>
${e.members? table('Properties', e.members.filter(m => m.privacy !== 'private').filter(m => m.privacy !== 'protected').filter(m => !m.name.startsWith('#')).filter(m => !m.name.startsWith('_'))) : ''}
${e.attributes ? table('Attributes', e.attributes.filter(m => !m.name.startsWith('_'))) : ''}
${table('Events', e.events)}
${table('CSS Properties', e.cssProperties)}
${e.slots ? table('Slots', e.slots.map(s => s.name ? s : ({ ...s, name: 'default' }))) : ''}`).join('\n')}`
}

function table(name, rows) {
  return rows ? /* html */`
<h3 bp-text="section" bp-layout="m-t:md">${name}</h3>
<table>
  <thead>
    <tr><td>Name</td><td>Types</td><td>Description</td></tr>
  </thead>
  <tbody>
  ${rows.map(m => /* html */`<tr><td>${m.name}</td><td><code bp-text="code">${m.type ? m.type.text : ''}</code></td><td>${m.description ? m.description : ''}</td></tr>`).join('')}
  </tbody>
</table>` : '';
}