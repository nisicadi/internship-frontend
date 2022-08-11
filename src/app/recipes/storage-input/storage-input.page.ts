import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foodstuff } from '../foodstuff.model';
import { FoodstuffService } from '../foodstuff.service';
import { StorageInput } from '../storage-input.model';
import { StorageInputService } from '../storage-input.service';

@Component({
  selector: 'app-storage-input',
  templateUrl: './storage-input.page.html',
  styleUrls: ['./storage-input.page.scss'],
})
export class StorageInputPage implements OnInit {
  foodstuffs: Foodstuff[];
  ingQuantity: number;
  selectedFoodstuff: number;

  constructor(
    private foodstuffService: FoodstuffService,
    private storageInputService: StorageInputService,
    private router: Router
  ) { }

  ngOnInit() {
    this.foodstuffService.getAllFoodstuff().subscribe(res => {
      this.foodstuffs = res;
    });
  }

  foodstuffChanged(ev){
    this.selectedFoodstuff = ev.target.value;
  }

  saveChanges() {
    this.foodstuffService.getFoodstuff(this.selectedFoodstuff).subscribe(res=>{
      const newStorageInput: StorageInput = {
        storageInputId: 0,
        quantity: this.ingQuantity,
        foodstuff: res,
        foodstuffId: res.foodstuffId
      };
      this.storageInputService.addStorageInput(newStorageInput).subscribe();
    });

    this.router.navigate(['../']);
  }

  discardChanges() {
    this.router.navigate(['../']);
  }
}
