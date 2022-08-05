import { Component, OnInit } from '@angular/core';
import { MeasurementUnitsPage } from '../measurement-units/measurement-units.page';

@Component({
  selector: 'app-new-measurement-unit',
  templateUrl: './new-measurement-unit.component.html',
  styleUrls: ['./new-measurement-unit.component.scss'],
})
export class NewMeasurementUnitComponent implements OnInit {
  mu: string;
  muName: string;

  constructor(
    private measurementUnitPage: MeasurementUnitsPage
  ) { }

  ngOnInit() {}

  saveMeasurementUnit() {
    this.measurementUnitPage.saveMeasurementUnit(this.mu, this.muName);
  }
}
