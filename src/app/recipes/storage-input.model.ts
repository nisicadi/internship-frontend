import { Foodstuff } from './foodstuff.model';

export interface StorageInput {
    storageInputId: number;
    foodstuffId: number;
    quantity: number;
    foodstuff: Foodstuff;
}
