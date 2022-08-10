import { Component, OnInit } from '@angular/core';
import { FoodstuffService } from '../foodstuff.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.page.html',
  styleUrls: ['./storages.page.scss'],
})
export class StoragesPage implements OnInit {
  storages: Storage[];
  constructor(
    private storageService: StorageService,
    private foodstuffService: FoodstuffService
  ) { }

  ngOnInit() {
    this.storageService.getAllStorages().subscribe(res=>{
      this.storages = res;
      this.storages.forEach(element => {
        this.foodstuffService.getFoodstuff(element.foodstuffId).subscribe(res2 =>
          {
            element.foodstuff = res2;
          });
      });
    });
  }

}
