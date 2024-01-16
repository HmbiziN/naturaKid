import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.css']
})
export class FormMessageComponent implements OnInit {
  @Input() public user_recipient : number =0
  @Input() public product : LAUFEN.Product[]= []
  @Input() public depends_of : number = 0
  messageForm: FormGroup
  // product: number = 0
  content: string=''
  public isConnected: boolean = false
  public user: LAUFEN.User[]=[]
  public title: string = ""
  private subscription : Subscription[]= []
  public name_recipient : string =""
  
  constructor(
    private http: HttpClient,
    private authService: AuthentificationService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { 
    this.messageForm = this.formBuilder.group({
      content : ['', [Validators.required]],
      title : ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
    this.getSeller(this.user_recipient)
  }

  public getSeller(id: number){
    this.userService.getUser(id)
    .subscribe((response: LAUFEN.User[])=>{
      this.user = response
      console.log(this.user[0].name)
      this.name_recipient = this.user[0].name
    })
  }

  public submit(){
    this.sendMessage()
  }
  public sendMessage(){
    this.http.post(BASE_URL + '/new/message/', {
      content: this.content,
      user_recipient: this.user_recipient,
      product: this.product[0].id,
      description: this.product[0].title + ' / ' + this.product[0].cut + ' / '+ this.product[0].gender,
      title: this.product[0].title,
      name_recipient : this.name_recipient,
    },
    {
      withCredentials: true
    })
    .subscribe({
      next:()=>window.location.reload(),
      error: (e) =>console.log(e)
    })
  }
  public goToShop(){
    window.location.reload()
  }
}
