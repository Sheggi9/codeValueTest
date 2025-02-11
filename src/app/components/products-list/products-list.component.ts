import {Component, input, InputSignal} from '@angular/core';
import {ProductCardProps} from '../../types/Product';
import {ProductCardComponent} from '../product-card/product-card.component';
import {ProductsService} from '../../services/products.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [
    ProductCardComponent,
    RouterLink
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  productList: InputSignal<Array<ProductCardProps>> = input.required();

  constructor(private productsService: ProductsService) {
  }
  showProductDetails(product: ProductCardProps) {
    // this.productsService.showProductsDetails(product);
  }
}
