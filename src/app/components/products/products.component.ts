import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from './product.model';
import { Category } from '../categories/category.model';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    RatingModule,
    ImageModule,
    SpinnerComponent,
  ],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedProduct: any = null;
  showProductDetails = false;
  addOrUpdateProductForm: FormGroup;
  isUpdateMode = false;
  displayModal = false;
  selectedCategory: any;
  isLoading = true;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.addOrUpdateProductForm = this.fb.group({
      title: [''],
      price: [''],
      description: [''],
      image: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => (this.isLoading = false),
    });
  }

  viewProductDetails(product: any): void {
    this.selectedProduct = product;
    this.showProductDetails = true;
  }

  showAddProductModal(): void {
    this.isUpdateMode = false;
    this.displayModal = true;
    this.addOrUpdateProductForm.reset();
  }

  showUpdateProductModal(product: any): void {
    this.isUpdateMode = true;
    this.selectedProduct = product;
    this.addOrUpdateProductForm.patchValue(product);
    this.displayModal = true;
  }

  onSubmit(): void {
    if (this.isUpdateMode) {
      this.productService
        .updateProduct(
          this.selectedProduct.id,
          this.addOrUpdateProductForm.value
        )
        .subscribe({
          next: () => {
            this.updateProductList(this.selectedProduct.id);
          },
          error: (err) => {
            console.error('Error updating products:', err);

          },
        });
    } else {
      this.productService
        .addProduct(this.addOrUpdateProductForm.value)
        .subscribe({
          next: () => {
            this.updateProductList();
          },
          error: (err) => {
            console.error('Error adding product:', err);

          },
        });
    }
    this.displayModal = false;
  }

  deleteProduct(productID: number): void {
    this.productService.deleteProduct(productID).subscribe(
      {
        next:() => {
          this.products = this.products.filter(
            (product:Product) => product.id !== productID
          );
        },
        error:(error)=> console.error('Error deleting product : ',error)
      });
  }

  updateProductList(productID: number | null = null): void {
    if (productID) {
      this.products = this.products.map((product) => {
        if (product.id === productID) {
          return { ...product, ...this.addOrUpdateProductForm.value };
        } else {
          return product;
        }
      });
    } else {
      this.products = [
        ...this.products,
        { id: this.products.length + 1, ...this.addOrUpdateProductForm.value },
      ];
    }
  }
}
