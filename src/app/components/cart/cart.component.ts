import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { itemcart } from 'src/app/model/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:itemcart[]=[]
  user:{fullname:string,address:string,creditcard:string,price:number}={
    fullname: '',
    address: '',
    creditcard: '',
    price:0
  }
  totalPrice:number=0
  constructor(private service:CartService,private route:Router) { }

  ngOnInit(): void {
    this.cart=this.service.getcart()
    this.cart.forEach(ele=>{
      this.totalPrice=this.totalPrice+(ele.price*ele.numberOfItem)
    })
    if(this.service.getuser()){
      this.user=this.service.getuser()
    }
  }
  changetotalprice(index:number,event:any){
    let newnumber=event.target.value
   this.totalPrice=this.totalPrice-(this.cart[index].price*this.cart[index].numberOfItem)+(this.cart[index].price*newnumber)
   this.cart[index].numberOfItem=newnumber
   this.service.setcart(this.cart[index])
  }
  buy(form:NgForm){
    if(form.valid){
      this.user.price=this.totalPrice
      this.service.setuser(this.user)
      this.route.navigate(['/confirmation'])
    }
  }

}
