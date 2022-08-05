import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMeasurementUnitComponent } from './new-measurement-unit.component';

describe('NewMeasurementUnitComponent', () => {
  let component: NewMeasurementUnitComponent;
  let fixture: ComponentFixture<NewMeasurementUnitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMeasurementUnitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
