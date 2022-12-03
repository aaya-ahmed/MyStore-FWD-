import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  user:any
  constructor(private userservice:CartService,private route:Router ) { }

  ngOnInit(): void {
    this.user=this.userservice.getuser()
    this.userservice.buydone()
  }
  gottolist(){
    this.route.navigate(['/productlist'])
  }

}
