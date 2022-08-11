import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesPage
  },
  {
    path: 'recipe-detail',
    loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
  },
  {
    path: 'new-recipe',
    loadChildren: () => import('./new-recipe/new-recipe.module').then( m => m.NewRecipePageModule)
  },
  {
    path: 'measurement-units',
    loadChildren: () => import('./measurement-units/measurement-units.module').then( m => m.MeasurementUnitsPageModule)
  },
  {
    path: 'foodstuff',
    loadChildren: () => import('./foodstuff/foodstuff.module').then( m => m.FoodstuffPageModule)
  },
  {
    path: 'storages',
    loadChildren: () => import('./storages/storages.module').then( m => m.StoragesPageModule)
  },
  {
    path: 'storage-input',
    loadChildren: () => import('./storage-input/storage-input.module').then( m => m.StorageInputPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
