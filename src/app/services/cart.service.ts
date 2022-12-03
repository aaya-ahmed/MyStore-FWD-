import { Injectable } from '@angular/core';
import { itemcart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storage:itemcart[]=[]
  private user:any
  constructor() { 
    if(localStorage.getItem('cart')){
      this.storage=JSON.parse(localStorage.getItem('cart')+'')
    }
    if(localStorage.getItem('user')){
      this.user=JSON.parse(localStorage.getItem('user')+'')
    }
  }
  public getuser(){
    return this.user
  }
  public setuser(user:any){
    this.user=user
    localStorage.setItem('user',JSON.stringify(this.user))
  }
  public getcart(){
    return this.storage
  }
  public setcart(cartitem:itemcart):string{
    let incart=this.storage.findIndex(ele=>ele.id===cartitem.id)
    if(incart!=-1){
      if(this.storage[incart].numberOfItem!=cartitem.numberOfItem){
        this.storage.splice(incart,1)
        this.storage.push(cartitem)
        localStorage.setItem('cart',JSON.stringify(this.storage))
        return 'Updated number of item in cart'
      }
      else{
        return 'This already in cart'
      }
    }
    else{
      this.storage.push(cartitem)
      localStorage.setItem('cart',JSON.stringify(this.storage))
      return 'Add To Cart'
    }
  }
  public buydone(){
    localStorage.removeItem('cart')
    this.storage=[]
  }
}
