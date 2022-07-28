import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  name: string;
  url: string;
  ingredients: string;

  constructor(
    private alertCtrl: AlertController,
    private recipeService: RecipesService,
    private router: Router
    ) {   }

  ngOnInit() {
  }

  saveRecipe() {
    if(!this.name || !this.url || !this.ingredients ||(!this.name.trim() || !this.url.trim() || !this.ingredients.trim()))
    {
      //Ne radi za prvi klik?
      this.alertCtrl.create({
        header: 'Invalid inputs',
        message: 'Check your inputs and try again.',
        buttons: ['OK']
      }).then(alertEl => {
        alertEl.present();
      });

      return;
    }

    const newRecipe: Recipe ={
          recipeId: 0,
          recipeTitle: this.name,
          imageUrl: this.url,
          recipeIngredients: this.ingredients
        };

    this.recipeService.addRecipe(newRecipe).subscribe(obj => {
      console.log('Add');
      this.router.navigate(['/recipes']);
    });


}
}
