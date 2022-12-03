import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { itemcart } from 'src/app/model/cart';
import { product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product:product
  cart:itemcart
  numberofitem:number=1
  constructor(private route:Router,private cartser:CartService) {
    this.product={
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
    this.cart={
      id: 0,
      name: '',
      price: 0,
      url: '',
      numberOfItem: 0
    }
  }
  ngOnInit(): void {}
  gotodetails(){
    this.route.navigateByUrl(`/details/${this.product.id}`)
  }
  changeNumOfItem(event:any){
    this.numberofitem=parseInt(event.target.value)
  }
  addtocart(){
    this.cart={
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        url: this.product.url,
        numberOfItem:this.numberofitem}
    let mess=this.cartser.setcart(this.cart)
    window.alert(mess)
  }
}
