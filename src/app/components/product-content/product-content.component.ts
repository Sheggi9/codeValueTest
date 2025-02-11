import { Component } from '@angular/core';
import {ProductsActionsComponent} from "../products-actions/products-actions.component";
import {ProductsListComponent} from "../products-list/products-list.component";
import {ProductsService} from '../../services/products.service';
import {HeaderComponent} from '../header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-product-content',
  imports: [
    ProductsActionsComponent,
    ProductsListComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './product-content.component.html',
  styleUrl: './product-content.component.scss'
})
export class ProductContentComponent {
  constructor(public productsService: ProductsService) {}
}
