import { Foodstuff } from './foodstuff.model';

export interface Storage {
    storageId: number;
    foodstuffId: number;
    quantity: number;
    minQuantity: number;
    underMin: boolean;
    foodstuff: Foodstuff;
}
