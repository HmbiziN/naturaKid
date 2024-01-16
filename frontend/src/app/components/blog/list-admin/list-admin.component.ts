import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  public isAdmin: boolean = false
  private subscription : Subscription[]= []
  public articles: LAUFEN.Article[]=[]
  public showMessage: boolean = false
  public idArticleSelected: number = 0
  
  constructor(
    private http: HttpClient,
    private blogService: BlogService,
    private authService : AuthentificationService
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
    )
    this.showArticleService()
  }

  public showArticleService() {
    this.blogService.showArticle()
      .subscribe((response: LAUFEN.Article[]) => {
        this.articles = response
        // this.showMessage = false
      })
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
  public editArticle(id: number){
    this.http.put(BASE_URL + `/blog/update/${id}`,{
      id: id,
    },{
      withCredentials: true
    })
    .subscribe(() => this.showArticleService())
  }
  public messageDeleteArticle(id:number){
    this.idArticleSelected = id
    this.showMessage = true
  }
public btnNo(){
  window.location.reload()
}
}
