import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGridColumn } from '../column/element.js';
import { ColumnAlignmentController } from '../column/alignment.controller.js';

class Controller extends ColumnAlignmentController {
  constructor(host: BpGridColumn) {
    super(host);
  }
}

DynamicControllers.add(BpGridColumn, Controller);
