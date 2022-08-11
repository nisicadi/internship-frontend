import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private foodstuffService: FoodstuffService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.refreshList();
  }
  saveFoodstuff(fsName: string, muId: number, minValue: number) {
    //Validate input values
    if(!fsName || !fsName.trim() || fsName.length > 255 ||
      muId < 0 || minValue < 0)
    {
      this.alertCtrl.create({
        header: 'Invalid inputs',
        message: 'Check your inputs and try again.',
        buttons: ['OK']
      }).then(alertEl => {
        alertEl.present();
      });

      return;
    }
    const tempFS: Foodstuff = {
      foodstuffId: 0,
      foodstuffName: fsName,
      measurementId: muId,
      measurement: null,
      ingredients: []
    };
    this.foodstuffService?.addFoodstuff(tempFS, Number(minValue)).subscribe(res=>{
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
