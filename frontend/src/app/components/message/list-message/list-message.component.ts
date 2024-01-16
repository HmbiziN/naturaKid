import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { MessageService } from '../../services/message.service';
import { ShopService } from '../../services/shop.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit {
  public messages: LAUFEN.message[]=[]
  public messageSelected: LAUFEN.message[]=[]
  public user: LAUFEN.User[]=[]
  public product: LAUFEN.Product[]=[]
  public messageDetailIsVisible: boolean = false
  public deleteSelected: boolean = false
  public messageSelectedForDelete: number = 0
  public cp: number= 0


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserService,
    public shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getAllMessagesReceived()

  }

  public getAllMessagesReceived(){
    this.messageService.getAllMessagesReceived()
    .subscribe((response: LAUFEN.message[])=>{
      this.messages = response
    })
    
  }

  public readingMessage(id:number){
    this.ifRead(id)
    this.getDetailMessage(id)
  }
  public getDetailMessage(id:number){
    this.goToBottom()
    this.messageService.getDetailMessage(id).subscribe((
      response: LAUFEN.message[]
    )=>{
      this.messageSelected = response
      this.messageDetailIsVisible = true
    })
  }

  public ifRead(id: number){
    this.http.put(BASE_URL + `/messages/update/${id}`,{
      id: id,
    },{
      withCredentials: true
    })
    .subscribe(() => this.getAllMessagesReceived())
  }

  public messageForDelete(id: number){
    this.messageSelectedForDelete = id
    this.deleteSelected = true
  }

  public btnYes(){
    this.confirmDelete(this.messageSelectedForDelete)
  }
  public btnNo(){
    this.deleteSelected = false
  }
  public confirmDelete(id: number){
    this.http.delete(BASE_URL +`/messages/delete/${id}`,{
      withCredentials: true
    })
    .subscribe(()=>{
      this.getAllMessagesReceived()
      this.deleteSelected = false
      window.location.reload()
    })
  }
  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
  
}
