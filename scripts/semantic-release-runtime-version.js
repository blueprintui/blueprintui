const fs = require('fs');

// https://semantic-release.gitbook.io/semantic-release/developer-guide/plugin
function prepare(_, context) {
  const path = './packages/components/dist/lib/internals/utils/define.js';
  fs.writeFileSync(path, fs.readFileSync(path, 'utf8').replace('0.0.0', context.nextRelease.version));
}

module.exports = {
  prepare,
};