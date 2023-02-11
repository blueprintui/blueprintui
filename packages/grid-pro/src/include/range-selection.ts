import { DynamicControllers } from '@blueprintui/components/internals';
import { GridRangeSelectionController } from '../range-selection/index.js';
import { BpGrid } from '@blueprintui/grid';

DynamicControllers.add(BpGrid, GridRangeSelectionController);
