import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  imports: [FormsModule, TableModule, ButtonModule, SpinnerComponent],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  newCategory = '';
  isEditing = false;
  currentCategoryId: number | null = null;
  isLoading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.map((category, index) => {
          return { id: index, name: category };
        });
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
      complete: () => (this.isLoading = false),
    });
  }

  addCategory(): void {
    if (this.isEditing) {
      this.categories = this.categories.map((category) => {
        if (category.id === this.currentCategoryId) {
          return { ...category, name: this.newCategory };
        } else {
          return category;
        }
      });
    } else {
      this.categories = [
        ...this.categories,
        {
          id: this.categories.length + 1,
          name: this.newCategory,
        },
      ];
    }
    this.resetForm();
  }

  editCategory(category: Category): void {
    this.isEditing = true;
    this.currentCategoryId = category.id;
    this.newCategory = category.name;
  }

  deleteCategory(categoryId: number): void {
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
  }

  resetForm(): void {
    this.newCategory = '';
    this.isEditing = false;
    this.currentCategoryId = null;
  }
}
