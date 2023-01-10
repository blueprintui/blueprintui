export default {
  layout: 'doc.11ty.js',
  templateEngineOverride: '11ty.js,md',
  github: 'https://github.com/blueprintui',
  package: {
    name: '@blueprintui/layout',
    version: '1.0.0'
  },
  eleventyComputed: {
    permalink: data => `/docs/layout/${data.page.fileSlug}/index.html`
  },
  tags: []
}
