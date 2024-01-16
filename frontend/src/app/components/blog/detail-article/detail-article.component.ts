import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>()
  @Output() validate: EventEmitter<void> = new EventEmitter<void>()
  @Input() public articleSelected: LAUFEN.Article[] = []
  public isAdmin: boolean = false
  private subscription : Subscription[]= []

  constructor(
    private authService: AuthentificationService,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    this.subscription.push(
      this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
    )
  }
 public goToList(){
  window.location.reload()
 }
}
