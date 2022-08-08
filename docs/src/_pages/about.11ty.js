export var data = {
  title: 'About Page',
  tags: [],
  layout: 'page.11ty.js',
  permalink: 'about.html',
}

export function render() {
  return /* html */`
  <div bp-layout="block gap:md">
    <h1 bp-text="banner" bp-layout="m-b:md">About</h1>

    <p bp-text="content">
      Blueprint CSS works very well with component heavy applications such as Angular, Vue and React but also can be used with content based sites as well.
      While we encourage use of CSS Grid and Flexbox in standalone CSS, Blueprint's goal is to make it easy to create common layout patterns with very little code. Unified layout utilities scale very well on large teams.
    </p>

    <bp-divider></bp-divider>

    <h2 bp-text="heading">Contribute</h2>
    <p bp-text="content">
      Contribute via Github or become a Sponsor! Built and maintained by <a bp-text="link" href="https://coryrylan.com">Cory Rylan</a>.
    </p>

    <div bp-layout="inline gap:sm">
      <bp-button action="outline"><a href="https://github.com/blueprintui/layout/tree/topic/next">Github</a></bp-button>
      <bp-button action="outline"><a href="https://github.com/sponsors/blueprintui">Sponsor 💙</a></bp-button>  
    </div>
  </div>
  `;
}
