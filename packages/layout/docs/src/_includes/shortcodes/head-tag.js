export default eleventyConfig =>
  eleventyConfig.addShortcode('headTag', function (data) {
    const description = data.page.description ? data.page.description : data.site.description;

    return /* html */`
    <head>
      <meta charset="utf-8">
      <base href="/">
      <title>${data.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="keywords" content="CSS, Sass, Flexbox, CSS Grid, HTML, Responsive, Mobile">
      <meta name="description" content="${description ? description : 'A lightweight layout library for building great responsive mobile first UIs that work everywhere. Open Source, built with CSS Grid and Flexbox.'}">
      <meta name="author" content="Cory Rylan">
      <meta name="theme-color" content="#4e7ac7">
      <link rel="icon" href="assets/images/icon.png?v=1" type="image/png">
      <link href="/assets/index.css" rel="stylesheet" />

      <meta name="twitter:site" content="@coryrylan">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:image" content="https://layout.blueprintui.dev/assets/images/icon.png">
      <meta name="twitter:title" content="Blueprint Layout">
      <meta name="twitter:description" content="A lightweight layout library for building great responsive mobile first UIs that work everywhere. Open Source, built with CSS Grid and Flexbox.">

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-YLM5WKTL2B"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YLM5WKTL2B');
      </script>
    </head>`
  });
