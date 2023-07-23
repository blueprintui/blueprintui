export const data = {
  layout: 'base.11ty.js',
  eleventyExcludeFromCollections: true,
  templateEngineOverride: '11ty.js,md'
}

export function render(data) {
  return /* html */`
  <article bp-layout="grid gap:md" ${data.schema && data.schema.elements[0] ? 'component-doc' : ''} >
    <div id="article-content" bp-layout="${data.layout === 'doc.11ty.js' ? 'col:10@lg' : 'col:12'} block gap:md">
      <div bp-layout="inline inline:end fill" class="article-header-section">
        <div bp-layout="block gap:md inline:start">
          <h1 bp-text="banner" id="description">${data.title}</h1>
          <div bp-layout="inline gap:xs">
            ${data.package ? /* html */`<a href="https://www.npmjs.com/package/${data.package.name}" target="_blank"><bp-tag>npm${data.package.version ? /* html */`<bp-badge>${data.package.version}</bp-badge>` : ''}</bp-tag></a>` : ''}
            ${data.github ? /* html */`<a href="${data.github}" target="_blank"><bp-tag>github <svg width="15" height="15"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#github-svg"></use></svg></bp-tag></a>` : ''}
            ${data.aria ? /* html */`
            <a href="${data.aria}" target="_blank">
              <bp-tag>aria
                <svg width="22" height="16">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#w3c-svg"></use>
                </svg>
              </bp-tag>
            </a>` : ''}
          </div>
        </div>
        <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CKYILKJ7&placement=coryrylancom" id="_carbonads_js"></script>
      </div>
      <bp-divider bp-layout="m-b:sm"></bp-divider>
      ${data.experimental ? /* html */`
      <bp-alert-group status="warning">
        <bp-alert>
          <bp-icon shape="flask" type="solid" slot="icon" size="sm"></bp-icon>
          Experimental: work in progress with no guarantees of API stability
        </bp-alert>
      </bp-alert-group>
      ` : ''}
      ${data.pro ? /* html */`
      <bp-alert-group status="accent">
        <bp-alert>
          <p>Commercial license required to use this feature. <a bp-text="link" href="/pricing.html">Learn more</a>.</p>
        </bp-alert>
      </bp-alert-group>
      ` : ''}
      ${data.content}
    </div>
    ${data.layout === 'doc.11ty.js' ? /* html */`
    <aside id="anchor-aside" bp-layout="col:2@lg block gap:sm">
      ${data.schema
        ? /* html */`
        <a href="${data.permalink}#description">Description</a>
        <a href="${data.permalink}#install">Install</a>
        ${data.schema.elements[0] ? /* html */`<a href="${data.permalink}#${data.schema.elements[0].tagName}-api">API</a>` : ''}`
        : /* html */``}
    </aside>` : /* html */``}
  </article>
  <script type="module">
    const anchors = Array.from(document.querySelectorAll('[id*="example-"], [docs-heading]'));
    const aside = document.querySelector('#anchor-aside');
    if (anchors.length > 3 || document.querySelector('[component-doc]')) {
      const links = anchors.map(anchor => {
        anchor.id ||= 'h-' + anchor.getAttribute('docs-heading');

        const link = document.createElement('a');
        link.href = '${data.permalink}#' + anchor.id;
        link.textContent = anchor.textContent;

        if (anchor.tagName === 'H3') {
          link.style.paddingLeft = '12px';
        }

        return link;
      });
      
      aside.append(...links);

      const { height } = getComputedStyle(aside);
      if (parseInt(height.replace('px', '')) > window.innerHeight - 200) {
        aside.style.position = 'initial';
      }
    } else {
      aside.remove();
      document.querySelector('#article-content').setAttribute('bp-layout', 'col:12 block gap:md');
    }
  </script>
  `;
}
