import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { ShopService } from '../../services/shop.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pending-ad',
  templateUrl: './pending-ad.component.html',
  styleUrls: ['./pending-ad.component.css']
})
export class PendingAdComponent implements OnInit {

  public products : LAUFEN.Product[]= []
  public productSelected: LAUFEN.Product[]= []
  public productSelectedIsVisible: boolean = false
  public deleteSelected: boolean = false
  public productSelectedForDelete : number = 0
  public nbr: number=0
  
  constructor(
    private shopService: ShopService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  public getProducts(){
    this.shopService.getProductsToConfirm()
      .subscribe((response: LAUFEN.Product[])=>{
        this.products = response
        this.nbr = this.products.length
      })
  }

  public getProductSelected(id:number){
    this.shopService.getDetailProduct(id).subscribe(
      (response: LAUFEN.Product[])=>{
        this.productSelected = response
        this.productSelectedIsVisible =true
      })
  }

  public toConfirm(id:number){
    this.http.put(BASE_URL + `/shop/update/${id}`,{
      id: id,
    },{
      withCredentials: true
    })
    .subscribe(() => this.getProducts())
  }

  public messageForDelete(id: number){
    this.productSelectedForDelete = id
    this.deleteSelected = true
  }

  public btnYes(){
    this.confirmDelete(this.productSelectedForDelete)
  }
  public btnNo(){
    this.deleteSelected = false
  }
  public confirmDelete(id: number){
    this.http.delete(BASE_URL +`/shop/delete/${id}`,{
      withCredentials: true
    })
    .subscribe(()=>{
      this.getProducts()
      this.deleteSelected = false
      window.location.reload()
    })
  }

}
