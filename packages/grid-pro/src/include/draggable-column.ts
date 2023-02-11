import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGrid } from '@blueprintui/grid';
import { DraggableGridColumnController } from '../draggable-column/index.js';

DynamicControllers.add(BpGrid, DraggableGridColumnController);
