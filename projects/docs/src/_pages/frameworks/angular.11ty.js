export const data = {
  title: 'Angular',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'integrations/angular.html',
}

export function render() {
  return /* markdown */`
<div bp-layout="inline gap:xs">
  <bp-tag><a href="https://stackblitz.com/edit/blueprintui-angular" target="_blank" rel="noopener noreferrer">Demo</a> <img src="/assets/images/frameworks/angular.svg" alt="Angular" style="max-width: 15px" /></bp-tag>
</div>

To use BlueprintUI in Angular be sure to follow the [getting started guide](/getting-started.html) and installation.
Once installed in the root application module add the \`CUSTOM_ELEMENTS_SCHEMA\` to the \`schemas\` array.

\`\`\`typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@blueprintui/components/includes/alert.js';

@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  ...
}
\`\`\`


\`\`\`html
<bp-alert-group status="success" [hidden]="!showAlert">
  <bp-alert closable (close)="showAlert = false">hello there!</bp-alert>
</bp-alert-group>
\`\`\`
  `;
}
