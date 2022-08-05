import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodstuffPage } from './foodstuff.page';

const routes: Routes = [
  {
    path: '',
    component: FoodstuffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodstuffPageRoutingModule {}
