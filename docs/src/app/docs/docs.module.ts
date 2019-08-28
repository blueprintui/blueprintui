import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../common/shared/shared.module';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { DocsHomeComponent } from './docs-home/docs-home.component';
import { DocsGridComponent } from './docs-grid/docs-grid.component';
import { DocsColumnAlignmentComponent } from './docs-column-alignment/docs-column-alignment.component';
import { DocsColumnCenteringComponent } from './docs-column-centering/docs-column-centering.component';
import { DocsColumnOrderingComponent } from './docs-column-ordering/docs-column-ordering.component';
import { DocsColumnGapSpacingComponent } from './docs-column-gap-spacing/docs-column-gap-spacing.component';
import { DocsColumnOffsetComponent } from './docs-column-offset/docs-column-offset.component';
import { DocsColumnNestingComponent } from './docs-column-nesting/docs-column-nesting.component';
import { DocsUtilContainerComponent } from './docs-util-container/docs-util-container.component';
import { DocsUtilMaxWidthComponent } from './docs-util-max-width/docs-util-max-width.component';
import { DocsUtilFullWidthComponent } from './docs-util-full-width/docs-util-full-width.component';
import { DocsUtilFitFillComponent } from './docs-util-fit-fill/docs-util-fit-fill.component';
import { DocsUtilVisibilityComponent } from './docs-util-visibility/docs-util-visibility.component';
import { DocsUtilSpacingComponent } from './docs-util-spacing/docs-util-spacing.component';
import { DocsUtilTextAlignmentComponent } from './docs-util-text-alignment/docs-util-text-alignment.component';
import { DocsUtilFloatsComponent } from './docs-util-floats/docs-util-floats.component';
import { DocsErrorsComponent } from './docs-errors/docs-errors.component';
import { DocsEditorSupportComponent } from './docs-editor-support/docs-editor-support.component';
import { DocsBrowserSupportComponent } from './docs-browser-support/docs-browser-support.component';
import { DocsPerformanceComponent } from './docs-performance/docs-performance.component';
import { DocsWhyGridsComponent } from './docs-why-grids/docs-why-grids.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DocsRoutingModule
  ],
  declarations: [
    DocsComponent,
    DocsHomeComponent,
    DocsGridComponent,
    DocsColumnAlignmentComponent,
    DocsColumnCenteringComponent,
    DocsColumnOrderingComponent,
    DocsColumnGapSpacingComponent,
    DocsColumnOffsetComponent,
    DocsColumnNestingComponent,
    DocsUtilContainerComponent,
    DocsUtilMaxWidthComponent,
    DocsUtilFullWidthComponent,
    DocsUtilFitFillComponent,
    DocsUtilVisibilityComponent,
    DocsUtilSpacingComponent,
    DocsUtilTextAlignmentComponent,
    DocsUtilFloatsComponent,
    DocsErrorsComponent,
    DocsEditorSupportComponent,
    DocsBrowserSupportComponent,
    DocsPerformanceComponent,
    DocsWhyGridsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocsModule { }
