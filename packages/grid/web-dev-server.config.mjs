import { importMapsPlugin } from '@web/dev-server-import-maps';

const watch = process.argv.includes('--watch');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: './sandbox/',
  watch: !watch,
  nodeResolve: {
    exportConditions: ['development']
  },
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '@blueprintui/grid/internals': '/dist/lib/internals/index.js',
            '@blueprintui/grid/include/core': '/dist/lib/include/core.js',
            '@blueprintui/grid/include/core.js': '/dist/lib/include/core.js',
            '@blueprintui/grid/include/keynav': '/dist/lib/include/keynav.js',
            '@blueprintui/grid/include/keynav.js': '/dist/lib/include/keynav.js',
            '@blueprintui/grid/include/hover': '/dist/lib/include/hover.js',
            '@blueprintui/grid/include/hover.js': '/dist/lib/include/hover.js',
            '@blueprintui/grid/include/footer': '/dist/lib/include/footer.js',
            '@blueprintui/grid/include/footer.js': '/dist/lib/include/footer.js',
            '@blueprintui/grid/include/placeholder': '/dist/lib/include/placeholder.js',
            '@blueprintui/grid/include/placeholder.js': '/dist/lib/include/placeholder.js',
            '@blueprintui/grid/include/pagination': '/dist/lib/include/pagination.js'
          }
        }
      }
    })
  ]
});
