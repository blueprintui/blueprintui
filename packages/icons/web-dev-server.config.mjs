import { importMapsPlugin } from '@web/dev-server-import-maps';

const watch = process.argv.includes('--watch');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: './sandbox/',
  watch: !watch,
  nodeResolve: {
    exportConditions: ['production'],
  },
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '@blueprintui/icons': '/dist/lib/index.js',
            '@blueprintui/icons/include': '/dist/lib/include.js',
            '@blueprintui/icons/include.js': '/dist/lib/include.js',
            '@blueprintui/icons/shapes/shapes.js': '/dist/lib/shapes/shapes.js',
            '@blueprintui/icons/shapes/menu.js': '/dist/lib/shapes/menu.js',
            '@blueprintui/icons/shapes/user.js': '/dist/lib/shapes/user.js'
          },
        },
      },
    }),
  ],
});
