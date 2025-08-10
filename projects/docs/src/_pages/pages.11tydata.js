export default {
  layout: 'doc.11ty.js',
  templateEngineOverride: '11ty.js,md',
  eleventyComputed: {
    permalink: data => `/${data.page.fileSlug}.html`
  },
  tags: []
}
