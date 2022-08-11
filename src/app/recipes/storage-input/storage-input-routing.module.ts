import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageInputPage } from './storage-input.page';

const routes: Routes = [
  {
    path: '',
    component: StorageInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageInputPageRoutingModule {}
