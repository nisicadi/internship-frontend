import { Component, OnInit } from '@angular/core';
import { Foodstuff } from '../foodstuff.model';
import { FoodstuffService } from '../foodstuff.service';
import { FoodstuffPage } from '../foodstuff/foodstuff.page';
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

  constructor(
    private foodstuffService: FoodstuffService,
    private measurementUnitService: MeasurementUnitService,
    private foodStuffPage: FoodstuffPage
  ) { }

  ngOnInit() {
    this.measurementUnitService.getAllMeasurementUnits().subscribe(res=>{
      this.measurements = res;
    });
  }

  saveFoodstuff() {

    const tempFS: Foodstuff = {
      foodstuffId: 0,
      foodstuffName: this.fsName,
      measurementId: this.muId,
      measurement: null,
      ingredients: []
    };

    this.foodstuffService?.addFoodstuff(tempFS).subscribe();
    this.foodStuffPage.setOpen(false);
    //Refresh fix je da se u FoodstuffPage pozove save funkcija, kao sto je urađeno za MeasurementUnit page
  }

  categoryChanged(ev){
    this.muId = ev.target.value;
  }
}
