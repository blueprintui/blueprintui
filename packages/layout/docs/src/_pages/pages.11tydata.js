export default {
  layout: 'page.11ty.js',
  eleventyComputed: {
    permalink: data => `/${data.page.fileSlug}.html`
  },
  tags: []
}
