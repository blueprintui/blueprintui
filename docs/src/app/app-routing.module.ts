import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs', loadChildren: './docs/docs.module#DocsModule' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'support', loadChildren: './support/support.module#SupportModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
