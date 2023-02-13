import componentSchema from '../../packages/components/dist/drafter/schema.json';
import iconSchema from '../../packages/icons/dist/drafter/schema.json';
import gridSchema from '../../packages/grid/dist/drafter/schema.json';

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
      .filter(s => s.name !== 'internal' && s.name !== 'shell' && s.name !== 'popover' && s.name !== 'divider' && s.name !== 'button-handle' && s.name !== 'dialog' && s.name !== 'button-resize' && s.name !== 'dropdown' && s.name !== 'menu' && s.name !== 'tooltip' && s.name !== 'drawer' && s.name !== 'pagination')
      .filter(s => s.examples.find(e => e.name.includes('example'))).map(c => {
      return /* html */`
        <div class="demo-grid-card" hidden>
          <a href="/docs/components/${c.name}.html" aria-label="${c.name} documentation" class="demo-grid-card-link"></a>
          <div class="demo-grid-content">${c.examples.find(e => e.name.includes('example')).src}</div>
        </div>
      `;
    }).join('')}
  </div>
  <div bp-layout="block gap:md inline:center">
    <div bp-layout="block gap:md center" style="height: 100vh; margin-top: -5vh;">
      ${logo}
      <h1 bp-text="heading center contrast:none" style="--font-size: 72px; font-weight: 200;">BlueprintUI</h1>
      <p bp-text="section center deploy contrast:none" style="--font-size: 36px; max-width: 920px;">
        Accelerate your development with flexible UI components and tools that work <strong>everywhere</strong>.
      </p>
      <div bp-layout="inline gap:xs inline:center m-t:sm" style="min-height: 36px">
        <bp-button status="accent">
          <a href="/getting-started.html">Start Building</a>
        </bp-button>
        <bp-button action="outline">
          <a href="/docs/components.html">Components</a>
        </bp-button>
      </div>
      <pre><code class="language-shell" style="border-radius: 4px; padding: 12px 24px; background: var(--bp-color-gray-700)">$ npm install @blueprintui/components</code></pre>
    </div> 
  </div>  
  <div bp-layout="grid gap:xl m-t:lg" style="max-width: 1000px; margin: 0 auto; min-height: 65vh">
    <div bp-layout="col:6@md block gap:md inline:center">
      <div class="element-example">
        <div><bp-alert status="success">hello there!</bp-alert></div>
        <details open>
          <summary>code</summary>
          <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/@blueprintui/themes/index.min.css<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><br><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.jsdelivr.net/npm/@blueprintui/components/include/alert.js/+esm<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span><br><br><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bp-alert</span> <span class="token attr-name">status</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>success<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>hello there!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bp-alert</span><span class="token punctuation">&gt;</span></span></code></pre>
        </details>
      </div>
    </div>
    <div bp-layout="col:6@md block gap:md">
      <ul bp-text="list subsection">
        <li>Easy to use Web Components</li>
        <li>Works in any Framework</li>
        <li>Responsive and Customizable Themes</li>
        <li>Layout, Typography, and Icons Utilites</li>
      </ul>
      <bp-button status="accent">
        <a href="/getting-started.html">Start Building</a>
      </bp-button>
    </div>
  </div>
</div>
<script type="module">
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
