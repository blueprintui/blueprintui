import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getExample } from '../../_includes/utils/index.js';

export const data = {
  title: 'Popovers',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'docs/foundation/popovers.html',
  schema: schema.find(c => c.name === 'popover'),
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/components',
    version: '2.0.0'
  }
}

export function render() {
  return /* markdown */`
<style>
  .element-example div[bp-layout] {
    height: 250px !important;
  }
</style>

Blueprint UI uses native [HTML Popovers API](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover). This enables popovers to use be used without JavaScript.
There are several provided popover types with different UX and Accessibility characteristics.

\`\`\`html
<bp-button popovertarget="popover">show</bp-button>
<bp-tooltip id="popover">hello there</bp-tooltip>
\`\`\`

- [Tooltip](/docs/components/tooltip.html): In context or just in time static non-interactive information.
- [Toggletip](/docs/components/toggletip.html): In context information or actions, toggletips unlike tooltips can remain open for interactive elements.
- [Toast](/docs/components/toast.html): Async information updates or notifications without interuption to the user.
- [Dropdown](/docs/components/dropdown.html): Generic popover anchored to a interactive element. Can contain interactive or static content.
- [Dialog](/docs/components/dialog.html): Content that interupts the users current view overlaying page content. Can contain both static or interactive content.
- [Drawer](/docs/components/drawer.html): Similar to dialog overlaying current page content, but typically used for navigation based or interactive UI elements.

${getExample(data.schema, 'types',  { title: false })}

  `;
}