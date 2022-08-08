import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MeasurementUnit } from '../measurement-unit.model';
import { MeasurementUnitService } from '../measurement-unit.service';

@Component({
  selector: 'app-measurement-units',
  templateUrl: './measurement-units.page.html',
  styleUrls: ['./measurement-units.page.scss'],
})
export class MeasurementUnitsPage implements OnInit {
  measurementUnits: MeasurementUnit[];
  isModalOpen: boolean;

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.measurementUnitService.getAllMeasurementUnits().subscribe(res=>{
        this.measurementUnits = res;
    });
  }

  setOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  saveMeasurementUnit(mu: string, muName: string) {
    if(!mu || !mu.trim() || mu.length > 2
    || !muName || !muName.trim() || muName.length > 50)
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

    const newMU: MeasurementUnit = {
      measurement: mu,
      measurementLong: muName,
      measurementId: 0,
      foodstuffs: null
    };

    this.measurementUnitService.addMeasurementUnit(newMU).subscribe(res=>{
      this.ngOnInit();
    });

    this.isModalOpen = false;
    mu = null;
    muName = null;
  }
}
