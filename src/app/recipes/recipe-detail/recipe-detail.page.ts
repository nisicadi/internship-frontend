import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Foodstuff } from '../foodstuff.model';
import { FoodstuffService } from '../foodstuff.service';
import { Ingredient } from '../ingredient.model';
import { IngredientsService } from '../ingredients.service';
import { MeasurementUnitService } from '../measurement-unit.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  ingName: string;
  ingQuantity: number;
  isModalOpen: boolean;
  fs: number;
  editedIngredient: Ingredient;
  foodstuffs: Foodstuff[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController,
    private ingredientService: IngredientsService,
    private foodstuffService: FoodstuffService,
    private measurementUnitService: MeasurementUnitService
    ) { }

  ngOnInit() {
    this.isModalOpen = false;
    this.activatedRoute.url.subscribe(url =>{
      this.activatedRoute.paramMap.subscribe(paraMap => {
        if(!paraMap.has('recipeId'))
        {
          //redirect
          this.router.navigate(['/recipes']);
          return;
        }

        this.foodstuffService.getAllFoodstuff().subscribe(res=>{
          this.foodstuffs = res;
        });

        const recipeId = paraMap.get('recipeId');
        this.recipeService.getRecipe(Number(recipeId)).subscribe((res) => {
          this.loadedRecipe = res;

          this.loadedRecipe?.ingredients.forEach(element => {
            this.foodstuffService.getFoodstuff(element.foodstuffId).subscribe(res2 =>{
                element.foodstuff = res2;
                this.measurementUnitService.getMeasurementUnit(element.foodstuff.measurementId).subscribe(res3=>{
                  element.foodstuff.measurement = res3;
                });
              });
          });
        });
      });
    });
  }

  deleteRecipe() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the recipe?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.recipeService.deleteRecipe(this.loadedRecipe).subscribe(res => {
            console.log('Delete');
            this.router.navigate(['/recipes']);
          });
        }
      }
    ]
  }).then(alertEl => {
    alertEl.present();
  });
  }

  editRecipe() {
    this.router.navigate(['/recipes/'+this.loadedRecipe.recipeId+'/edit-recipe']);
  }

  setOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  editIngredient(ingredient: Ingredient) {
    this.isModalOpen = true;

    this.fs = ingredient?.foodstuff?.foodstuffId;
    this.ingQuantity = ingredient?.quantity;
    //Bez ovog se editovanje bilo kojeg ingredienta, nakon saveChanges(), odnosilo samo na zadnji ingredient u nizu
    this.editedIngredient = ingredient;
  }

  saveIngredient() {
    if( this.editedIngredient.quantity <= 0)
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

    this.editedIngredient.foodstuffId = this.fs;
    this.foodstuffService.getFoodstuff(this.fs).subscribe(res => {
      this.editedIngredient.foodstuff = res;

      this.editedIngredient.quantity = this.ingQuantity;

      this.ingredientService.updateIngredient(this.editedIngredient).subscribe();
      this.isModalOpen = false;
    });
  }

  deleteIngredient(ingredient: Ingredient) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the ingredient?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.ingredientService.deleteIngredient(ingredient).subscribe(res=>{
            this.recipeService.getRecipe(this.loadedRecipe.recipeId).subscribe(res2=>{
              this.loadedRecipe = res2;
            });
          });
        }
      }
    ]
  }).then(alertEl => {
    alertEl.present();
  });
  }

  foodstuffChanged(ev){
    this.fs = ev.target.value;
  }
}
