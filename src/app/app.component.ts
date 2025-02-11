import {Component, OnInit} from '@angular/core';
import {ProductsService} from './services/products.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'codeValueTest';
  constructor(public productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getData()
  }
}
