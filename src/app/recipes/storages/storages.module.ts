import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoragesPageRoutingModule } from './storages-routing.module';

import { StoragesPage } from './storages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoragesPageRoutingModule
  ],
  declarations: [StoragesPage]
})
export class StoragesPageModule {}
