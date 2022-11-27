export var data = {
  layout: 'base.11ty.js',
  tags: 'docs'
}

export function render (data) {
  return /* html */`
  <article bp-layout="block gap:md">
    <div bp-layout="inline inline:end">
      <h1 bp-text="banner" bp-layout="inline:start">${data.title}</h1>
      <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CKYILKJ7&placement=coryrylancom" id="_carbonads_js"></script>
    </div>
    <bp-divider></bp-divider>
    ${data.content}
  </article>`;
}
