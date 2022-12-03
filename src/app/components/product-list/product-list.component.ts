import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/product';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList:product[]=[]
  constructor(private service:ServiceService) { }
  ngOnInit(): void {
    this.service.getdata().subscribe({
      next:data=>{
        this.productList=data
      }
    })
  }

}
