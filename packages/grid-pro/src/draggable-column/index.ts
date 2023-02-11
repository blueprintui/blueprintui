import { DraggableListController } from '@blueprintui/crane';
import { BpGrid } from '@blueprintui/grid';

export class DraggableGridColumnController extends DraggableListController<BpGrid> {
  constructor(host: BpGrid) {
    super(host, () => ({
      manageFocus: true,
      manageTabindex: true,
      items: host.querySelectorAll('bp-grid-column'),
      dropZones: []
    }));
  }
}
