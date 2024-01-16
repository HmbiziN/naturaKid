import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';

@Component({
  selector: 'app-formulaire-article',
  templateUrl: './formulaire-article.component.html',
  styleUrls: ['./formulaire-article.component.css']
})
export class FormulaireArticleComponent implements OnInit {
  public newArticle: FormGroup;
  public title: string = ''
  public abstract: string = ''
  public paragraph_one: string = ''
  public paragraph_two: string = ''
  public paragraph_three: string = ''
  public active: boolean = false
  public img: string = ''
  public categorie: string = ''
  // public label: boolean = false
  public activeTrue: boolean = false
  public activeFalse: boolean = false
  public selectedPicture: File | null = null
  public selectedPicture2: File | null = null
  public selectedPicture3: File | null = null

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { 
    this.newArticle = this.formBuilder.group({
      title: ['', Validators.required],
      abstract: ['', Validators.required],
      paragraph_one: ['', Validators.required],
      paragraph_two: ['', Validators.required],
      paragraph_three: ['', Validators.required],
      active: ['', Validators.required],
      img: ['', Validators.required],
      categorie: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.newArticle =new FormGroup({
      title: new FormControl('', Validators.compose([])),
      abstract: new FormControl('', Validators.compose([])),
      paragraph_one: new FormControl('', Validators.compose([])),
      paragraph_two: new FormControl('', Validators.compose([])),
      paragraph_three: new FormControl('', Validators.compose([])),
      active: new FormControl('', Validators.compose([])),
      img: new FormControl('', Validators.compose([])),
      categorie: new FormControl('', Validators.compose([])),
      
    })
  }
  public activeSelected(value: boolean){
    this.active = value
    if (this.active == true) {
      this.activeTrue = true
    }
    else {
    this.activeTrue = false
    }
    if (this.active == false) {
      this.activeFalse = true
    }
    else {
    this.activeFalse = false
    }
  }

  public onimgSelected(event: any){
    this.selectedPicture = <File>event.target.files[0]
    this.uploadimg(this.selectedPicture)
  }
  
  public uploadimg(selectedPicture: File){
    const fd = new FormData()
    fd.append('img', selectedPicture, selectedPicture.name)
    return this.http.post(BASE_URL + '/blog/add_img/', fd, {
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
  public onimgSelected2(event: any){
    this.selectedPicture2 = <File>event.target.files[0]
    this.uploadimg(this.selectedPicture2)
  }
  
  public uploadimg2(selectedPicture2: File){
    const fd = new FormData()
    fd.append('img', selectedPicture2, selectedPicture2.name)
    return this.http.post(BASE_URL + '/blog/add_img/', fd, {
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
  public onimgSelected3(event: any){
    this.selectedPicture3 = <File>event.target.files[0]
    this.uploadimg(this.selectedPicture3)
  }
  
  public uploadimg3(selectedPicture3: File){
    const fd = new FormData()
    fd.append('img', selectedPicture3, selectedPicture3.name)
    return this.http.post(BASE_URL + '/blog/add_img/', fd, {
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

  public categorieSelected(c: string){
    this.categorie = c
  }
  public addNewArticle(){
    this.http.post(BASE_URL + '/blog/new_article/',{
      title: this.title,
      abstract: this.abstract,
      paragraph_one : this.paragraph_one,
      paragraph_two : this.paragraph_two,
      paragraph_three : this.paragraph_three,
      active: this.active,
      categorie: this.categorie,
      img: this.selectedPicture?.name,
      img2: this.selectedPicture2?.name,
      img3: this.selectedPicture3?.name,
    },{
      withCredentials: true
    })
    .subscribe({
      next: ()=> this.router.navigateByUrl('/'),
      error: (e)=> console.log(e)
    })
  }
  public submit(){
    if(this.newArticle.valid){
      this.addNewArticle()
    }
  }
}
