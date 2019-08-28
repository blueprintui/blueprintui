import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Blueprint CSS - CSS Grid and Layout Library' } },
  { path: 'docs', loadChildren: './docs/docs.module#DocsModule', data: { title: 'Blueprint CSS - Documentation' } },
  { path: 'about', loadChildren: './about/about.module#AboutModule', data: { title: 'Blueprint CSS - About' } },
  { path: 'support', loadChildren: './support/support.module#SupportModule', data: { title: 'Blueprint CSS - Support' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
