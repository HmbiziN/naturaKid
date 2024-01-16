import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  private subscription : Subscription[]= []
  public isConnected: boolean = false
  public isVisible: boolean = false
  public isVisibleWithLabel: boolean = false
  public isVisibleForMaternelle: boolean = false
  public isVisibleForPrimaire: boolean = false
  public isVisibleForCollege: boolean = false
  public blogSelectorShown: boolean = false
  // public isBlogVisible: boolean = false
  public isShopVisible: boolean = false
  public isArticleVisible: boolean = false
  public target: any
  public article: LAUFEN.Article[]= []
  public filtre: number = 0
  
  constructor(
    private authService: AuthentificationService,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
  }
  public goToItinerary(){
    this.isVisible = true
    this.isVisibleForMaternelle = false
    this.isVisibleForPrimaire = false
    this.isVisibleForCollege = false
    this.isVisibleWithLabel= false
  }
  goToMaternelle(){
    this.isVisible = false
    this.isVisibleForMaternelle = true
    this.isVisibleForPrimaire = false
    this.isVisibleForCollege = false
    this.isVisibleWithLabel= false
  }
  goToPrimaire(){
    this.isVisible = false
    this.isVisibleForMaternelle = false
    this.isVisibleForPrimaire = true
    this.isVisibleForCollege = false
    this.isVisibleWithLabel= false
  }
  goToCollege(){
    this.isVisible = false
    this.isVisibleForMaternelle = false
    this.isVisibleForPrimaire = false
    this.isVisibleForCollege = true
    this.isVisibleWithLabel= false
  }
  public goToLabel(){
    this.isVisibleWithLabel = true
    this.isVisible = false
    this.isVisibleForMaternelle = false
    this.isVisibleForPrimaire = false
    this.isVisibleForCollege = false
  }

goToBottom(){
  window.scrollTo(0,document.body.scrollHeight);
}
goToShop(){
  this.goToBottom()
  this.isShopVisible = true
}
// goToBlog(){
//   this.goToBottom()
//   this.isBlogVisible = true
// }
public getArticleDetail(id: number){
  this.blogService.showArticleDetail(id).subscribe(
    (response: LAUFEN.Article[])=>{
      this.article = response
      this.blogSelectorShown = true
    }
  )
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
