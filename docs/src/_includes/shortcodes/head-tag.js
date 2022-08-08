export default eleventyConfig =>
  eleventyConfig.addShortcode('headTag', function (data) {
    const description = data.page.description ? data.page.description : data.site.description;

    return /* html */`
    <head>
      <title>${data.title}</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="${description}">
      <link href="/assets/index.css" rel="stylesheet" />
    </head>`
  });
