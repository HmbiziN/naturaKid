import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/utils/global';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  public formPassword: FormGroup
  public mail : string = ''
  public password : string = ''
  public newPassword : string = ''
  public passwordConfirm : string = ''

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formPassword = this.formbuilder.group({
      mail: ['', Validators.required],
      password:new FormControl (['', Validators.minLength(6)])
      ,
      newPassword:new FormControl (['', Validators.minLength(6)]),
      passwordConfirm:new FormControl (['', Validators.minLength(6)])
    },
    {validator: this.checkIfMatchingPasswords('newPassword', 'passwordConfirm')}
    )
  }

  ngOnInit(): void {
  }
  checkIfMatchingPasswords(password: string, passwordConfirm: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
          passwordConfirmationInput = group.controls[passwordConfirm];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  public registration(){
    this.http.put(BASE_URL + '/change/password',{"password": this.password, "new_password": this.newPassword, "mail": this.mail}, {
    })
    .subscribe({
      next: ()=> this.router.navigateByUrl('accueil'),
      error: (e) => console.log(e)
    })
  }
  public submit(){
    this.registration()
  }
  public refresh(){
    window.location.reload()
  }
}
