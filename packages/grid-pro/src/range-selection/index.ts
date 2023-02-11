import { InteractionRangeSelectionController } from '@blueprintui/components/internals';
import { BpGrid } from '@blueprintui/grid';

export class GridRangeSelectionController extends InteractionRangeSelectionController<BpGrid> {
  constructor(host: BpGrid) {
    super(host, () => ({
      rangeSelection: host.rangeSelection,
      grid: host.grid
    }));
  }
}
