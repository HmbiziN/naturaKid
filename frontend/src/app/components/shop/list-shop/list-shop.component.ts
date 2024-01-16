import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.css']
})
export class ListShopComponent implements OnInit {

  public products : LAUFEN.Product[]= []
  public productSelected: LAUFEN.Product[]= []
  public productSelectedIsVisible: boolean = false
  public moreFilter: boolean = false
  public isConnected: boolean = false
  public department: string = ""
  public category: string = ""
  public cut: string = ""
  public gender: string = ""
  public cp: number= 0 

  private subscription : Subscription[]= []
  
  constructor(
    private authService: AuthentificationService,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
  }

  public getProducts(){
    this.shopService.getValidatedProducts()
      .subscribe((response: LAUFEN.Product[])=>{
        this.products = response
      })
  }

  public getProductSelected(id:number){
    // this.productSelectedIsVisible =true
    this.goToBottom()
    this.shopService.getDetailProduct(id).subscribe(
      (response: LAUFEN.Product[])=>{
        this.productSelected = response
        this.productSelectedIsVisible =true
      })
  }
  public updateMultipleFilter(){
    this.shopService.filterMultiple(this.department, this.gender, this.category, this.cut)
    .subscribe((response: LAUFEN.Product[])=>{
      this.products = response
    })
  }
  public updateGender(gender: string){
    this.gender = gender
  }
  public updateCategory(category: string){
    this.category = category
  }
  public updateCut(cut: string){
    this.cut = cut

  }
  public updateDepartment(department: string){
    this.department = department

  }
  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

  moreFilterIsVisible(){
    this.moreFilter = true
  }

  public getProductByGender(gender: string){
    this.shopService.filterGender(gender)
    .subscribe((response: LAUFEN.Product[])=>{
      this.products = response
    })
  }

}
