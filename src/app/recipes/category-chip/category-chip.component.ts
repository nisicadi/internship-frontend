import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { RecipesPage } from '../recipes.page';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrls: ['./category-chip.component.scss'],
})
export class CategoryChipComponent implements OnInit {
  @Input() categoryItem: Category;
  constructor(private recipesPage: RecipesPage) { }

  ngOnInit(): void {}

  filterByCategory(category: Category){
    this.recipesPage.filterByCategory(category);
  }
}
