import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmptyProductCardState, ProductCardProps} from '../../types/Product';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-product-details-card[productDetails]',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './product-details-card.component.html',
  styleUrl: './product-details-card.component.scss'
})
export class ProductDetailsCardComponent implements OnInit {
  private product: ProductCardProps | null = null;
  @Input() set productDetails(pd: EmptyProductCardState | ProductCardProps) {
    if (pd) {
      this.product = pd;
      this.profileForm.patchValue({
        name: pd.name,
        description: pd.description,
        price: pd.price,
      });
    }
  }
  private activatedRoute = inject(ActivatedRoute);

  constructor(private productsService: ProductsService) {}

  private formBuilder = inject(FormBuilder);
  profileForm = this.formBuilder.group({
    name: ['', [Validators.maxLength(30), Validators.required]],
    description: ['', Validators.maxLength(200)],
    price: [0, [Validators.min(1), Validators.required]],
  })

  saveProduct() {
    if (!this.product || !this.product.id) {
      const lastPr = this.productsService.productList()[this.productsService.productList().length - 1];
      this.product = {
        id: lastPr ? (Number.parseInt(lastPr.id) + 1).toString() : '0',
        createdDate: new Date().getTime(),
        price: this.profileForm.get('price')!.value!,
        name: this.profileForm.get('name')!.value!,
        description: this.profileForm.get('description')!.value!,
      }
      this.productsService.saveProduct(this.product)
      this.profileForm.reset();
      this.product = null;
    } else {
      this.productsService.saveProduct({
        id: (Number.parseInt(this.product!.id) + 1).toString(),
        price: this.profileForm.get('price')!.value,
        name: this.profileForm.get('name')!.value,
        description: this.profileForm.get('description')!.value,
        createdDate: this.product!.createdDate
      } as ProductCardProps)
    }

    this.productsService.saveData();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({product}) => {
      this.productDetails = product;
    });
  }
}
