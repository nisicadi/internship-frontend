import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { AlertController } from '@ionic/angular';
import { CategoryService } from '../../categories.service';
import { Category } from '../../category.model';
import { Ingredient } from '../../ingredient.model';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  recipeName: string;
  recipeUrl: string;
  ingName: string;
  ingQuantity: number;
  cat: number;
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
        this.isEditPage=false;
        this.loadedRecipe = null;
      }
      else{
        //Edit existing recipe
        this.isEditPage=true;
        const recipeId = paraMap.get('recipeId');
        this.recipeService.getRecipe(Number(recipeId)).subscribe((res) => {
          this.loadedRecipe = res;

          this.recipeName = this.loadedRecipe?.recipeTitle;
          this.recipeUrl = this.loadedRecipe?.imageUrl;
          this.cat = this.loadedRecipe?.categoryId;
        });
      }
  });

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

    // if(this.isEditPage){
    //   //Edit existing object
    //   this.loadedRecipe.recipeTitle = this.recipeName;
    //   this.loadedRecipe.imageUrl = this.recipeName;
    //   this.categoryService.getCategory(this.selectedCategory?.categoryId).subscribe(res=>{
    //     this.loadedRecipe.category = res;
    //     this.loadedRecipe.categoryId = res.categoryId;

    //     this.recipeService.updateRecipe(this.loadedRecipe).subscribe(res2=>{
    //       this.router.navigate([`/recipes/`+this.loadedRecipe.recipeId]);
    //     });
    //   });
    // }
    // else{
    //   //Create new object
    // }

    this.loadedRecipe.recipeTitle = this.recipeName;
    this.loadedRecipe.imageUrl = this.recipeName;
    this.categoryService.getCategory(this.selectedCategory?.categoryId).subscribe(res=>{
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
