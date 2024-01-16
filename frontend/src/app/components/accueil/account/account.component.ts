import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { MapService } from '../../services/map.service';
import { ShopService } from '../../services/shop.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private subscription : Subscription[]= []

  public favoris: LAUFEN.Itinerary[]= []
  public itinerary: LAUFEN.Itinerary[]= []
  public products: LAUFEN.Product[]= []
  public user: LAUFEN.User[]=[]
  public isConnected: boolean= false
  public age: number= 0
  public cp: number= 0
  public isVisible: boolean = false
  public changePasswordIsVisible: boolean = false
  public name: string = ""
  public mail: string = ""
  public u: [] = []
  public productSelected: LAUFEN.Product[]= []
  public itinerarySelectorShown: boolean = false
  public productSelectedIsVisible: boolean = false
  public messageActive: boolean= true
  public myItineraryActive: boolean= false
  public myProductsActive: boolean= false
  public myInfoActive: boolean= false
  public updateIsVisible: boolean=false

  
  constructor(
    private authService: AuthentificationService,
    private mapService: MapService,
    private http: HttpClient,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.getUser()
    this.getFavoris()
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
  }

  public getFavoris(){
    this.mapService.getFavorisItineraryService().subscribe((response: LAUFEN.Itinerary[])=>{
      this.favoris = response
      for(let f of this.favoris){
      }
    })
  }

  public getItineraryDetail(id: number){

    this.mapService.showDetailItenerary(id).subscribe(
      (response: LAUFEN.Itinerary[])=>{
        this.itinerary = response
        this.itinerarySelectorShown = true
      }
    )
  }

  public getUser(){
    this.http.get<LAUFEN.User | false>(BASE_URL+"/is_connected",{
      withCredentials: true
    })
    .subscribe((response: any)=>{
      this.name = response.name
      this.mail = response.mail
    })
   }
   goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
  public getProducts(){
    this.shopService.getProductsByUser()
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
  public messageActived(){
    this.messageActive = true
    this.myItineraryActive= false
    this.myProductsActive= false
    this.myInfoActive= false
  }
  public itineraryActived(){
    this.messageActive = false
    this.myItineraryActive= true
    this.myProductsActive= false
    this.myInfoActive= false
  }
  public productsActived(){
    this.messageActive = false
    this.myItineraryActive= false
    this.myProductsActive= true
    this.myInfoActive= false
  }
  public infoActived(){
    this.messageActive = false
    this.myItineraryActive= false
    this.myProductsActive= false
    this.myInfoActive= true
  }
  public getupdate(id:number){
    this.shopService.getDetailProduct(id).subscribe(
      (response: LAUFEN.Product[])=>{
        this.productSelected = response
        this.updateIsVisible = true
      })
  }
  public openItinerarySelect(event: Event | undefined = undefined): void {
    this.itinerarySelectorShown = true

    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  public closeItinerarySelect(validate: boolean): void {
    this.itinerarySelectorShown = false
    if (!validate)
      return
  }
}
