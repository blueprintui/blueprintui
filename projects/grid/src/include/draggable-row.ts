import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGrid } from '../grid/index.js';
import { DraggableGridRowController } from '../draggable-row/index.js';

DynamicControllers.add(BpGrid, DraggableGridRowController);
