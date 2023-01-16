export default eleventyConfig =>
  eleventyConfig.addShortcode('headTag', function ({ title, site, image, description }) {
    const pageDescription = description ? description : site.site.description;
    const pageTitle = title ? title : site.site.title;
    const pageImage = image ? image : site.site.image;

    return /* html */`
    <head>
      <meta charset="utf-8">
      <base href="/">
      <title>${pageTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="keywords" content="Web Components, UI Components, Design System, CSS">
      <meta name="description" content="${pageDescription}">
      <meta name="author" content="Cory Rylan">
      <meta name="theme-color" content="#4e7ac7">
      <link rel="icon" href="assets/images/icon.svg?v=1" type="image/png">
      <link href="/assets/index.css" rel="stylesheet" />

      <meta name="twitter:site" content="@coryrylan">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:image" content="${pageImage}">
      <meta name="twitter:title" content="${pageTitle.toLowerCase().includes('blueprint') ? '' : 'Blueprint UI - '}${pageTitle}">
      <meta name="twitter:description" content="${pageDescription}">

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-PPQV05BETG"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-PPQV05BETG');
      </script>
    </head>`
  });
