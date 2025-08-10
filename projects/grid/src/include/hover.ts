import { DynamicControllers } from '@blueprintui/components/internals';
import { GridHoverController } from '../grid/hover.controller.js';
import { BpGrid } from '../grid/element.js';

class Controller extends GridHoverController {
  constructor(host: BpGrid) {
    super(host);
  }
}

DynamicControllers.add(BpGrid, Controller);
