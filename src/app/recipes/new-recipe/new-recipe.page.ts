import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { CategoryService } from '../categories.service';
import { Category } from '../category.model';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  name: string;
  url: string;
  categories: Category[];
  selectedCategory: Category;
  ingredients: any=[];
  isModalOpen: boolean;
  ingName: string;
  ingQuantity: number;

  constructor(
    private alertCtrl: AlertController,
    private recipeService: RecipesService,
    private router: Router,
    private categoryService: CategoryService
    ) {   }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(res=>{
      this.categories = res;
    });
    this.isModalOpen=false;
  }

  saveRecipe() {
    if(!this.name || !this.url ||
      (!this.name.trim() || !this.url.trim() ||
      this.name.length > 255 || this.url.length > 255))
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
    this.categoryService.getCategory(this.selectedCategory?.categoryId).subscribe(res=>{
      const newRecipe: Recipe ={
        recipeId: 0,
        recipeTitle: this.name,
        imageUrl: this.url,
        categoryId: res.categoryId,
        category: res,
        ingredients: this.ingredients
      };

      this.recipeService.addRecipe(newRecipe).subscribe(obj => {
        this.router.navigate(['/recipes']);
      });
    });
    }

    saveIngredient(){
      const newIngredient: Ingredient = {
        ingredientName: this.ingName,
        quantity: this.ingQuantity,
        ingredientID: 0,
        recipeID: 0,
        recipe: null
      };

      this.ingredients?.push(newIngredient);
      console.log(newIngredient);
      console.log(this.ingredients);
      this.isModalOpen=false;
    }

    categoryChanged(ev){
      this.selectedCategory = ev.target.value;
    }
}
