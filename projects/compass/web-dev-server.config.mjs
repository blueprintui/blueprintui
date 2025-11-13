import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: { exportConditions: ['production', 'default'] },
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })]
};
