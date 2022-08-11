import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorageInputPageRoutingModule } from './storage-input-routing.module';

import { StorageInputPage } from './storage-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorageInputPageRoutingModule
  ],
  declarations: [StorageInputPage]
})
export class StorageInputPageModule {}
