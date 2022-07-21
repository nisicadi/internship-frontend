import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailPage } from './recipe-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeDetailPage
  },
  {
    path: 'edit-recipe',
    loadChildren: () => import('./edit-recipe/edit-recipe.module').then( m => m.EditRecipePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeDetailPageRoutingModule {}
