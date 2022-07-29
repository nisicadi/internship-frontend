import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  name: string;
  url: string;
  ingredients: string;

  loadedRecipe: Recipe;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
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

        this.name = this.loadedRecipe?.recipeTitle;
        this.url = this.loadedRecipe?.imageUrl;
        this.ingredients = this.loadedRecipe?.recipeIngredients;
    });
  });
  }

  saveChanges() {
      if(!this.name || !this.url || !this.ingredients ||
        (!this.name.trim() || !this.url.trim() || !this.ingredients.trim()) ||
        this.name.length > 255 || this.url.length > 255 || this.ingredients.length > 255)
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

    this.loadedRecipe.recipeTitle = this.name;
    this.loadedRecipe.imageUrl = this.url;
    this.loadedRecipe.recipeIngredients = this.ingredients;

    this.recipeService.updateRecipe(this.loadedRecipe).subscribe(res=>{
      this.router.navigate([`/recipes/`+this.loadedRecipe.recipeId]);
    });
  }
}
