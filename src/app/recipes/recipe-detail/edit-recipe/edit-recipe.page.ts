import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { AlertController } from '@ionic/angular';
import { CategoryService } from '../../categories.service';
import { Category } from '../../category.model';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  name: string;
  url: string;
  ingredients: string;
  categories: Category[];
  selectedCategory: Category;

  loadedRecipe: Recipe;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private categoryService: CategoryService
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
  this.categoryService.getAllCategories().subscribe(res=>{
    this.categories = res;
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
    this.categoryService.getCategory(this.selectedCategory?.categoryId).subscribe(res=>{
      this.loadedRecipe.category = res;
      this.loadedRecipe.categoryId = res.categoryId;

      this.recipeService.updateRecipe(this.loadedRecipe).subscribe(res2=>{
        this.router.navigate([`/recipes/`+this.loadedRecipe.recipeId]);
      });
    });
    // this.loadedRecipe.categoryId = this.selectedCategory?.categoryId;
    // this.loadedRecipe.category = this.selectedCategory;

    // this.recipeService.updateRecipe(this.loadedRecipe).subscribe(res=>{
    //   this.router.navigate([`/recipes/`+this.loadedRecipe.recipeId]);
    // });
  }

  categoryChanged(ev){
    console.log('Test categoryChanged');
    this.selectedCategory = ev.target.value;
    console.log(this.selectedCategory);
  }
}
