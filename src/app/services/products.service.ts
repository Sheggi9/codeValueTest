import {Injectable, signal, WritableSignal} from '@angular/core';
import {EmptyProductCardState, ProductCardProps} from '../types/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productList: WritableSignal<Array<ProductCardProps>> = signal([
    {
      id: '1',
      name: 'Name 1',
      description: 'description 1',
      price: 400,
      createdDate: new Date("2/1/20").getDate()
    },
    {
      id: '0',
      name: 'Name 0',
      description: 'description 0',
      price: 600,
      createdDate: new Date("2/1/21").getDate(),
    },
    {
      id: '2',
      name: 'Name 2',
      description: 'description 2',
      price: 200,
      createdDate: new Date("2/1/22").getDate()
    },
  ]);
  productDetails: WritableSignal<EmptyProductCardState | ProductCardProps | null> = signal(null);

  deleteProductById(productId: string) {
    const productListV = [...this.productList()]
    productListV.splice(productListV.findIndex(n => n.id === productId), 1);
    this.productList.set(productListV)
    this.saveData()
  }

  setNewProductData() {
    this.productDetails.set({
      id: null,
      createdDate: null,
      name: '',
      price: null,
      description: ''
    } as EmptyProductCardState)
  }

  saveProduct(pr: ProductCardProps) {
    if (this.productList().find(p => p.id === pr.id)) {
      const res = [...this.productList()];
      const foundIndex = res.findIndex(x => x.id == pr.id);
      res[foundIndex] = pr;
      this.productList.set(res)
    } else {
      const res = [...this.productList()];
      res.push(pr);
      this.productList.set(res)
    }
  }

  showProductsDetails(product: ProductCardProps) {
    this.productDetails.set(product);
  }

  getData() {
    const retrievedObject = localStorage.getItem('products');
    if (retrievedObject) {
      this.productList.set(JSON.parse(retrievedObject));
    }
  }

  saveData() {
    localStorage.setItem('products', JSON.stringify(this.productList()));
  }

  getProductById(productId: string  | null) {
    if (!productId) return null;
    return this.productList().find(p => p.id === productId);
  }
}
