export function render(data) {
  return /* html */`<!DOCTYPE html>
    <html lang="en" bp-theme="dark">
      ${this.headTag(data)}
      <body>
        ${data.content}
      </body>
    </html>
  `;
}