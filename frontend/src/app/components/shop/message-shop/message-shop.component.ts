import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-shop',
  templateUrl: './message-shop.component.html',
  styleUrls: ['./message-shop.component.css']
})
export class MessageShopComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public goToShop(){
    this.router.navigateByUrl('/shop')
  }
  public goToFormShop(){
    window.location.reload()
  }
}
