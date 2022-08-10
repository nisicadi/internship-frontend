import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoragesPage } from './storages.page';

const routes: Routes = [
  {
    path: '',
    component: StoragesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoragesPageRoutingModule {}
