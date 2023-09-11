import { BpGridColumn } from '../column/index.js';
import { BpButtonResize } from '@blueprintui/components/button-resize';
import { InteractionResizeContextController } from '@blueprintui/components/internals';

export class GridColumnResizeController extends InteractionResizeContextController<BpGridColumn> {
  constructor(host: BpGridColumn) {
    super(host, () => ({
      resizer: this.host?.querySelector<BpButtonResize>('bp-button-resize'),
      max: parseInt(getComputedStyle(this.host.parentElement.parentElement).width)
    }));

    this.host.addEventListener('resize-input', (e: any) => {
      this.host.parentElement.parentElement.style.setProperty(`--ch${this.host.ariaColIndex}`, `${e.detail}px`);
    });
  }
}
