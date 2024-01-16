import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detail-article-shop',
  templateUrl: './detail-article-shop.component.html',
  styleUrls: ['./detail-article-shop.component.css']
})
export class DetailArticleShopComponent implements OnInit {
  public user: LAUFEN.User[]=[]
  public formMsgIsVisible : boolean = false
  public user_recipient: number = 0
  public isConnected: boolean = false

  private subscription : Subscription[]= []
  @Input() public productSelected: LAUFEN.Product[]=[]
  constructor(
    private authService: AuthentificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
    this.getSeller(this.productSelected[0].user_id)
  }

  public getSeller(id: number){
    this.userService.getUser(id)
    .subscribe((response: LAUFEN.User[])=>{
      this.user = response
    })
  }

  public accesToFormMessage(id: number){
    this.formMsgIsVisible = true
    this.user_recipient = id
  }
}
