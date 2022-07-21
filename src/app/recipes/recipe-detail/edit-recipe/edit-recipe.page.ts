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
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
    });

    this.name= this.loadedRecipe.title;
    this.url= this.loadedRecipe.imageUrl;
    this.ingredients= this.loadedRecipe.ingredients[0];
    //Samo prvi sastojak, jer nisam dobro implementirao niz ni kod dodavanja novog recepta.
  }

  saveChanges() {
    this.recipeService.updateRecipe(this.loadedRecipe.id, this.name, this.url, this.ingredients);
    this.router.navigate(['/recipes/'+this.loadedRecipe.id]);
  }

}
