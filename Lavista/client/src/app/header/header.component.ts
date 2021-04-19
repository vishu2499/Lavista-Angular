import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _productService: ProductsService) {
    this._productService.cartSubject.subscribe((data)=>{
        this.cartItem = data;
    });
   }

  ngOnInit(): void {
    this.cartItemFunc();
  }
  //Binding Data
  cartItem: number = 0;
  cartItemFunc(){
    if(localStorage.getItem('localCart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('localCart'));
      this.cartItem = cartCount.length;

    }
  }
}
