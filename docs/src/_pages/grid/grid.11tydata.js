export default {
  layout: 'doc.11ty.js',
  templateEngineOverride: '11ty.js,md',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
  package: {
    name: '@blueprintui/grid',
    version: '0.0.0'
  },
  eleventyComputed: {
    permalink: data => data.permalink ? data.permalink : `/docs/grid/${data.page.fileSlug}.html`
  },
  tags: []
}
