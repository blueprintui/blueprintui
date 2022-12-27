export default {
  layout: 'doc.11ty.js',
  templateEngineOverride: '11ty.js,md',
  package: {
    name: '@blueprintui/components',
    version: '0.0.0'
  },
  eleventyComputed: {
    permalink: data => data.permalink ? data.permalink : `/docs/components/${data.page.fileSlug}.html`
  },
  tags: []
}
