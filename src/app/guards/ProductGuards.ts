import {ActivatedRouteSnapshot, CanActivateChildFn, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {inject} from '@angular/core';
import {ProductCardProps} from '../types/Product';


export const productGuards: ResolveFn<ProductCardProps | null | undefined > = (route, state) => {
  const productId = route.paramMap.get('id');
  return inject(ProductsService).getProductById(productId)
}

export const productDetailsGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router: Router = inject(Router);
  const productId = route.paramMap.get('id');
  const res = !!inject(ProductsService).getProductById(productId)
  return res ? res : router.createUrlTree(['/products']);
};
