import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tracker', loadChildren: './tracker/tracker.module#TrackerPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
