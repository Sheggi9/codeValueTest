import {Component, input, InputSignal} from '@angular/core';
import {ProductCardProps} from '../../types/Product';
import {ProductsService} from '../../services/products.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  public product: InputSignal<ProductCardProps> = input.required();
  constructor(private productsService: ProductsService) {
  }

  deleteProduct($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.productsService.deleteProductById(this.product().id);
  }
}
