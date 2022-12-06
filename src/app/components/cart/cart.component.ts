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
  flag:boolean=false
  changetype:string='removing'
  cartitem:{name:string,numberOfItem:number,index:number}={name:'',numberOfItem:0,index:0}
  totalPrice:number=0
  prevnumber:number=0
  constructor(private service:CartService,private route:Router) { }

  ngOnInit(): void {
    this.cart=this.service.getcart()
    this.cart.forEach(ele=>{
      this.totalPrice=this.totalPrice+(ele.price*ele.numberOfItem)
    })
  }
  prevnum(event:any){
    this.prevnumber=event.target.value
  }
  changetotalprice(index:number,event:any){
    this.changetype='changenum'
    this.flag=true
    this.cartitem={name:this.cart[index].name,numberOfItem:event,index:index}
  }
  alert(index:number){
    this.changetype='removing'
    this.flag=true
    this.cartitem={name:this.cart[index].name,numberOfItem:this.cart[index].numberOfItem,index:index}
    console.log(this.cart[index])
  }
  changeitem(answer:boolean){
    this.flag=false
    let index=this.cartitem.index
    if(this.changetype=='changenum'&&answer==true){
      this.totalPrice=this.totalPrice-(this.cart[index].price*this.prevnumber)+(this.cart[index].price*this.cartitem.numberOfItem)
      this.service.setcart(this.cart[index],this.totalPrice)
    }
    else if(this.changetype=='changenum'&&answer==false){
      this.cart[index].numberOfItem=this.prevnumber
    }
    if(this.changetype=='removing'&&answer==true){
      this.prevnumber=this.cart[index].numberOfItem
      this.totalPrice=this.totalPrice-(this.cart[index].price*this.prevnumber)
      this.service.removeitem(index)
    }
  }

}
