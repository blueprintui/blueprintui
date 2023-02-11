import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGrid } from '@blueprintui/grid';
import { DraggableGridRowController } from '../draggable-row/index.js';

DynamicControllers.add(BpGrid, DraggableGridRowController);
