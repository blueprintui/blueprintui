import componentSchema from '../../packages/components/.drafter/schema.json' with { type: 'json' };
import iconSchema from '../../packages/icons/.drafter/schema.json' with { type: 'json' };
import gridSchema from '../../packages/grid/.drafter/schema.json' with { type: 'json' };

const schema = [...componentSchema, ...iconSchema, ...gridSchema];

export const data = {
  layout: 'single-page.11ty.js'
};

const logo = `<svg xmlns="http://www.w3.org/2000/svg" style="width: max(110px, 10%);" viewBox="0 0 75 75">
<linearGradient id="a" x1="256" x2="256" y1="496" y2="16" gradientUnits="userSpaceOnUse">
  <stop offset="0" stop-color="hsl(211, 100%, 30%)"></stop>
  <stop offset="0.8" stop-color="hsl(211, 80%, 40%)"></stop>
  <stop offset="1" stop-color="hsl(211, 80%, 80%)"></stop>
</linearGradient>
<path fill="url(#a)" d="M12.997 4c-1.512 0-2.957.31-4.271.868a11.095 11.095 0 0 0-5.858 5.858v.004a10.867 10.867 0 0 0-.645 2.054v.009c-.072.354-.13.717-.167 1.083v.004c-.038.367-.056.736-.056 1.113v46.211a2.2 2.2 0 0 0 0 .009v1.323a2.2 2.2 0 0 0 .284 1.075 2.2 2.2 0 0 0 .004.008c.145.64.328 1.268.58 1.861.152.358.367.68.554 1.019.157.282.28.584.46.85l.005.005c.395.584.844 1.127 1.34 1.624.088.088.194.152.284.237.425.398.862.785 1.345 1.113h.004c.585.396 1.21.739 1.866 1.018h.004c.656.28 1.346.498 2.058.645h.005c.355.073.716.13 1.083.168h.004c.367.037.74.06 1.117.06H21.8a2.2 2.2 0 0 0 .073-.005H68.01a2.2 2.2 0 0 0 2.2-2.2V12.806a2.2 2.2 0 0 0-2.2-2.205H23.07c-1.236-2.802-3.622-4.963-6.54-5.965-.264-.094-.53-.18-.804-.254-.335-.086-.664-.18-1.01-.236-.067-.011-.134-.02-.202-.03A10.935 10.935 0 0 0 13.024 4h-.027zm0 4.4h.005c.416 0 .818.049 1.212.121.17.032.332.084.498.129.21.055.418.114.619.189.205.078.406.169.602.266a6.522 6.522 0 0 1 1.044.64c.058.044.111.093.167.138.238.194.47.394.68.62a6.607 6.607 0 0 1 1.555 2.848 2.2 2.2 0 0 0 .069.22c.1.458.159.931.159 1.422V52.48c-1.85-1.403-4.124-2.269-6.61-2.269-2.48 0-4.752.862-6.596 2.26V14.994a6.577 6.577 0 0 1 .516-2.57 6.548 6.548 0 0 1 3.502-3.507 6.65 6.65 0 0 1 2.578-.515zm11.01 6.602H65.81v52.807H13.002a6.578 6.578 0 0 1-4.676-1.92c-.164-.164-.297-.357-.443-.538-.12-.148-.254-.284-.36-.442a6.558 6.558 0 0 1-.607-1.118v-.004a6.587 6.587 0 0 1-.382-1.238v-.004a6.79 6.79 0 0 1-.133-1.332v-.009a6.577 6.577 0 0 1 .215-1.603 6.537 6.537 0 0 1 6.381-4.99c3.672 0 6.61 2.921 6.61 6.593v1.35a2.2 2.2 0 1 0 4.4-.018V61.3a2.2 2.2 0 0 0 0-.095V15.002z"/>
</svg>`;

