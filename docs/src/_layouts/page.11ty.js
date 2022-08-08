export var data = {
  layout: 'base.11ty.js',
  eleventyExcludeFromCollections: true
}

export function render(data) {
  return /* html */`
  ${data.content}
  `;
}
