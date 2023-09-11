import { DynamicControllers } from '@blueprintui/components/internals';
import { GridRangeSelectionController } from '../range-selection/index.js';
import { BpGrid } from '../grid/index.js';

DynamicControllers.add(BpGrid, GridRangeSelectionController);
