import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';
import { AuthentificationService } from '../../services/authentification.service';

import { LAUFEN } from '../../laufen';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() public productSelected: LAUFEN.Product[]=[]
  editForm: FormGroup
  title: string= ''
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
    this.editForm = this.formBuilder.group({
      title : [''],
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

  public updateProduct(id: number){
    // console.log(this.title, this.content, 'voir modif')

    this.http.put(BASE_URL +`/shop/modif/${id}`, {
      title: this.title|| this.productSelected[0].title,
      content: this.content|| this.productSelected[0].content ,
      img: this.selectedimg?.name || this.productSelected[0].img,
      gender: this.gender || this.productSelected[0].gender,
      cut: this.cut || this.productSelected[0].cut,
      category: this.category || this.productSelected[0].category,
      department: this.department || this.productSelected[0].department,
      city: this.city || this.productSelected[0].city,
      price: this.price || this.productSelected[0].price,
      confirm: false,
      id: this.productSelected[0].id,
      user_id: this.productSelected[0].user_id
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
  //   if(this.editForm.valid){
  //     this.updateProduct(this.productSelected[0].id)
  //   }
  //   else{
  //     console.log('il y a une erreur dans le formulaire')

  // }
    this.updateProduct(this.productSelected[0].id)
  }}
