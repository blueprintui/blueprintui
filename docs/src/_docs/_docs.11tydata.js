module.exports = {
  layout: 'docs.11ty.js',
  eleventyComputed: {
    permalink: 'docs/{{page.filePathStem | remove: "_docs"}}.html'
  },
}
