import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { ActivatedRoute } from '@angular/router';
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
  filteredRecipes: Recipe[];
  allRecipes: Recipe[];
  searchInput: string;

  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  //Fix za refresh nakon delete, youtube komentar (vs ngOnInit)
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
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
      console.log(res);
    });
  }

  getSearch() {
      this.filteredRecipes = [];

      console.log(this.searchInput);
      this.allRecipes.forEach(recipe => {
        if(recipe.recipeTitle.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())){
          this.filteredRecipes.push(recipe);
        }

      this.recipes = this.filteredRecipes;
    });
  }

  filterByCategoryId(category: Category){
    this.filteredRecipes = [];
    this.allRecipes.forEach(recipe =>{
      if(recipe.category === category){
        this.filteredRecipes.push(recipe);
      }
    });

    this.recipes = this.filteredRecipes;
  }
}
