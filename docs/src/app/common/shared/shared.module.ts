import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeComponent } from './code/code.component';
import { CarbonAdComponent } from './carbon-ad/carbon-ad.component';
import { TabsComponent, TabComponent } from './tabs/tabs.component';

const components = [
  CodeComponent,
  CarbonAdComponent,
  TabComponent,
  TabsComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }
