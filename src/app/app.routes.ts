import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ProductDetailsCardComponent} from './components/product-details-card/product-details-card.component';
import {ProductContentComponent} from './components/product-content/product-content.component';
import {productDetailsGuard, productGuards} from './guards/ProductGuards';

export const routes: Routes = [
  {
    path: 'products', component: AppComponent,
    children: [
      {
        path: '',
        component: ProductContentComponent,
        children: [
          {
            path: 'new',
            component: ProductDetailsCardComponent,
          },
          {
            path: ':id',
            component: ProductDetailsCardComponent,
            resolve: { product: productGuards },
            canActivate: [productDetailsGuard]
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
