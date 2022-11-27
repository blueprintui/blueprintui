export const data = {
  layout: 'base.11ty.js',
  eleventyExcludeFromCollections: true,
  templateEngineOverride: '11ty.js,md'
}

export function render(data) {
  return /* html */`
  <article bp-layout="grid gap:md">
    <div bp-layout="${data.schema ? 'col:10@lg' : 'col:12'} block gap:md">
      <div bp-layout="inline inline:end fill">
        <div bp-layout="block gap:md inline:start">
          <h1 bp-text="banner" id="description">${data.title}</h1>
          <!-- <a href="https://badge.fury.io/js/@blueprintui%2Fcomponents" bp-layout="block:end"><img src="https://badge.fury.io/js/@blueprintui%2Fcomponents.svg" /></a> -->
          ${data.schema && data.schema.elements[0] ? /* html */`
          <div bp-layout="inline gap:xs">
            <a href="https://www.npmjs.com/package/@blueprintui/components" target="_blank"><bp-tag status="success">npm<bp-badge status="success">0.0.24</bp-badge></bp-tag></a>
            <a href="https://github.com/blueprintui" target="_blank"><bp-tag>github</bp-tag></a>
          </div>` : ''}
        </div>
        <div style="width: 1px; height: 110px;"></div>
        <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CKYILKJ7&placement=coryrylancom" id="_carbonads_js"></script>
      </div>
      <bp-divider bp-layout="m-b:sm"></bp-divider>
      ${data.content}
    </div>
    ${data.schema ? /* html */`
    <aside bp-layout="col:2@lg block gap:sm">
      <a href="${data.permalink}#description">Description</a>
      <a href="${data.permalink}#install">Install</a>
      ${data.schema.elements[0] ? /* html */`<a href="${data.permalink}#${data.schema.elements[0].tagName}-api">API</a>` : ''}
    </aside>` : ''}
  </article>
  <script type="module">
    const anchors = Array.from(document.querySelectorAll('[id*="example-"]'));
    if (anchors.length) {
      const links = anchors.map(anchor => {
        const link = document.createElement('a');
        link.href = '${data.permalink}#' + anchor.id;
        link.textContent = anchor.textContent;
        return link;
      });
      document.querySelector('aside').append(...links);
    }
  </script>
  `;
}
