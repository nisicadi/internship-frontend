import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodstuffPageRoutingModule } from './foodstuff-routing.module';

import { FoodstuffPage } from './foodstuff.page';
import { NewFoodstuffComponent } from '../new-foodstuff/new-foodstuff.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodstuffPageRoutingModule
  ],
  declarations: [FoodstuffPage, NewFoodstuffComponent]
})
export class FoodstuffPageModule {}
