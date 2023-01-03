import { KeyGridController } from '@blueprintui/typewriter';
import type { BpGrid } from '../grid/element.js';

class Controller extends KeyGridController<BpGrid> {
  constructor(host: BpGrid) {
    super(host, () => ({
      host: host.keyNavGrid,
      grid: host.grid
    }));
  }
}

await customElements.whenDefined('bp-grid');
(customElements.get('bp-grid') as any).controllers.add(Controller);
