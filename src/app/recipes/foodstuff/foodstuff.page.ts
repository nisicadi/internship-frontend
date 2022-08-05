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
    this.foodstuffService.getAllFoodstuff().subscribe(res=>{
      this.foodstuffs = res;
    });
  }

  setOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

}