export function render() {
  return /* markdown */`
<div class="home">
  <div inert bp-layout="grid" class="demo-grid home-demo-grid">
    ${schema
      .filter(s => s.name !== 'internal' && s.name !== 'page' && s.name !== 'popover' && s.name !== 'toast' && s.name !== 'divider' && s.name !== 'button-handle' && s.name !== 'dialog' && s.name !== 'button-resize' && s.name !== 'dropdown' && s.name !== 'menu' && s.name !== 'tooltip' && s.name !== 'drawer' && s.name !== 'pagination' && !s.name.includes('format') && !s.name.includes('divider') && !s.name.includes('progress-dot'))
      .filter(s => s.examples.find(e => e.name.includes('example'))).map(c => {
      return /* html */`
        <div class="demo-grid-card" hidden>
          <a href="/docs/components/${c.name}.html" aria-label="${c.name} documentation" class="demo-grid-card-link"></a>
          <div class="demo-grid-content">${c.examples.find(e => e.name.includes('example')).src}</div>
        </div>
      `;
    }).join('')}
  </div>
  
  <!-- Hero Section -->
  <div bp-layout="block gap:md inline:center" class="hero">
    <div bp-layout="block gap:lg center" style="height: 100vh; margin-top: -5vh;">
      ${logo}
      <h1 bp-text="banner size:lg center contrast:none">BlueprintUI</h1>
      <p bp-text="heading size:sm center contrast:none">
        Build <strong>faster</strong>. Ship <strong>everywhere</strong>. Zero compromises.
      </p>
      <p bp-text="content center header sm" style="max-width: 680px; color: var(--bp-text-color-400)">
        Enterprise-grade Web Components that work seamlessly with React, Angular, Vue, or vanilla JavaScript. One codebase, infinite possibilities.
      </p>
      <div bp-layout="inline gap:sm inline:center">
        <bp-button status="accent" size="lg">
          <a href="/getting-started.html">Get Started</a>
        </bp-button>
        <bp-button action="secondary" size="lg">
          <a href="/docs/components.html">Browse Components</a>
        </bp-button>
      </div>
      <div bp-layout="block gap:lg m-t:sm">
        <pre style="margin: 0 auto"><code class="language-shell" style="border-radius: 8px; padding: 16px 32px; background: var(--bp-color-gray-800);">npm install @blueprintui/components</code></pre>
        <p bp-text="content center" style="color: var(--bp-text-color-400);">TypeScript ready • Tree-shakeable • 45+ components</p>
      </div>
    </div> 
  </div>

  <div bp-layout="block gap:xl center" style="max-width: 1200px; margin: 0 auto 10vh auto;">
    <div bp-layout="block gap:md center">
      <h2 bp-text="heading center size:lg contrast:none">Why choose BlueprintUI</h2>
      <p bp-text="content center size:lg contrast:none">
        Stop fighting framework incompatibilities. Start building better products.
      </p>
    </div>
    <div bp-layout="grid cols:12 cols:6@md gap:xl" style="max-width: 1000px; margin: 0 auto;">
      <div bp-layout="block gap:md">
        <div slot="header" bp-layout="inline gap:sm block:center">
          <bp-icon shape="lightning"></bp-icon>
          <h3 bp-text="section">Lightning Fast</h3>
        </div>
        <p bp-text="content">Ship less JavaScript than traditional frameworks based component libraries.</p>
      </div>
      <div bp-layout="block gap:md">
        <div slot="header" bp-layout="inline gap:sm block:center">
          <bp-icon shape="layers"></bp-icon>
          <h3 bp-text="section">Framework Agnostic</h3>
        </div>
        <p bp-text="content">Works perfectly with React, Angular, Vue, or vanilla JS. Switch frameworks without rewriting UI.</p>
      </div>
      <div bp-layout="block gap:md">
        <div bp-layout="inline gap:sm block:center">
          <bp-icon shape="shield-check"></bp-icon>
          <h3 bp-text="section">Enterprise Ready</h3>
        </div>
        <p bp-text="content contrast:none">WCAG 2.1 AA compliant, thoroughly tested, and built for mission-critical applications.</p>
      </div>
      <div bp-layout="block gap:md">
        <div slot="header" bp-layout="inline gap:sm block:center">
          <bp-icon shape="code"></bp-icon>
          <h3 bp-text="section">Developer Experience</h3>
        </div>
        <p bp-text="content">Full TypeScript support, comprehensive docs, and intuitive APIs that just make sense.</p>
      </div>
      <div bp-layout="block gap:md">
        <div slot="header" bp-layout="inline gap:sm block:center">
          <bp-icon shape="color-palette"></bp-icon>
          <h3 bp-text="section">Fully Themeable</h3>
        </div>
        <p bp-text="content">CSS custom properties and design tokens make it easy to match your brand perfectly.</p>
      </div>
      <div bp-layout="block gap:md">
        <div slot="header" bp-layout="inline gap:sm block:center">
          <bp-icon shape="analytics"></bp-icon>
          <h3 bp-text="section">Future Proof</h3>
        </div>
        <p bp-text="content">Built on web standards that will outlast any framework. Your investment is protected.</p>
      </div>
    </div>
  </div>

  <div bp-layout="block gap:xl center" style="max-width: 1200px; margin: 15vh auto;">
    <div bp-layout="block gap:md center">
      <h2 bp-text="heading center size:lg contrast:none">Works with your stack</h2>
      <p bp-text="content center size:lg contrast:none">
        No matter what framework you use today or tomorrow, BlueprintUI has you covered.
      </p>
    </div>
    
    <div bp-layout="grid cols:6@sm cols:3@md gap:md" style="max-width: 1000px; margin: 0 auto;">
      <img style="width: 50%; margin: 0 auto" src="/assets/images/frameworks/javascript.svg" alt="JavaScript" />
      <img style="width: 50%; margin: 0 auto" src="/assets/images/frameworks/react.svg" alt="React" />
      <img style="width: 50%; margin: 0 auto" src="/assets/images/frameworks/angular.svg" alt="Angular" />
      <img style="width: 50%; margin: 0 auto" src="/assets/images/frameworks/vue.svg" alt="Vue" />
    </div>
  </div>

  <div bp-layout="block gap:lg center" style="max-width: 800px; margin: 15vh auto 10vh;">
    <div bp-layout="block gap:md center" style="text-align: center; padding: 48px; background: var(--bp-layer-background-200); border-radius: 12px;">
      <h2 bp-text="heading" style="--font-size: 42px; font-weight: 300;">Ready to build better?</h2>
      <p bp-text="content" style="--font-size: 18px; color: var(--bp-text-color-300);">
         Build faster, more reliable applications with BlueprintUI.
      </p>
      <div bp-layout="inline gap:sm inline:center">
        <bp-button status="accent" size="lg">
          <a href="/getting-started.html">Get Started</a>
        </bp-button>
        <bp-button action="secondary" size="lg">
          <a href="https://github.com/blueprintui/blueprintui">View on GitHub</a>
        </bp-button>
      </div>
      <p bp-text="caption">MIT Licensed • No Account Required</p>
    </div>
  </div>
</div>

<footer bp-layout="block gap:md" style="padding: 48px 24px;">
  <div bp-layout="block gap:lg center" style="max-width: 1200px; margin: 0 auto;">
    <div bp-layout="inline gap:sm">
      <a href="/getting-started.html" bp-text="link">Documentation</a>
      <a href="/docs/components.html" bp-text="link">Components</a>
      <a href="https://github.com/blueprintui/blueprintui" bp-text="link">GitHub</a>
      <a href="https://github.com/blueprintui/blueprintui/discussions" bp-text="link">Discussions</a>
      <a href="https://github.com/blueprintui/blueprintui/issues" bp-text="link">Issues</a>
      <a href="https://coryrylan.com" bp-text="link">Blog</a>
    </div>
    <bp-divider></bp-divider>
    <div bp-layout="inline gap:sm inline:center">
      <p bp-text="caption">© ${new Date().getFullYear()} BlueprintUI. MIT License.</p>
    </div>
  </div>
</footer>

<script type="module">
  import '@blueprintui/icons/shapes/lightning.js';
  import '@blueprintui/icons/shapes/layers.js';
  import '@blueprintui/icons/shapes/shield-check.js';
  import '@blueprintui/icons/shapes/code.js';
  import '@blueprintui/icons/shapes/analytics.js';
  import '@blueprintui/icons/shapes/color-palette.js';
  import '@blueprintui/components/include/lazy.js';
  import './index.css';
  requestAnimationFrame(() => {
    const grid = document.querySelector('.home-demo-grid');
    for (let i = grid.children.length; i >= 0; i--) {
      const child = grid.children[Math.random() * i | 0];
      child.hidden = true;
      grid.appendChild(child);
      const time = Math.floor(Math.random() * (3000 - 1000 + 1) + 500);
      setTimeout(() => child.hidden = false, time);
    }
  });
</script>
`
}
