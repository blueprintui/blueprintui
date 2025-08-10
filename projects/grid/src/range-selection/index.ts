import { InteractionRangeSelectionController } from '@blueprintui/components/internals';
import { BpGrid } from '../grid/index.js';

export class GridRangeSelectionController extends InteractionRangeSelectionController<BpGrid> {
  constructor(host: BpGrid) {
    super(host, () => ({
      rangeSelection: host.rangeSelection,
      grid: host.grid.slice(1)
    }));
  }
}
