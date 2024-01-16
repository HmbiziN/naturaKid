import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) { }

  ngOnInit(): void {
  }

  public logout(){
    this.authService.logout().subscribe()
    this.router.navigateByUrl('/accueil')
  }
  public back(){    
    this.router.navigateByUrl('list_road')
  }
}
