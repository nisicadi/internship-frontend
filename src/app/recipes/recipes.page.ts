import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  allRecipes: Recipe[];
  searchInput: string;

  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  //Fix za refresh nakon delete, youtube komentar (vs ngOnInit)
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.refreshList();
  }

  refreshList() {
    this.recipesService.getAllRecipes().subscribe(res => {
      this.allRecipes = res;
      this.recipes = res;
      console.log(res);
    });
  }

  // getSearch() {
  //   this.recipesService.getAllRecipes().subscribe(res => {
  //     this.recipes = res;
  //     this.filteredRecipes = [];
  //     console.log(this.searchInput);
  //     this.recipes.forEach(recipe => {
  //       if(recipe.recipeTitle.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())){
  //         this.filteredRecipes.push(recipe);
  //       }
  //     });

  //     this.recipes = this.filteredRecipes;
  //   });
  // }

  getSearch() {
      this.recipes = this.allRecipes;
      this.filteredRecipes = [];

      console.log(this.searchInput);
      this.recipes.forEach(recipe => {
        if(recipe.recipeTitle.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())){
          this.filteredRecipes.push(recipe);
        }

      this.recipes = this.filteredRecipes;
    });
  }
}
