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
    //this.refreshList();
  }

  //Fix za refresh nakon delete, youtube komentar (vs ngOnInit)
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.refreshList();
  }

  refreshList() {
    //this.activatedRoute.url.subscribe(url =>{
      this.recipesService.getAllRecipes().subscribe(res => {
          this.recipes = res;
          console.log(res);
          console.log('refreshList');
      });
   // });
  }
}
