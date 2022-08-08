exports.data = {
  eleventyExcludeFromCollections: true,
  addAllPagesToCollections: true,
  permalink: 'sitemap.xml'
};

exports.render = function ({ collections }) {
  return /*html*/`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${collections.all.reverse().filter(i => i.url !== '/404.html').map(i => `
    <url>
      <loc>https://example.com${i.url.replace('.html', '')}</loc>
      <lastmod>${i.updated ? new Date(i.updated).toISOString() : new Date(i.date).toISOString()}</lastmod>
${i.data.tags == 'post' ? `      <changefreq>weekly</changefreq>\n      <priority>1.0</priority>` : ''}
    </url>`).join(' ')} 
  </urlset>
  `.trim();
};
