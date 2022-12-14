export default {
  layout: 'doc.11ty.js',
  templateEngineOverride: '11ty.js,md',
  eleventyComputed: {
    permalink: data => `/docs/layout/${data.page.fileSlug}/index.html`
  },
  tags: []
}
