export default {
  layout: 'doc.11ty.js',
  templateEngineOverride: '11ty.js,md',
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/components',
    version: '1.8.3'
  },
  eleventyComputed: {
    permalink: data => data.permalink ? data.permalink : `/docs/components/${data.page.fileSlug}.html`
  },
  tags: []
}
