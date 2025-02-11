import {Component, computed, DestroyRef, inject, Input, signal, WritableSignal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductCardProps} from '../../types/Product';
import {SortBy} from '../../types/SortBy';
import {ProductsService} from '../../services/products.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products-actions[productList]',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './products-actions.component.html',
  styleUrl: './products-actions.component.scss'
})
export class ProductsActionsComponent {
  @Input() set productList(v: Array<ProductCardProps>) {
    this.productListSignal.set(v);
  };
  productListSignal: WritableSignal<Array<ProductCardProps>> = signal([]);
  searchTextValueSignal = signal('');
  sortBySignal: WritableSignal<SortBy> = signal('');
  computedProducts = computed(() => {
    const filteredProducts = this.filterProducts(this.searchTextValueSignal(), this.productListSignal())
    return this.sortProducts(filteredProducts, this.sortBySignal())
  });
  searchText = new FormControl('');
  sortBy: FormControl<SortBy | null> = new FormControl('name');
  sortByValues: Array<[SortBy, string]> = [['name', 'Name'], ['recently-added', 'Recently added']];
  destroyRef = inject(DestroyRef);

  constructor(private productService: ProductsService) {
  }

  ngOnInit() {
    this.searchText.valueChanges.pipe(
      startWith(this.searchText.value),
      debounceTime(150),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(searchTextValue => {
      this.searchTextValueSignal.set(searchTextValue || '');
    });

    this.sortBy.valueChanges.pipe(
      startWith(this.sortBy.value),
      debounceTime(150),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(sortByOptValue => {
      this.sortBySignal.set(sortByOptValue || 'name')
    })
  }
  private sortProducts(filteredProducts: ProductCardProps[], sortBy: SortBy) {
    if (sortBy === 'name') {
      return filteredProducts.sort((a,b) => this.sortByName(a, b));
    } else if (sortBy === 'recently-added') {
      return filteredProducts.sort((a,b) => this.sortByRecentlyAdded(a, b));
    }
    return [];
  }
  private sortByName(a:ProductCardProps, b: ProductCardProps) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
  private sortByRecentlyAdded(a:ProductCardProps, b: ProductCardProps) {
    return a.createdDate- b.createdDate;
  }
  private filterProducts(searchTextValue: string, productList: ProductCardProps[]) {
    return productList.filter(
      pr => {
        return pr.name.toLowerCase().trim().includes(searchTextValue.toLowerCase().trim()) ||
          pr.description.toLowerCase().trim().includes(searchTextValue.toLowerCase().trim());
      }
    )
  }

  addNewProduct() {
    this.productService.setNewProductData();
  }
}
