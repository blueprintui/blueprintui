export const data = {
  layout: 'base.11ty.js',
  eleventyExcludeFromCollections: true,
  templateEngineOverride: '11ty.js,md'
}

export function render(data) {
  return /* html */`
  <article bp-layout="grid gap:md" ${data.schema && data.schema.elements[0] ? 'component-doc' : ''} >
    <div id="article-content" bp-layout="${data.layout === 'doc.11ty.js' ? 'col:10@lg' : 'col:12'} block gap:md">
      <div bp-layout="inline inline:end fill">
        <div bp-layout="block gap:md inline:start">
          <h1 bp-text="banner" id="description">${data.title}</h1>
          <!-- <a href="https://badge.fury.io/js/@blueprintui%2Fcomponents" bp-layout="block:end"><img src="https://badge.fury.io/js/@blueprintui%2Fcomponents.svg" /></a> -->
          ${data.schema && data.schema.elements[0] ? /* html */`
          <div bp-layout="inline gap:xs">
            ${data.package ? /* html */`<a href="https://www.npmjs.com/package/${data.package.name}" target="_blank"><bp-tag>npm<bp-badge>${data.package.version}</bp-badge></bp-tag></a>` : ''}
            <a href="https://github.com/blueprintui" target="_blank"><bp-tag>github <svg width="15" height="15"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#github-svg"></use></svg></bp-tag></a>
            ${data.aria ? /* html */`
            <a href="${data.aria}" target="_blank">
              <bp-tag>aria
                <svg width="22" height="16">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#w3c-svg"></use>
                </svg></a>` : ''}
          </div>` : ''}
        </div>
        <div style="width: 1px; height: 110px;"></div>
        <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CKYILKJ7&placement=coryrylancom" id="_carbonads_js"></script>
      </div>
      <bp-divider bp-layout="m-b:sm"></bp-divider>
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
      document.querySelector('#anchor-aside').append(...links);
    } else {
      document.querySelector('#anchor-aside').remove();
      document.querySelector('#article-content').setAttribute('bp-layout', 'col:12 block gap:md');
    }
  </script>
  `;
}
