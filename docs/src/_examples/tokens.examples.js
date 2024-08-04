import json from '@blueprintui/themes/index.json' with { type: 'json' };

const tokens = flattenTokens(json);

function flattenTokens(theme) {
  function flatten(config, parent = '--bp') {
    return Object.entries(config).map(([key, value]) => {
        if (typeof value === 'object') {
          return flatten(value, `${parent}-${key}`);
        }

        return { [`${parent}-${key}`]: value };
      })
      .reduce((prev, next) => ({ ...prev, ...next }), {});
  }

  return flatten(theme);
}

function getToken(name, rawValue) {
  const value = rawValue.includes('calc') ? rawValue.replace('calc(1 * ', '').replace(')', '') : rawValue;
  if (name.includes('color') || name.includes('background') || name.includes('status') || name.includes('object-opacity')) {
    return { name, value, example: `<bp-card style="--background: var(--bp-object-border-color-300); --height: 36px; --background: var(${name}); min-width: 100%;"></bp-card>` };
  } else if (name.includes('object-shadow')) {
    return { name, value, example: `<bp-card style="--background: var(--bp-layer-background-100); --height: 36px; --box-shadow: var(${name}); min-width: 100%;"></bp-card>` };
  } else if (name.includes('object-border-radius')) {
    return { name, value, example: `<bp-card style="--background: var(--bp-layer-background-100); --height: 36px; --border-radius: var(${name}); width: 100%;"></bp-card>` };
  } else if (name.includes('text-size')) {
    return { name, value, example: `<p bp-text="content" style="font-size: var(${name}) !important;">${value}</p>` };
  } else if (name.includes('text-weight')) {
    return { name, value, example: `<p bp-text="content" style="font-weight: var(${name});">${value}</p>` };
  } else if (!name.includes('scale') && !name.includes('layout-width') && (name.includes('size') || name.includes('space') || name.includes('width'))) {
    return { name, value, example: `<bp-card style="--background: var(--bp-object-border-color-300); --height: 36px; --padding: 0; height: 36px; width: var(${name})"></bp-card>` };
  } else {
    return { name, value, example: value };
  }
}

export function tokensTable(filter) {
  return /* html */`
<bp-grid class="token-table">
  <bp-grid-header>
    <bp-grid-column width="max-content"></bp-grid-column>
    <bp-grid-column>Token</bp-grid-column>
    <bp-grid-column>Value</bp-grid-column>
    <bp-grid-column>Example</bp-grid-column>
  </bp-grid-header>
  ${Object.entries(tokens)
    .filter(([key]) => key.includes(filter))
    .filter(([key]) => !key.endsWith('-0'))
    .map(v => getToken(...v)).map(token => `
<bp-grid-row>
  <bp-grid-cell>
    <bp-button-icon shape="copy" action="flat" aria-label="copy token" title="copy"></bp-button-icon>
  </bp-grid-cell>
  <bp-grid-cell><code>${token.name}</code></bp-grid-cell>
  <bp-grid-cell>${token.value}</bp-grid-cell>
  <bp-grid-cell>${token.example}</bp-grid-cell>
</bp-grid-row>`).join('\n')}
</bp-grid>
`;
}

export function color() {
  return /* html */`
<div bp-layout="block gap:sm">
  <div bp-layout="inline gap:sm">
    ${Array.from(Array(7).keys()).map((i) => `<div class="color" style="background: var(--bp-color-blue-${i + 1}00)"></div>`).join('\n')}
  </div>
  <div bp-layout="inline gap:sm">
  ${Array.from(Array(7).keys()).map((i) => `<div class="color" style="background: var(--bp-color-red-${i + 1}00)"></div>`).join('\n')}
  </div>
  <div bp-layout="inline gap:sm">
  ${Array.from(Array(7).keys()).map((i) => `<div class="color" style="background: var(--bp-color-green-${i + 1}00)"></div>`).join('\n')}
  </div>
  <div bp-layout="inline gap:sm">
  ${Array.from(Array(7).keys()).map((i) => `<div class="color" style="background: var(--bp-color-yellow-${i + 1}00)"></div>`).join('\n')}
  </div>
  <div bp-layout="inline gap:sm">
  ${Array.from(Array(7).keys()).map((i) => `<div class="color" style="background: var(--bp-color-violet-${i + 1}00)"></div>`).join('\n')}
  </div>
  <div bp-layout="inline gap:sm">
  ${Array.from(Array(10).keys()).map((i) => `<div class="color" style="background: var(--bp-color-gray-${i + 1}00)"></div>`).join('\n')}
  </div>
</div>`;
}

export function textColor() {
  return /* html */`
<div bp-layout="inline gap:md">
  <div class="color" style="background: var(--bp-text-color-100)"></div>
  <div class="color" style="background: var(--bp-text-color-200)"></div>
  <div class="color" style="background: var(--bp-text-color-300)"></div>
  <div class="color" style="background: var(--bp-text-color-400)"></div>
  <div class="color" style="background: var(--bp-text-color-500)"></div>
  <div class="color" style="background: var(--bp-text-color-600)"></div>
</div>`;
}

export function status() {
  return /* html */`
<div bp-layout="block gap:md">
  <div bp-layout="inline gap:md">
    <div class="color" style="background: var(--bp-status-neutral-100)"></div>
    <div class="color" style="background: var(--bp-status-neutral-200)"></div>
    <div class="color" style="background: var(--bp-status-neutral-300)"></div>
  </div>
  <div bp-layout="inline gap:md">
    <div class="color" style="background: var(--bp-status-disabled-100)"></div>
    <div class="color" style="background: var(--bp-status-disabled-200)"></div>
    <div class="color" style="background: var(--bp-status-disabled-300)"></div>
  </div>
  <div bp-layout="inline gap:md">
    <div class="color" style="background: var(--bp-status-accent-100);"></div>
    <div class="color" style="background: var(--bp-status-accent-200)"></div>
    <div class="color" style="background: var(--bp-status-accent-300)"></div>
  </div>
  <div bp-layout="inline gap:md">
    <div class="color" style="background: var(--bp-status-success-100);"></div>
    <div class="color" style="background: var(--bp-status-success-200)"></div>
    <div class="color" style="background: var(--bp-status-success-300)"></div>
  </div>
  <div bp-layout="inline gap:md">
    <div class="color" style="background: var(--bp-status-warning-100);"></div>
    <div class="color" style="background: var(--bp-status-warning-200)"></div>
    <div class="color" style="background: var(--bp-status-warning-300)"></div>
  </div>
  <div bp-layout="inline gap:md">
    <div class="color" style="background: var(--bp-status-danger-100);"></div>
    <div class="color" style="background: var(--bp-status-danger-200)"></div>
    <div class="color" style="background: var(--bp-status-danger-300)"></div>
  </div>
</div>`;
}

export function borderColor() {
  return /* html */`
<div bp-layout="block gap:md">
  <div bp-layout="inline gap:md">
    <div bp-layout="block gap:sm">
      <div class="color" style="background: var(--bp-object-border-color-100)"></div>
      <p bp-text="content">--bp-object-border-color-100</p>
    </div>
    <div bp-layout="block gap:sm">
      <div class="color" style="background: var(--bp-object-border-color-200)"></div>
      <p bp-text="content">--bp-object-border-color-200</p>
    </div>
    <div bp-layout="block gap:sm">
      <div class="color" style="background: var(--bp-object-border-color-300)"></div>
      <p bp-text="content">--bp-object-border-color-300</p>
    </div>
  </div>
</div>`;
}

export function opacity() {
  return /* html */`
<div bp-layout="block gap:md">
  <div bp-layout="inline gap:md">
    <div class="color" style="background: var(--bp-object-opacity-100)"></div>
    <div class="color" style="background: var(--bp-object-opacity-200)"></div>
    <div class="color" style="background: var(--bp-object-opacity-300)"></div>
  </div>
</div>`;
}

export function size() {
  return /* html */`
<div bp-layout="block gap:sm">
  ${Array.from(Array(12).keys()).map((i) => `<div class="box" style="width: var(--bp-size-${i}); height: var(--bp-size-${i})">${i}</div>`).join('\n')}
</div>`;
}

export function space() {
  return /* html */`
<div bp-layout="block gap:sm">
  <div class="box" style="width: var(--bp-space-xs); height: var(--bp-space-xs)">xs</div>
  <div class="box" style="width: var(--bp-space-sm); height: var(--bp-space-sm)">sm</div>
  <div class="box" style="width: var(--bp-space-md); height: var(--bp-space-md)">md</div>
  <div class="box" style="width: var(--bp-space-lg); height: var(--bp-space-lg)">lg</div>
  <div class="box" style="width: var(--bp-space-xl); height: var(--bp-space-xl)">xl</div>
</div>`;
}
