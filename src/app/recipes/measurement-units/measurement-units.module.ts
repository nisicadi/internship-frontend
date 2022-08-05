import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeasurementUnitsPageRoutingModule } from './measurement-units-routing.module';

import { MeasurementUnitsPage } from './measurement-units.page';
import { NewMeasurementUnitComponent } from '../new-measurement-unit/new-measurement-unit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeasurementUnitsPageRoutingModule
  ],
  declarations: [MeasurementUnitsPage, NewMeasurementUnitComponent]
})
export class MeasurementUnitsPageModule {}
