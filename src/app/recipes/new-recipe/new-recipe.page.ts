import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  id: string;
  name: string;
  url: string;
  ingredients: string;

  constructor(
    private alertCtrl: AlertController,
    private recipeService: RecipesService,
    private router: Router
    ) {   }

  ngOnInit() {
  }

  saveRecipe() {
    if(this.name.trim().length <=0 || this.url.trim().length <= 0 || this.ingredients.trim().length <=0 || this.id.trim().length <= 0)
    {
      //Ne radi
      this.alertCtrl.create({
        header: 'Invalid inputs',
        message: 'Check your inputs and try again.',
        buttons: ['OK']
      }).then(alertEl => {
        alertEl.present();
      });

      return;
    }

    //this.recipeService.addRecipe(this.id, this.name, this.url, this.ingredients);
    this.router.navigate(['/recipes']);

}
}
