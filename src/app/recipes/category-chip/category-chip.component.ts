import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrls: ['./category-chip.component.scss'],
})
export class CategoryChipComponent implements OnInit {
  @Input() categoryItem: Category;
  constructor() { }

  ngOnInit(): void {}

}
