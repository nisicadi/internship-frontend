import { Component, OnInit } from '@angular/core';
import { Foodstuff } from '../foodstuff.model';
import { FoodstuffService } from '../foodstuff.service';

@Component({
  selector: 'app-foodstuff',
  templateUrl: './foodstuff.page.html',
  styleUrls: ['./foodstuff.page.scss'],
})
export class FoodstuffPage implements OnInit {
  isModalOpen: boolean;
  foodstuffs: Foodstuff[];
  constructor(
    private foodstuffService: FoodstuffService
  ) { }

  ngOnInit() {
    this.refreshList();
  }
  saveFoodstuff(fsName: string, muId: number) {
    const tempFS: Foodstuff = {
      foodstuffId: 0,
      foodstuffName: fsName,
      measurementId: muId,
      measurement: null,
      ingredients: []
    };

    this.foodstuffService?.addFoodstuff(tempFS).subscribe(res=>{
      this.refreshList();
    });

    this.setOpen(false);
  }

  setOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  refreshList() {
    this.foodstuffService.getAllFoodstuff().subscribe(res=>{
      this.foodstuffs = res;
    });
  }
}
