import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { itemcart } from 'src/app/model/cart';
import { product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product:product
  numberOfItem:number=0
  constructor(private router:ActivatedRoute,private service:ServiceService,private cartservice:CartService) {
    this.product={
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      data=>{
        let product=this.service.getproduct(parseInt(data.id)).subscribe(
        res=>{
          this.product=res

          product.unsubscribe();
        })
      }
    )
  }
  setnumberofitem(event:any){
    this.numberOfItem=parseInt(event.target.value)
  }

  addtocart(){
    let itemcart={
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      url: this.product.url,
      numberOfItem: this.numberOfItem
    }
    let mess=this.cartservice.setcart(itemcart)
    window.alert(mess)
  }
}
