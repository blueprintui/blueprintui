export const data = {
  title: 'Internationalization (i18n)',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/i18n.html',
}

export function render() {
  return /* markdown */`

The i18n service enables customization of internal strings of BlueprintUI components.
These string values are often used for accessibility aria attributes but also can be used
for text content.

\`\`\`javascript
import '@blueprintui/components/include/button.js';
import { I18nService, GlobalStateService } from '@blueprintui/components/internals';

I18nService.keys = { actions: { sort: 'hello there' } });
\`\`\`

<div bp-layout="block gap:md">
  <bp-button>update</bp-button>
  <pre id="i18n-demo"></pre>
</div>

<script type="module">
  import '@blueprintui/components/include/button.js';
  import { I18nService, GlobalStateService } from '@blueprintui/components/internals';

  const button = document.querySelector('bp-button');
  const demo = document.querySelector('#i18n-demo');
  demo.innerHTML = JSON.stringify(I18nService.keys, null, 2);

  button.addEventListener('click', () => I18nService.keys = { actions: { sort: 'hello there' } });
  GlobalStateService.stateUpdate.subscribe((update) => demo.innerHTML = JSON.stringify(I18nService.keys, null, 2))
</script>`;
}
