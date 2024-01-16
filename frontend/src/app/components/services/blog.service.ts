import { Injectable } from '@angular/core';
import { LAUFEN } from '../laufen';
import { BASE_URL } from 'src/app/utils/global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public showArticle(){
    return this.http.get < LAUFEN.Article[] >(BASE_URL+'/blog/',{
      withCredentials: true
    })
  }
  public showArticleNotArchived(){
    return this.http.get < LAUFEN.Article[] >(BASE_URL+'/blog/not/archived/',{
      withCredentials: true
    })
  }
  public showArticleDetail(id:number){
    return this.http.get < LAUFEN.Article[] >(BASE_URL+`/blog/detail/${id}`,{
      withCredentials: true
    })
  }
  public downloadImg(filename: string){
    return BASE_URL+`/blog/download_img/${filename}`
  }
  public filterArticle(categorie: string){
    return this.http.get< LAUFEN.Article[]>(BASE_URL +`/blog/filter/${categorie}`,{
      withCredentials: true
    })
  }
}
