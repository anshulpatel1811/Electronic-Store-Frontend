import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { LoginResponse } from 'src/app/models/loginresponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { removeLoginData } from 'src/app/store/auth/auth.actions';
import { removeCart } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css'],
})
export class CustomNavbarComponent implements OnInit {
  collapse = true;
  loginData?: LoginResponse;
  isAdmin?: Observable<boolean>;
  cart?: Cart;

  constructor(
    private authService: AuthService,
    private store: Store<{ auth: LoginResponse; cart: Cart }>,
    private router: Router
  ) {
    

    // Listen for login data updates
    this.authService.getLoggedInData().subscribe({
      next: (loginData) => {
        this.loginData = loginData;
      },
    });

    // Check if the user is an admin
    this.isAdmin = this.authService.checkLoginAndAdminUser();
  }
  ngOnInit(): void {
    // Listen to the cart state in the store
    this.store.select('cart').subscribe({
      next: (data) => {
        this.cart = data;

        // ✅ Log cart item count
        const itemCount = data?.items?.length ?? 0;
        console.log(`🛒 Cart Items Count: ${itemCount}`);
      },
    });
  }

  toggle() {
    this.collapse = !this.collapse;
  }

  logout() {
    // Dispatch the action to remove login data and clear the cart
    this.store.dispatch(removeLoginData());
    this.store.dispatch(removeCart());
    this.router.navigate(['/login']);
  }
}
