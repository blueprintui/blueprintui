import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGridColumn } from '../column/element.js';
import { ColumnPositionController } from '../column/position.controller.js';

class Controller extends ColumnPositionController {
  constructor(host: BpGridColumn) {
    super(host);
  }
}

DynamicControllers.add(BpGridColumn, Controller);
