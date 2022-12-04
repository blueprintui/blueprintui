import { KeyGridController } from '../internals/controllers/key-grid.controller.js';

await customElements.whenDefined('bp-grid');
(customElements.get('bp-grid') as any).controllers.add(KeyGridController);