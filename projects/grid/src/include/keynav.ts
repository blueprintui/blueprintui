import { KeynavController } from '@blueprintui/typewriter';
import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGrid } from '../grid/element.js';

class Controller extends KeynavController<BpGrid> {
  constructor(host: BpGrid) {
    super(host, () => ({
      host: host.keyNavGrid,
      grid: host.grid
    }));
  }
}

DynamicControllers.add(BpGrid, Controller);
