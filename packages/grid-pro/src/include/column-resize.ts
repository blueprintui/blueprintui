import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGridColumn } from '@blueprintui/grid';
import { GridColumnResizeController } from '../column-resize/index.js';

DynamicControllers.add(BpGridColumn, GridColumnResizeController);
