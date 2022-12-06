import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cartform',
  templateUrl: './cartform.component.html',
  styleUrls: ['./cartform.component.css']
})
export class CartformComponent implements OnInit {
  @Input()totalPrice:number=0
  user:{fullname:string,address:string,creditcard:string,price:number}={
    fullname: '',
    address: '',
    creditcard: '',
    price:0
  }
  constructor(private service:CartService,private route:Router) { }

  ngOnInit(): void {
    if(this.service.getuser()){
      this.user=this.service.getuser()
    }
  }
  buy(form:NgForm){
    if(form.valid){
      this.user.price=this.totalPrice
      this.service.setuser(this.user)
      this.route.navigate(['/confirmation'])
    }
  }
}
