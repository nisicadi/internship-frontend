import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Ingredient } from '../ingredient.model';
import { IngredientsService } from '../ingredients.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController,
    private ingredientService: IngredientsService
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

        const recipeId = paraMap.get('recipeId');
        this.recipeService.getRecipe(Number(recipeId)).subscribe((res) => {
          this.loadedRecipe = res;
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

    this.ingName = ingredient.ingredientName;
    this.ingQuantity = ingredient.quantity;
  }

  saveIngredient(ingredient: Ingredient) {
    if(!ingredient.ingredientName || !ingredient.ingredientName.trim() || ingredient.ingredientName.length > 50
    || ingredient.quantity <= 0)
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

    ingredient.ingredientName = this.ingName;
    ingredient.quantity = this.ingQuantity;

    this.ingredientService.updateIngredient(ingredient).subscribe();
    this.isModalOpen = false;
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

}
