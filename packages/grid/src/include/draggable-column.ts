import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGrid } from '../grid/index.js';
import { DraggableGridColumnController } from '../draggable-column/index.js';

DynamicControllers.add(BpGrid, DraggableGridColumnController);
