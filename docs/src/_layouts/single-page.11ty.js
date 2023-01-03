export function render(data) {
  const description = data.page.description ? data.page.description : data.site.description;

  return /* html */`<!DOCTYPE html>
    <html lang="en" bp-theme="modern modern-dark">
      ${this.headTag(data)}
      <body>
        ${data.content}
      </body>
    </html>
  `;
}