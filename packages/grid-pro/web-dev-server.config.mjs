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
            '@blueprintui/grid-pro/internals': '/dist/lib/internals/index.js',
            '@blueprintui/grid-pro/include/column-resize.js': '/dist/lib/include/column-resize.js',
            '@blueprintui/grid-pro/csv': '/dist/lib/csv/index.js',
            '@blueprintui/grid-pro/include/csv.js': '/dist/lib/include/csv.js',
            '@blueprintui/grid-pro/include/detail.js': '/dist/lib/include/detail.js',
            '@blueprintui/grid-pro/include/range-selection.js': '/dist/lib/include/range-selection.js'
          }
        }
      }
    })
  ]
});
