import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGrid } from '../grid/element.js';
import { ColumnSpanController } from '../column-span/index.js';

class Controller extends ColumnSpanController {
  constructor(host: BpGrid) {
    super(host);
  }
}

DynamicControllers.add(BpGrid, Controller);
