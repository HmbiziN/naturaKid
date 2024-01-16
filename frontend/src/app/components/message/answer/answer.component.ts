import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() public depends_of: number = 0
  @Input() public name_sender: string = ""
  @Input() public messageSelected: LAUFEN.message[]=[]
  @Input() public user_recipient : number =0
  public user: LAUFEN.User[]=[]
  answerForm : FormGroup
  content: string=''
  public name_recipient : string =""
  subscription: any;
  public isConnected: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthentificationService,
    private userService: UserService
  ) { 
    this.answerForm = this.formBuilder.group({
      content : ['', [Validators.required]],
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
      this.name_recipient = this.user[0].name
    })
  }
  public sendMessage(){
    this.http.post(BASE_URL + '/new/message/', {
      content: this.content,
      user_recipient: this.messageSelected[0].user_sender,
      product: this.messageSelected[0].product,
      description: this.messageSelected[0].description,
      title: this.messageSelected[0].title,
      name_recipient : this.name_sender,
      depends_of : this.depends_of
    },
    {
      withCredentials: true
    })
    .subscribe({
      next:()=>window.location.reload(),
      error: (e) =>console.log(e)
    })
  }
  public submit(){
    this.sendMessage()
  }
  public goToBack(){
    window.location.reload()
  }
}
