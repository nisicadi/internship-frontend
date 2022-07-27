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

  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.recipes = this.recipesService.getAllRecipes();
  }

  //Fix za delete, iz youtube komentara
  ionViewWillEnter() {
    // this.recipesService.getAllRecipes().subscribe(res => {
    //   this.recipes = res;
    //   console.log(res);
    // });

    //Fix za refresh nakon dodavanja/brisanja recepata
    this.activatedRoute.url.subscribe(url =>{
      this.recipesService.getAllRecipes().subscribe(res => {
          this.recipes = res;
          console.log(res);
  });
});
}
}
