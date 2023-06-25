export const data = {
  title: 'Pricing',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'pricing.html',
}

export function render(config) {
  return config.site.site.enablePro ? /* markdown */`
  <div bp-layout="grid gap:md cols:6@md" style="max-width: 720px; margin: 0 auto">
    <bp-card>
      <h2 slot="header" bp-text="subsection bold">Core</h2>
      <div bp-layout="block gap:sm">
        <h3 bp-text="heading" style="--font-size: 48px">$0</h3>
        <p bp-text="body">Included in Core</p>
        <bp-alert status="success">Free Open Source UI Components</bp-alert>
        <bp-alert status="success">Free Open Source Base Themes</bp-alert>
        <bp-alert status="success">Full Documentation</bp-alert>
        <bp-alert status="success">Unlimited Projects</bp-alert>
      </div>
      <div slot="footer" bp-layout="inline inline:stretch">
        <bp-button action="outline"><a href="/getting-started.html">Get Started</a></bp-button>
      </div>
    </bp-card>
    <bp-card style="box-shadow: var(--bp-object-shadow-300)">
      <div slot="header" bp-layout="inline gap:sm">
        <h2 bp-text="subsection bold" bp-layout="block:center">Pro</h2>
        <bp-tag readonly status="accent" bp-layout="inline:end">recommended</bp-tag>
      </div>
      <div bp-layout="block gap:sm">
        <h3 bp-text="heading" style="--font-size: 48px">$99 <small style="font-size: 18px">per dev / year</small></h3>
        <p bp-text="body">Included in Pro</p>
        <bp-alert status="success">Free Open Source UI Components</bp-alert>
        <bp-alert status="success">Free Open Source Base Themes</bp-alert>
        <bp-alert status="success">Full Documentation</bp-alert>
        <bp-alert status="success">Unlimited Projects</bp-alert>
        <bp-alert status="success">1 year pro development license</bp-alert>
        <bp-alert status="success">1 year of support</bp-alert>
        <bp-alert status="success">Pro Datagrid Features</bp-alert>
        <ul bp-text="list" bp-layout="m-l:lg">
          <li>Range Selection</li>
          <li>Column Resizing</li>
          <li>CSV Export</li>
          <li>Row Detail</li>
          <li>Draggable Columns</li>
          <li>Draggable Rows</li>
        </ul>
      </div>
      <div slot="footer" bp-layout="inline inline:stretch">
        <bp-button status="accent">Invite Only - Coming Soon!</bp-button>
      </div>
    </bp-card>
  </div>` : 'Commercial license not yet available. Coming soon!';
}
