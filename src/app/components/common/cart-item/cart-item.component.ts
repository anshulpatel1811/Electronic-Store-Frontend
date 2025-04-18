import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() cartItem?: CartItem;
  @Output() itemIncreaseQuantityEvent = new EventEmitter<CartItem>();
  @Output() itemDecreaseQuantityEvent = new EventEmitter<CartItem>();
  @Output() itemDeleteEvent = new EventEmitter<CartItem>();

  constructor(public productService: ProductService) {}

  increaseQuantity(cartItem: CartItem) {
    this.itemIncreaseQuantityEvent.emit(cartItem);
  }

  decreaseQuantity(cartItem: CartItem) {
    this.itemDecreaseQuantityEvent.emit(cartItem);
  }

  deleteItem(cartItem: CartItem) {
    this.itemDeleteEvent.emit(cartItem);
  }
  
  calculateDiscount(original: number, discounted: number): number {
    if (!original || !discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
  }
}