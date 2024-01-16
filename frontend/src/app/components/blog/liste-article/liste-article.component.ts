import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { LAUFEN } from '../../laufen';
import { BASE_URL } from 'src/app/utils/global';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})
export class ListeArticleComponent implements OnInit {
  public articles: LAUFEN.Article[]=[]
  public article: LAUFEN.Article[]=[]
  public articleSelected: LAUFEN.Article[]=[]
  public showMessage: boolean = false
  public blogSelectorShown: boolean = false
  public showMessageEdit: boolean = false
  public materiel: boolean = false
  public isAdmin: boolean = false
  public active : boolean = false
  public isVisible : boolean = false
  public idArticleSelected: number = 0
  public title: string=''
  public abstract :string ='' 
  public paragraph_one :string ='' 
  public paragraph_two :string ='' 
  public paragraph_three :string ='' 
  public formEditArticle: FormGroup

  private subscription : Subscription[]= []

  constructor(
    private blogService: BlogService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService : AuthentificationService
  ) { 
    this.formEditArticle = this.formBuilder.group({
      title: ['', Validators.required],
      abstract: ['', Validators.required],
      paragraph_one: ['', Validators.required],
      paragraph_two: ['', Validators.required],
      paragraph_three: ['', Validators.required],
      // active: ['', Validators.required],
      // image: ['', Validators.required],
      // categorie: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
    )
    this.formEditArticle =new FormGroup({
      title: new FormControl('', Validators.compose([])),
      abstract: new FormControl('', Validators.compose([])),
      paragraph_one: new FormControl('', Validators.compose([])),
      paragraph_two: new FormControl('', Validators.compose([])),
      paragraph_three: new FormControl('', Validators.compose([])),
      // active: new FormControl('', Validators.compose([])),
      // image: new FormControl('', Validators.compose([])),
      // categorie: new FormControl('', Validators.compose([])),
    })
    this.showArticleService()
    this.showMessage = false
  }

  public showArticleService() {
    this.blogService.showArticleNotArchived()
      .subscribe((response: LAUFEN.Article[]) => {
        this.articles = response
        this.showMessage = false
      })
  }
  public editArticle(id: number){
    this.http.put(BASE_URL + `/blog/update/${id}`,{
      id: id,
    },{
      withCredentials: true
    })
    .subscribe(() => this.showArticleService())
  }
  public editRestoreArticle(id: number){
    this.http.put(BASE_URL + `/blog/restore/${id}`,{
      id: id,
    },{
      withCredentials: true
    })
    .subscribe(() => this.showArticleService())
  }

  public deleteArticle(id:number){
    this.http.delete(BASE_URL +`/blog/delete/${id}`,{
      withCredentials: true
    })
    .subscribe(()=>{
      this.showArticleService()
      this.showMessage = false
      window.location.reload()
    })
  }
  public messageDeleteArticle(id:number){
    this.idArticleSelected = id
    this.showMessage = true
  }
public btnNo(){
  window.location.reload()
}
// public messageEditArticle(id:number){
//   this.showMessageEdit = true
// }
public getArticleDetail(id: number){
  this.blogService.showArticleDetail(id).subscribe(
    (response: LAUFEN.Article[])=>{
      this.article = response
      this.blogSelectorShown = true
    }
  )
}
public filterArticle(categorie: string){
  this.blogService.filterArticle(categorie)
  .subscribe((response: LAUFEN.Article[])=>{
    this.articles = response
  })
}
public openBlogSelect(event: Event | undefined = undefined): void {
  this.blogSelectorShown = true

  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
}

public closeBlogSelect(validate: boolean): void {
  this.blogSelectorShown = false
  if (!validate)
    return
}

}
