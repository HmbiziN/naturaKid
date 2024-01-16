import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/utils/global';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup 
  public messageIsVisible: boolean = false
  public firstName: string = '' 
  public mail: string = ''  
  public subject: string = ''  
  public message: string = ''  
  public errorMessage: boolean = false
  
  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private router: Router
    ){
      this.contactForm = this.formBuilder.group({
        mail: ['', Validators.required],
        subject: ['', Validators.required],
        firstName: ['', Validators.required],
        message: ['', Validators.required],
      })
    } 

  ngOnInit(): void {
  }

  submit(){
    this.sentMail()
  }
  public goBack(){
    history.go(-1)
  }

  public sentMail(){
    if(this.mail !='' && this.firstName !=''&& this.message !='' && this.subject !=''){
      console.log(this.mail)
      this.http.post(BASE_URL + '/messages/admin/', {
        senderMail: this.mail,
        name: this.subject,
        message: this.message,
        subject: this.firstName,
      },
       {
        withCredentials: true
      })
  
      .subscribe({
        next: ()=> this.messageIsVisible = true,
        complete: ()=> this.initialization(),
        error:(e)=> console.log(e)
      })
    }
    else{
      this.errorMessage = true
    }
  }

public initialization(){
  this.firstName = '',
  this.mail = '',
  this.message = '',
  this.subject = ''
}
}
