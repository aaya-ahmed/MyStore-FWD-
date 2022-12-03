import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { product } from '../model/product';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   data:any="../../assets/data.json"
  constructor(private http:HttpClient) { }

  public getdata():Observable<product[]>{
    return this.http.get<product[]>(this.data).pipe(map((items:any)=>{
      return items.map((item:any)=>({
        id: item.id,
        name: item.name,
        price: item.price,
        url:item.url,
        description: item.description 
      }))
    }))
  }

  public getproduct(id:number){
    return this.http.get(this.data).pipe(map((cars:any) =>{return cars.find((car:any) => {return car.id === id})})
    );
  }
}
