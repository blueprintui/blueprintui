import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGrid } from '../grid/element.js';
import { ClipboardController } from '../clipboard/index.js';

class Controller extends ClipboardController {
  constructor(host: BpGrid) {
    super(host);
  }
}

DynamicControllers.add(BpGrid, Controller);
