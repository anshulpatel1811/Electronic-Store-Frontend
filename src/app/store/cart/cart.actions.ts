import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/models/cart.model';

// Action to update the cart
export const updateCart = createAction('UPDATE_CART', props<{ cart: Cart }>());

// Action to remove the cart (clear the cart)
export const removeCart = createAction('REMOVE_CART');
