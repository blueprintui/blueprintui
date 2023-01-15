export function render(data) {
  return /* html */`<!DOCTYPE html>
    <html lang="en" bp-theme="modern modern-dark">
      ${this.headTag(data)}
      <body>
        ${data.content}
      </body>
    </html>
  `;
}