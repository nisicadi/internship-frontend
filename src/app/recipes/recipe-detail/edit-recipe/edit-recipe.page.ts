import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';

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
    private activatedRoute: ActivatedRoute
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
    if(this.name.trim().length <=0 || this.url.trim().length <= 0 || this.ingredients.trim().length <=0)
    {
      return;
    }

    this.loadedRecipe.recipeTitle = this.name;
    this.loadedRecipe.imageUrl = this.url;
    this.loadedRecipe.recipeIngredients = this.ingredients;

    this.recipeService.updateRecipe(this.loadedRecipe).subscribe();
    this.router.navigate([`/recipes/`+this.loadedRecipe.recipeId]);
  }
}
