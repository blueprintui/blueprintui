import { DynamicControllers } from '@blueprintui/components/internals';
import { BpGridColumn } from '../column/index.js';
import { GridColumnResizeController } from '../column-resize/index.js';

DynamicControllers.add(BpGridColumn, GridColumnResizeController);
