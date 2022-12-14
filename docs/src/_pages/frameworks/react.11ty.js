export const data = {
  title: 'React',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'frameworks/react.html',
}

export function render() {
  return /* markdown */`
<div bp-layout="inline gap:xs">
  <bp-tag><a href="https://stackblitz.com/edit/blueprintui-react" target="_blank" rel="noopener noreferrer">Demo</a> <img src="/assets/images/frameworks/react.svg" alt="React" style="max-width: 15px" /></bp-tag>
</div>

<div>
<bp-alert status="warning">Due to React's incompatibility to stadard Web APIs and additonal shim library is required</bp-alert>
</div>

To use BlueprintUI in React be sure to follow the [getting started guide](/getting-started.html)
and installation. Using the \`@lit-labs/react\` library will enable React wrapper components
to bridge the gap between React and native custom elements.

\`\`\`jsx
import * as React from 'react';
import { createComponent } from '@lit-labs/react';

export const BpButton = createComponent({ tagName: 'bp-button', elementClass: Button, react: React });

<BpButton>hello there</BpButton>
\`\`\`

Once the component is created it can be exported and used througout your application.

\`\`\`jsx
import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import { BpButton as Button } from '@blueprintui/components/button';
import { BpAlert as Alert, BpAlertGroup as AlertGroup } from '@blueprintui/components/alert';
import '@blueprintui/components/include/alert.js';
import '@blueprintui/components/include/button.js';

export const BpButton = createComponent({ tagName: 'bp-button', elementClass: Button, react: React });
export const BpAlertGroup = createComponent({ tagName: 'bp-alert-group', elementClass: AlertGroup, react: React });
export const BpAlert = createComponent({ tagName: 'bp-alert', elementClass: Alert, react: React, events: { onClose: 'close' } });

export default function App() {
  const [showAlert, setShowAlert] = React.useState(false);

  return (
    <div bp-layout="block gap:md">
      <BpButton onClick={() => setShowAlert(!showAlert)}>hello there</BpButton>

      {showAlert ? (
        <BpAlertGroup status="success" hidden={!showAlert}>
          <BpAlert closable onClose={() => setShowAlert(false)}>General Kenobi...</BpAlert>
        </BpAlertGroup>
      ) : null}
    </div>
  );
}
\`\`\`
  `;
}
