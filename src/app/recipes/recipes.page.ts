import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Category } from './category.model';
import { CategoryService } from './categories.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {
  recipes: Recipe[];
  categories: Category[];
  allRecipes: Recipe[];
  searchInput: string;
  lastCategory: Category;

  constructor(private recipesService: RecipesService,
    private categoryService: CategoryService
    ) { }

  ngOnInit() {
  }

  //Fix za refresh nakon delete, youtube komentar (vs ngOnInit)
  ionViewWillEnter() {
    this.refreshList();
    this.refreshCategories();
  }

  refreshCategories() {
    this.categoryService.getAllCategories().subscribe(res=>{
      this.categories=res;
      });
  }

  refreshList() {
    this.recipesService.getAllRecipes().subscribe(res => {
      this.allRecipes = res;
      this.recipes = res;
      this.lastCategory = null;
    });
  }

  getSearch() {
      this.recipes = [];

      this.allRecipes.forEach(recipe => {
        if(recipe.recipeTitle.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())){
          this.recipes.push(recipe);
        }
    });
  }

  filterByCategory(category: Category){
    if(this.lastCategory === category){
      this.refreshList();
    }
    else{
      this.recipes = [];
      this.allRecipes.forEach(recipe => {
        if(recipe.categoryId === category.categoryId){
          this.recipes.push(recipe);
        }
      this.lastCategory = category;
    });
    }
  }
}
