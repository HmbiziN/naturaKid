import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css']
})
export class MyArticleComponent implements OnInit {
  public user: LAUFEN.User[]=[]
  public formMsgIsVisible : boolean = false
  public user_recipient: number = 0
  public isConnected: boolean = false
  public deleteSelected: boolean = false
  public updateIsVisible: boolean = false
  public productSelectedForDelete : number = 0
  
  private subscription : Subscription[]= []
  @Input() public productSelected: LAUFEN.Product[]=[]
  constructor(
    private authService: AuthentificationService,
    private userService: UserService,
    private http: HttpClient
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

  public messageForDelete(id: number){
    this.productSelectedForDelete = id
    this.deleteSelected = true
  }

  public btnYes(){
    this.deleteProduct(this.productSelectedForDelete)
  }
  public btnNo(){
    this.deleteSelected = false
  }

  public deleteProduct(id:number){
    this.http.delete(BASE_URL +`/shop/delete/${id}`,{
      withCredentials: true
    })
    .subscribe(()=>{
      // this.getProducts()
      this.deleteSelected = false
      window.location.reload()
    })
  }
  public updateProducts(id:number){
    this.updateIsVisible = true
  }
}