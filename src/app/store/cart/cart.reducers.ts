import { createReducer, on } from '@ngrx/store';
import { updateCart, removeCart } from '../cart/cart.actions';
import { Cart } from 'src/app/models/cart.model';
import { User } from 'src/app/models/user.model';

// Helper function to return a blank cart (empty cart state)
function getBlankCart(): Cart {
  return {
    cartId: '',
    createdAt: new Date(),
    items: [],
    user: new User('', '', '', '', ''),  // Assuming User model with appropriate fields
  };
}

// Initial state is an empty cart
const initialCart: Cart = getBlankCart();

export const cartReducer = createReducer(
  initialCart,
  // Handling the updateCart action, where we update the cart state
  on(updateCart, (state, { cart }) => {
    return { ...cart };  // Update the cart state with the new cart passed in the action
  }),
  // Handling the removeCart action, which resets the cart to the initial empty state
  on(removeCart, () => {
    return getBlankCart();  // Return an empty cart state when the cart is removed
  })
);
