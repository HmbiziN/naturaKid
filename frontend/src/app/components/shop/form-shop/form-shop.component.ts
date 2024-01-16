import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-form-shop',
  templateUrl: './form-shop.component.html',
  styleUrls: ['./form-shop.component.css']
})
export class FormShopComponent implements OnInit {


  productForm: FormGroup
  title: string = ''
  content: string = ''
  img: string = '' 
  gender: string = ''
  cut: string = ''
  category: string = ''
  department: string = ''
  city: string = ''
  price: number = 0 
  confirm: boolean = false
  public isConnected: boolean = false
  public selectedimg : File | null = null
  public messageIsVisible: boolean = false

  private subscription : Subscription[]= []

  constructor(
    private http: HttpClient,
    private authService: AuthentificationService,
    private formBuilder: FormBuilder,
  ) { 
    this.productForm = this.formBuilder.group({
      title : ['',[Validators.required, Validators.minLength(15)]],
      content : ['',[Validators.required, Validators.minLength(20)]],
      img : ['',[Validators.required]],
      gender : ['',[Validators.required]],
      cut : ['',[Validators.required]],
      category : ['',[Validators.required]],
      department : ['',[Validators.required]],
      city : ['',[Validators.required]],
      price: ['',[Validators.required]]
    })
     
  }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
  }

  public onimgSelected(event: any){
    this.selectedimg = <File>event.target.files[0]
    this.uploadimg(this.selectedimg)
  }
  
  public uploadimg(selectedimg: File){
    const fd = new FormData()
    fd.append('img', selectedimg, selectedimg.name)
    return this.http.post(BASE_URL + '/shop/add_img/', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
      }
      else if (event.type === HttpEventType.Response){
      }
    })
  }

  public addNewProduct(){

    this.http.post(BASE_URL + '/shop/add/', {
      title: this.title,
      content: this.content,
      img: this.selectedimg?.name,
      gender: this.gender,
      cut: this.cut,
      category: this.category,
      department: this.department,
      city: this.city,
      price: this.price,
      confirm: this.confirm,
    },
    {
      withCredentials: true
    })
    .subscribe({
      next:()=> this.messageIsVisible = true,
      error: (e) => console.log(e)
    })
  }

  submit(){
    // if(this.productForm.valid){
    //   this.addNewProduct()
    // }
    // else{
    //   console.log('il y a une erreur dans le formulaire')
    // }
    this.addNewProduct()
  }

}
