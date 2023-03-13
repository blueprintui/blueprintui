import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGridRow } from '../row/element.js';
import { RowPositionController } from '../row/position.controller.js';

class Controller extends RowPositionController {
  constructor(host: BpGridRow) {
    super(host);
  }
}

DynamicControllers.add(BpGridRow, Controller);
