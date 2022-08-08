import { Component, OnInit } from '@angular/core';
import { FoodstuffPage } from '../foodstuff/foodstuff.page';
import { Ingredient } from '../ingredient.model';
import { IngredientsService } from '../ingredients.service';
import { MeasurementUnit } from '../measurement-unit.model';
import { MeasurementUnitService } from '../measurement-unit.service';

@Component({
  selector: 'app-new-foodstuff',
  templateUrl: './new-foodstuff.component.html',
  styleUrls: ['./new-foodstuff.component.scss'],
})
export class NewFoodstuffComponent implements OnInit {
  fsName: string;
  measurement: MeasurementUnit;
  muId: number;
  measurements: MeasurementUnit[];
  ingredients: Ingredient[];

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private foodStuffPage: FoodstuffPage,
    private ingredientsService: IngredientsService
  ) { }

  ngOnInit() {
    this.measurementUnitService.getAllMeasurementUnits().subscribe(res=>{
      this.measurements = res;
    });
    this.ingredientsService.getAllIngredients().subscribe(res=>{
      this.ingredients = res;
    });
  }

  saveFoodstuff() {
    //Refresh fix je da se u FoodstuffPage pozove save funkcija, kao sto je urađeno za MeasurementUnit page
    this.foodStuffPage.saveFoodstuff(this.fsName, this.muId);
    this.fsName = '';
    this.muId = null;
  }

  categoryChanged(ev){
    this.muId = ev.target.value;
  }
}
