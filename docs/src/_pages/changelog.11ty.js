import fs from 'fs';

const changelog = fs
  .readFileSync('../packages/components/CHANGELOG.md', 'utf8')
  .replace('# Changelog', '## @blueprintui/components');

export const data = {
  title: 'Changelog',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'changelog.html',
}

export function render() {
  return /* markdown */`
${changelog}
  `;
}
