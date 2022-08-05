import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';
import { CategoryService } from '../categories.service';
import { Category } from '../category.model';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  pageTitle: string;
  recipeName: string;
  recipeUrl: string;
  ingName: string;
  ingQuantity: number;
  cat: number;
  recipePrice: number;
  isEditPage: boolean;
  isModalOpen: boolean;
  categories: Category[];
  ingredients: any=[];

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
      this.categoryService.getAllCategories().subscribe(res=>{
        this.categories = res;
      });

      this.activatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('recipeId'))
      {
        //Add new recipe
        this.pageTitle = 'Add recipe';
        this.isEditPage = false;
        const newRecipe: Recipe = {
          recipeId: 0,
          recipeTitle: '',
          imageUrl: '',
          categoryId: 0,
          category: null,
          ingredients: [],
          recipePrice: 0
        };

        this.loadedRecipe = newRecipe;
      }
      else{
        //Edit existing recipe
        this.pageTitle = 'Edit recipe';
        this.isEditPage = true;
        const recipeId = paraMap.get('recipeId');
        this.recipeService.getRecipe(Number(recipeId)).subscribe((res) => {
          this.loadedRecipe = res;

          this.recipeName = this.loadedRecipe?.recipeTitle;
          this.recipeUrl = this.loadedRecipe?.imageUrl;
          this.cat = this.loadedRecipe?.categoryId;
          this.selectedCategory = this.loadedRecipe?.category;
          this.ingredients = this.loadedRecipe?.ingredients;
          this.recipePrice = this.loadedRecipe?.recipePrice;
        });
      }
  });

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  discardChanges() {
    this.router.navigate(['../']);
  }

  saveChanges() {
      //Validate input values
      if(!this.recipeName || !this.recipeUrl ||
        !this.recipeName.trim() || !this.recipeUrl.trim() ||
        this.recipeName.length > 255 || this.recipeUrl.length > 255)
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

    this.loadedRecipe.recipeTitle = this.recipeName;
    this.loadedRecipe.imageUrl = this.recipeUrl;
    this.loadedRecipe.ingredients = this.ingredients;
    this.loadedRecipe.recipePrice = this.recipePrice;
    this.categoryService.getCategory(this.cat).subscribe(res=>{
      this.loadedRecipe.category = res;
      this.loadedRecipe.categoryId = res.categoryId;

      if(this.isEditPage){
        this.recipeService.updateRecipe(this.loadedRecipe).subscribe(res2=>{
          this.router.navigate([`/recipes/`+this.loadedRecipe.recipeId]);
        });
      }
      else {
        this.recipeService.addRecipe(this.loadedRecipe).subscribe(res2=>{
          this.router.navigate([`/recipes/`]);
        });
      }
    });
  }

  saveIngredient(){
    if(!this.ingName || !this.ingName.trim() || this.ingName.length > 50
    || this.ingQuantity <= 0)
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

    const newIngredient: Ingredient = {
      quantity: this.ingQuantity,
      ingredientId: 0,
      recipeID: 0,
      foodstuffId: 0,
      foodstuff: null,
      recipe: null
    };

    this.ingredients?.push(newIngredient);
    this.isModalOpen=false;
  }

  categoryChanged(ev){
    this.selectedCategory = ev.target.value;
  }
}
