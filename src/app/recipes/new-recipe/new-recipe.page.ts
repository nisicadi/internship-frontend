import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { CategoryService } from '../categories.service';
import { Category } from '../category.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  name: string;
  url: string;
  ingredients: string;
  categories: Category[];
  selectedCategory: Category;

  constructor(
    private alertCtrl: AlertController,
    private recipeService: RecipesService,
    private router: Router,
    private categoryService: CategoryService
    ) {   }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(res=>{
      this.categories = res;
    });
  }

  saveRecipe() {
    if(!this.name || !this.url || !this.ingredients ||
      (!this.name.trim() || !this.url.trim() || !this.ingredients.trim()) ||
      this.name.length > 255 || this.url.length > 255 || this.ingredients.length > 255)
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
    this.categoryService.getCategory(this.selectedCategory?.categoryId).subscribe(res=>{
      const newRecipe: Recipe ={
        recipeId: 0,
        recipeTitle: this.name,
        imageUrl: this.url,
        recipeIngredients: this.ingredients,
        categoryId: res.categoryId,
        category: res
      };

      this.recipeService.addRecipe(newRecipe).subscribe(obj => {
        console.log('Add');
        this.router.navigate(['/recipes']);
      });
    });
    }

    categoryChanged(ev){
      console.log(ev);
      this.selectedCategory = ev.target.value;
      console.log(this.selectedCategory);
    }
}
