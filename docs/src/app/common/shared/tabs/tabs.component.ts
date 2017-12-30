import {
  Component, EventEmitter, Host, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit, OnChanges {
  @Input() activeTabIndex: number;
  @Input() neutral = false;
  @Output() readonly activeTabIndexChange = new EventEmitter<number>();
  @Output() readonly tabChange = new EventEmitter();

  readonly tabs: TabComponent[] = [];

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.setActiveTab((changes.currentValue as any).activeTabIndex);
  }

  selectTab(tab: TabComponent) {
    this.setActiveTab(tab);
    this.activeTabIndexChange.emit(this.tabs.indexOf(tab));
  }

  addTab(tab: TabComponent) {
    this.tabs.push(tab);
  }

  private setActiveTab(activeTab: TabComponent) {
    for (const tab of this.tabs) {
      tab.active = false;
    }

    activeTab.active = true;
  }
}

@Component({
  selector: 'app-tab',
  template: `
    <div *ngIf="active && !templateRef" class="app-tab__content">
      <ng-content></ng-content>
    </div>
    <div *ngIf="active && templateRef" class="app-tab__content">
      <ng-template [ngTemplateOutlet]="templateRef"></ng-template>
    </div>
  `
})
export class TabComponent {
  @Input() name: string;
  @Input() active = false;
  @Input() templateRef: TemplateRef<any>;

  constructor(@Host() tabsComponent: TabsComponent) {
    tabsComponent.addTab(this);
  }
}
