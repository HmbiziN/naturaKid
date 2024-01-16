import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { MessageService } from '../../services/message.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isConnected: boolean = false
  private subscription : Subscription[]= []
  public user: LAUFEN.User[]=[]
  public isAdmin: boolean = false
  public message: boolean = true
  public messages: LAUFEN.message[]=[]
  public nbr: number =0
  public nbrPendingAt: number=0
  public products : LAUFEN.Product[]= []

  constructor(private authService : AuthentificationService, private messageService: MessageService, private router: Router, private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
    this.subscription.push(
      this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
    )
    this.getNbrMessagesNotRead()
  }
  ngOnDestroy(){
    this.subscription.forEach(s => s.unsubscribe())
  }

  public getProducts(){
    this.shopService.getProductsToConfirm()
      .subscribe((response: LAUFEN.Product[])=>{
        this.products = response
        this.nbrPendingAt = this.products.length
      })
  }

  public getNbrMessagesNotRead(){
    this.messageService.getAllMessagesReceived()
    .subscribe((response: LAUFEN.message[])=>{
      this.messages = response
      this.nbr = this.messages.length
      if(this.messages.length != 0){
        this.message = true
      }
      else{
        this.message =false
      }
      
    })

  }
  public goToAccount(){
    this.router.navigateByUrl("/account")
  }

}
