import { DocsWhyGridsComponent } from './docs-why-grids/docs-why-grids.component';
import { DocsPerformanceComponent } from './docs-performance/docs-performance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './docs.component';
import { DocsHomeComponent } from './docs-home/docs-home.component';
import { DocsGridComponent } from './docs-grid/docs-grid.component';
import { DocsColumnOrderingComponent } from './docs-column-ordering/docs-column-ordering.component';
import { DocsColumnGapSpacingComponent } from './docs-column-gap-spacing/docs-column-gap-spacing.component';
import { DocsColumnNestingComponent } from './docs-column-nesting/docs-column-nesting.component';
import { DocsColumnAlignmentComponent } from './docs-column-alignment/docs-column-alignment.component';
import { DocsColumnCenteringComponent } from './docs-column-centering/docs-column-centering.component';
import { DocsColumnOffsetComponent } from './docs-column-offset/docs-column-offset.component';
import { DocsUtilContainerComponent } from './docs-util-container/docs-util-container.component';
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
      { path: '', component: DocsHomeComponent, data: { title: 'Blueprint CSS Documentation' } },
      { path: 'grid', component: DocsGridComponent, data: { title: 'Blueprint CSS - Grid' } },
      { path: 'column-alignment', component: DocsColumnAlignmentComponent, data: { title: 'Blueprint CSS - Grid Column Alignment' } },
      { path: 'column-centering', component: DocsColumnCenteringComponent, data: { title: 'Blueprint CSS - Grid Column Centering' } },
      { path: 'column-nesting', component: DocsColumnNestingComponent, data: { title: 'Blueprint CSS - Grid Column Nesting' } },
      { path: 'column-offset', component: DocsColumnOffsetComponent, data: { title: 'Blueprint CSS - Grid Column Offset' } },
      { path: 'column-ordering', component: DocsColumnOrderingComponent, data: { title: 'Blueprint CSS - Grid Column Ordering' } },
      { path: 'column-gap-spacing', component: DocsColumnGapSpacingComponent, data: { title: 'Blueprint CSS - Grid Column Gap Spacing' } },
      { path: 'util-container', component: DocsUtilContainerComponent, data: { title: 'Blueprint CSS - Container' } },
      { path: 'util-max-width', component: DocsUtilMaxWidthComponent, data: { title: 'Blueprint CSS - Max Width' } },
      { path: 'util-full-width', component: DocsUtilFullWidthComponent, data: { title: 'Blueprint CSS - Full Width' } },
      { path: 'util-flex-fit-and-fill', component: DocsUtilFitFillComponent, data: { title: 'Blueprint CSS - Flex Fit & Fill' } },
      { path: 'util-visibility', component: DocsUtilVisibilityComponent, data: { title: 'Blueprint CSS - Visibility' } },
      { path: 'util-spacing', component: DocsUtilSpacingComponent, data: { title: 'Blueprint CSS - Spacing' } },
      { path: 'util-text-alignment', component: DocsUtilTextAlignmentComponent, data: { title: 'Blueprint CSS - Text Alignment' } },
      { path: 'util-floats', component: DocsUtilFloatsComponent, data: { title: 'Blueprint CSS - Floats' } },
      { path: 'errors', component: DocsErrorsComponent, data: { title: 'Blueprint CSS - Errors' } },
      { path: 'editor-support', component: DocsEditorSupportComponent, data: { title: 'Blueprint CSS - Editor Support' } },
      { path: 'browser-support', component: DocsBrowserSupportComponent, data: { title: 'Blueprint CSS - Browser Support' } },
      { path: 'performance', component: DocsPerformanceComponent, data: { title: 'Blueprint CSS - Performance' } },
      { path: 'why-grids-and-utilities', component: DocsWhyGridsComponent, data: { title: 'Blueprint CSS - Why Utilities' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
