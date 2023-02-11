import { DraggableListController } from '@blueprintui/crane';
import { BpGrid } from '@blueprintui/grid';

export class DraggableGridRowController extends DraggableListController<BpGrid> {
  constructor(host: BpGrid) {
    super(host, () => ({
      manageFocus: true,
      manageTabindex: true,
      items: host.querySelectorAll('bp-grid-row'),
      dropZones: host.querySelectorAll('bp-grid-placeholder')
    }));
  }
}
