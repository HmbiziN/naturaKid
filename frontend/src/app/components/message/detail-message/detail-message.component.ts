import { Component, Input, OnInit } from '@angular/core';
import { LAUFEN } from '../../laufen';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.css']
})
export class DetailMessageComponent implements OnInit {

  @Input() public messageSelected: LAUFEN.message[]=[]
  public user: LAUFEN.User[]=[]
  public name_sender : string =""
  public formIsVisible : boolean = false
  public depends_of: number = 0 
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getSender(this.messageSelected[0].user_sender)
  }

  public getSender(id: number){
    this.userService.getUser(id)
    .subscribe((response: LAUFEN.User[])=>{
      this.user = response
      this.name_sender = this.user[0].name
    })
  }
  public isAnswerdOk(){
    this.depends_of = this.messageSelected[0].id
    this.formIsVisible = true
  }
}
