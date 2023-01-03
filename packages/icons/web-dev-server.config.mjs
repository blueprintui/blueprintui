const watch = process.argv.includes('--watch');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: './sandbox/',
  watch: !watch,
  nodeResolve: {
    exportConditions: ['production'],
  },
  plugins: [ ],
});
