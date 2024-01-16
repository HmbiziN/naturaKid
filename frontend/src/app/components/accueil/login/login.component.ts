import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public mail : string =''
  public password : string =''
  public formAuth: FormGroup
  public isSubmitted = false
  public error: boolean = false

  constructor(
    private router: Router,
    private authService: AuthentificationService,
    private formbuilder: FormBuilder,
  ) {
    this.formAuth = this.formbuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  public isConnected: boolean = false

  ngOnInit(): void {
  }

  public submit(){
    if(this.formAuth.valid){
      this.login()
    }
    else{
      this.error = true
    }
  }

  get formControls(){return this.formAuth.controls;}
  public login(){
    this.isSubmitted = true
    if(this.formAuth.invalid){
      return console.log('erreur dans la fction login.ts')
    }
    this.authService
    .login(this.mail, this.password)
    .pipe(first())
    .subscribe({
      next: (co: LAUFEN.User | false) => {
          if (co)
          {
              if (co.is_admin) { 
                  this.router.navigateByUrl('/add_road') 
              }
              else{
                  this.router.navigateByUrl('') 
              } 
          }
         
      },
      error: (error: any) => {
          console.log(error)
          this.error = true
      }
  });
  this.authService.isAdmin().subscribe()

  }
}
