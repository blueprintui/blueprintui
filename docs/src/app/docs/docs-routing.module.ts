import { DocsWhyGridsComponent } from './docs-why-grids/docs-why-grids.component';
import { DocsPerformanceComponent } from './docs-performance/docs-performance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './docs/docs.component';
import { DocsHomeComponent } from './docs-home/docs-home.component';
import { DocsGridComponent } from './docs-grid/docs-grid.component';
import { DocsColumnOrderingComponent } from './docs-column-ordering/docs-column-ordering.component';
import { DocsColumnGapSpacingComponent } from './docs-column-gap-spacing/docs-column-gap-spacing.component';
import { DocsColumnNestingComponent } from './docs-column-nesting/docs-column-nesting.component';
import { DocsColumnAlignmentComponent } from './docs-column-alignment/docs-column-alignment.component';
import { DocsColumnCenteringComponent } from './docs-column-centering/docs-column-centering.component';
import { DocsColumnOffsetComponent } from './docs-column-offset/docs-column-offset.component';
import { DocsUtilMaxWidthComponent } from './docs-util-max-width/docs-util-max-width.component';
import { DocsUtilFullWidthComponent } from './docs-util-full-width/docs-util-full-width.component';
import { DocsUtilFitFillComponent } from './docs-util-fit-fill/docs-util-fit-fill.component';
import { DocsUtilVisibilityComponent } from './docs-util-visibility/docs-util-visibility.component';
import { DocsUtilSpacingComponent } from './docs-util-spacing/docs-util-spacing.component';
import { DocsUtilFloatsComponent } from './docs-util-floats/docs-util-floats.component';
import { DocsErrorsComponent } from './docs-errors/docs-errors.component';
import { DocsUtilTextAlignmentComponent } from './docs-util-text-alignment/docs-util-text-alignment.component';
import { DocsEditorSupportComponent } from './docs-editor-support/docs-editor-support.component';
import { DocsBrowserSupportComponent } from './docs-browser-support/docs-browser-support.component';

const routes: Routes = [
  {
    path: '', component: DocsComponent, children: [
      { path: '', component: DocsHomeComponent },
      { path: 'grid', component: DocsGridComponent },
      { path: 'column-alignment', component: DocsColumnAlignmentComponent },
      { path: 'column-centering', component: DocsColumnCenteringComponent },
      { path: 'column-nesting', component: DocsColumnNestingComponent },
      { path: 'column-offset', component: DocsColumnOffsetComponent },
      { path: 'column-ordering', component: DocsColumnOrderingComponent },
      { path: 'column-gap-spacing', component: DocsColumnGapSpacingComponent },
      { path: 'util-max-width', component: DocsUtilMaxWidthComponent },
      { path: 'util-full-width', component: DocsUtilFullWidthComponent },
      { path: 'util-flex-fit-and-fill', component: DocsUtilFitFillComponent },
      { path: 'util-visibility', component: DocsUtilVisibilityComponent },
      { path: 'util-spacing', component: DocsUtilSpacingComponent },
      { path: 'util-text-alignment', component: DocsUtilTextAlignmentComponent },
      { path: 'util-floats', component: DocsUtilFloatsComponent },
      { path: 'errors', component: DocsErrorsComponent },
      { path: 'editor-support', component: DocsEditorSupportComponent },
      { path: 'browser-support', component: DocsBrowserSupportComponent },
      { path: 'performance', component: DocsPerformanceComponent },
      { path: 'why-grids-and-utilities', component: DocsWhyGridsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
