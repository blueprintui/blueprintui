export const data = {
  title: 'Support',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'support.html',
}

export function render() {
  return /* markdown */`
## Contribute

Contribute via Github or become a Sponsor!

<div bp-layout="inline gap:xs">
  <bp-tag><a href="https://github.com/blueprintui">Github</a> <svg width="15" height="15"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#github-svg"></use></svg></bp-tag>
  <bp-tag><a href="https://github.com/sponsors/blueprintui">Sponsor 💙</a></bp-tag>
</div>

## Browsers

<div bp-layout="inline gap:xs">
  <bp-tag readonly>Chrome <img src="/assets/images/browsers/chrome.svg" alt="Chrome" style="width: 15px" /></bp-tag>
  <bp-tag readonly>Firefox <img src="/assets/images/browsers/firefox.svg" alt="Firefox" style="width: 15px" /></bp-tag>
  <bp-tag readonly>Edge <img src="/assets/images/browsers/edge.svg" alt="Edge" style="width: 15px" /></bp-tag>
  <bp-tag readonly>Safari <img src="/assets/images/browsers/safari.svg" alt="Safari" style="width: 15px" /></bp-tag>
</div>

BlueprintUI targets evergreen browsers. Safari can be supported via the <a bp-text="link" href="https://github.com/calebdwilliams/element-internals-polyfill">element-internals-polyfill</a>.

## Framework Support

BlueprintUI is framework agnostic and can be used with any framework or vanilla JavaScript.

<div bp-layout="inline gap:xs">
  <bp-tag><a href="https://stackblitz.com/@coryrylan/collections/blueprintui" target="_blank" rel="noopener noreferrer">All Demos</a></bp-tag>
  <bp-tag><a href="https://stackblitz.com/edit/blueprintui-angular" target="_blank" rel="noopener noreferrer">Angular</a> <img src="/assets/images/frameworks/angular.svg" alt="Angular" style="max-width: 15px" /></bp-tag>
  <bp-tag style="--padding: var(--bp-size-200) var(--bp-size-600)"><a href="https://stackblitz.com/edit/blueprintui-vue" target="_blank" rel="noopener noreferrer">Vue</a> <img src="/assets/images/frameworks/vue.svg" alt="Vue" style="max-width: 15px" /></bp-tag>
  <bp-tag><a href="https://stackblitz.com/edit/blueprintui-react" target="_blank" rel="noopener noreferrer">React</a> <img src="/assets/images/frameworks/react.svg" alt="React" style="max-width: 15px" /></bp-tag>
</div>
  `;
}
