import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../laufen';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  public getAllProducts(){
    return this.http.get < LAUFEN.Product[] >(BASE_URL+'/shop/',{
      withCredentials: true
    })
  }
  public getProductsToConfirm(){
    return this.http.get < LAUFEN.Product[] >(BASE_URL+'/shop/toConfirm/',{
      withCredentials: true
    })
  }
  public getValidatedProducts(){
    return this.http.get < LAUFEN.Product[] >(BASE_URL+'/shop/validated/',{
      withCredentials: true
    })
  }

  public getDetailProduct(id:number){
    return this.http.get < LAUFEN.Product[] >(BASE_URL+`/shop/detail/${id}`,{
      withCredentials: true
    })
  }
  public filterMultiple(department: string, gender: string, category: string, cut: string){
    return this.http.get < LAUFEN.Product[] >(BASE_URL+`/shop/filter/multiple/${department}/${gender}/${category}/${cut}`,{
      withCredentials: true
    })
  }
  public filterGender(gender: string){
    return this.http.get < LAUFEN.Product[] >(BASE_URL+`/shop/filter/${gender}`,{
      withCredentials: true
    })
  }
  public getProductsByUser(){
    return this.http.get < LAUFEN.Product[] >(BASE_URL+`/shop/my/products`,{
      withCredentials: true
    })
  }
}
