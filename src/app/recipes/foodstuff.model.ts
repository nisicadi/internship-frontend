import { Ingredient } from './ingredient.model';
import { MeasurementUnit } from './measurement-unit.model';

export interface Foodstuff {
    foodstuffId: number;
    foodstuffName: string;
    measurementId: number;
    measurement: MeasurementUnit;
    ingredients: Ingredient[];
}
