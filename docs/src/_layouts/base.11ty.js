export function render(data) {
  return /* html */`<!DOCTYPE html>
  <html lang="en" bp-theme="dark">
    ${this.headTag(data)}
    <body>
      <bp-header>
        <bp-header-item ${data.page.url === '/' ? 'selected' : ''}><a href="/">Blueprint Layout</a></bp-header-item>
        <bp-header-item aria-label="menu" bp-layout="align:right"><bp-icon size="sm"></bp-icon></bp-header-item>
      </bp-header>
      <bp-drawer closable hidden></bp-drawer>
      <bp-nav expanded>
        <bp-nav-item ${data.page.url === '/docs/getting-started.html' ? 'selected' : ''}><a href="/docs/getting-started.html">Getting Started</a></bp-nav-item>
        <bp-nav-item ${data.page.url === '/about.html' ? 'selected' : ''}><a href="/about.html">About</a></bp-nav-item>
        <!-- <bp-nav-item><a href="https://github.com/blueprintui/layout">Github</a></bp-nav-item> -->
        <bp-nav-group expanded>
          <bp-nav-item><a href="/docs/block/layout.html">Block</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/block/layout.html' ? 'selected' : ''}><a href="/docs/block/layout.html">Layout</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/block/gap.html' ? 'selected' : ''}><a href="/docs/block/gap.html">Gap</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/block/alignment.html' ? 'selected' : ''}><a href="/docs/block/alignment.html">Alignmment</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/block/item-alignment.html' ? 'selected' : ''}><a href="/docs/block/item-alignment.html">Item Alignment</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/block/stretch.html' ? 'selected' : ''}><a href="/docs/block/stretch.html">Stretch</a></bp-nav-item>
        </bp-nav-group>
        <bp-nav-group expanded>
          <bp-nav-item><a href="/docs/inline/layout.html">Inline</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/inline/layout.html' ? 'selected' : ''}><a href="/docs/inline/layout.html">Layout</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/inline/gap.html' ? 'selected' : ''}><a href="/docs/inline/gap.html">Gap</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/inline/alignment.html' ? 'selected' : ''}><a href="/docs/inline/alignment.html">Alignmment</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/inline/item-alignment.html' ? 'selected' : ''}><a href="/docs/inline/item-alignment.html">Item Alignment</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/inline/stretch.html' ? 'selected' : ''}><a href="/docs/inline/stretch.html">Stretch</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/inline/wrap.html' ? 'selected' : ''}><a href="/docs/inline/wrap.html">Wrap</a></bp-nav-item>
        </bp-nav-group>
        <bp-nav-group expanded>
          <bp-nav-item><a href="/docs/grid/layout.html">Grid</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/grid/layout.html' ? 'selected' : ''}><a href="/docs/grid/layout.html">Layout</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/grid/responsive.html' ? 'selected' : ''}><a href="/docs/grid/responsive.html">Responsive</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/grid/gap.html' ? 'selected' : ''}><a href="/docs/grid/gap.html">Gap</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/grid/alignment.html' ? 'selected' : ''}><a href="/docs/grid/alignment.html">Alignment</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/grid/stretch.html' ? 'selected' : ''}><a href="/docs/grid/stretch.html">Stretch</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/grid/column-start-end.html' ? 'selected' : ''}><a href="/docs/grid/column-start-end.html">Column Start/End</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/docs/grid/row-start-end.html' ? 'selected' : ''}><a href="/docs/grid/row-start-end.html">Row Start/End</a></bp-nav-item>
        </bp-nav-group>
      </bp-nav>
      <main>
        ${data.content}
      </main>
      <script type="module" src="/index.js"></script>
    </body>
  </html>`
}
