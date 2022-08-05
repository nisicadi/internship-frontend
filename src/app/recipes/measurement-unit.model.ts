import { Foodstuff } from './foodstuff.model';

export interface MeasurementUnit {
    measurementId: number;
    measurement: string;
    measurementLong: string;
    foodstuffs: Foodstuff[];
}
