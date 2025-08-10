export const data = {
  title: 'React',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'integrations/react.html',
}

export function render() {
  return /* markdown */`
<div bp-layout="inline gap:xs">
  <bp-tag><a href="https://stackblitz.com/edit/blueprintui-react" target="_blank" rel="noopener noreferrer">Demo</a> <img src="/assets/images/frameworks/react.svg" alt="React" style="max-width: 15px" /></bp-tag>
</div>

To use BlueprintUI in React 19+ be sure to follow the [getting started guide](/getting-started.html).

\`\`\`jsx
import * as React from 'react';
import '@blueprintui/components/include/alert.js';
import '@blueprintui/components/include/button.js';

export default function App() {
  const [showAlert, setShowAlert] = React.useState(false);

  return (
    <div bp-layout="block gap:md">
      <bp-button onClick={() => setShowAlert(!showAlert)}>hello there</bp-button>

      {showAlert ? (
        <bp-alert-group status="success" hidden={!showAlert}>
          <bp-alert closable onClose={() => setShowAlert(false)}>General Kenobi...</bp-alert>
        </bp-alert-group>
      ) : null}
    </div>
  );
}
\`\`\`

## TypeScript Support

To add type support for BlueprintUI components in React, you can augment the [JSX.IntrinsicElements](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#the-jsx-namespace-in-typescript) interface to include custom elements.

\`\`\`tsx
// global.d.ts
import type { BpButton } from '@blueprintui/components/button';
import type { BpAlert } from '@blueprintui/components/alert';

type CustomEvents<K extends string> = { [key in K] : (event: CustomEvent) => void };
type CustomElement<T, K extends string = ''> = Partial<T & DOMAttributes<T> & { children: any } & CustomEvents<\`on$\{K\}\`>>;

declare 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      ['bp-button']: CustomElement<BpButton>;
      ['bp-alert']: CustomElement<BpAlert, 'close'>;
    }
  }
}
\`\`\`
  `;
}
