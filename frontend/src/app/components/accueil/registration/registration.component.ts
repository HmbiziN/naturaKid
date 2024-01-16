import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/utils/global';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public formI: FormGroup
  public mail : FormControl
  public name: FormControl
  public password: FormControl
  public passwordConfirm: FormControl
  public errorMessage: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.mail = this.fb.control("", [Validators.required, Validators.email])
    this.name = this.fb.control("", [Validators.required, Validators.minLength(3)])
    this.password = this.fb.control("", [Validators.required, Validators.minLength(6)])
    this.passwordConfirm = this.fb.control("", [Validators.required, Validators.minLength(6)])
    this.formI = this.fb.group({
      name: this.name,
      password: this.password,
      mail: this.mail
      
    }),{validator: this.checkIfMatchingPasswords('password', 'passwordConfirm')}
    
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
    if(this.mail.value !='' && this.name.value != '' && this.password.value != ''){
      this.http.post(BASE_URL + '/registration', {
        mail: this.mail.value,
        name: this.name.value,
        password: this.password.value,
      })
      .subscribe({
        next: ()=> this.router.navigateByUrl('login'),
        error: (e) => console.log(e)
      })
    }
    else {
      this.errorMessage = true
    }
  }

}
