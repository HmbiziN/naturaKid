import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LAUFEN } from '../../laufen';
import { AuthentificationService } from '../../services/authentification.service';
import { CategoryService } from '../../services/category.service';
import { MapService } from '../../services/map.service';
import * as L from 'leaflet';
import { BASE_URL } from 'src/app/utils/global';

@Component({
  selector: 'app-form-add-pil',
  templateUrl: './form-add-pil.component.html',
  styleUrls: ['./form-add-pil.component.css']
})
export class FormAddPilComponent implements OnInit {

  private subscription : Subscription[]= []

  public isAdmin: boolean = false
  public isConnected: boolean = false

  public map: any
  public itinerary: LAUFEN.Itinerary[]= []
  public itenerarySelected: LAUFEN.Itinerary[]=[]

  public newPil: FormGroup;

  public name: string =''
  public url: string =''
  public city: string =''
  public street: string=''
  public lat: number = 0
  public lng: number = 0
  public cp: number = 0
  public id_i: number = 0
  public categorySelected: string = ''
  public address: string =''
  public content: string =''
  
  public markerGreen = L.icon({
    iconUrl: 'assets/markerGreen.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })
  public category: LAUFEN.Category[]=[]

  constructor(
    private authService: AuthentificationService,
    private mapService: MapService,
    private categoryService: CategoryService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.newPil = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      city: ['', Validators.required],
      categorySelected: [''],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      street: ['', Validators.required],
      cp: ['', Validators.required],
      id_i: ['', Validators.required],
      content: ['', Validators.required],
    })
   }

  ngOnInit(): void {

    this.showCategoryService()
    this.subscription.push(
      this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
    )
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
    this.getIteneraryService(this.map)

  }

  public getIteneraryService(map: any) {
    this.mapService.showItenerary()
      .subscribe((response: LAUFEN.Itinerary[]) => {
        this.itinerary = response
      })
    
      this.map = L.map('map').setView([46.227638,
        2.213749], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'données OpenSreetMap France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(this.map)
    this.map.on('click', (e: L.LeafletMouseEvent) => {this.setLatLng(e.latlng.lat, e.latlng.lng)})
    this.map.on('locationfound', (e: L.LocationEvent) => {this.setLatLng(e.latlng.lat, e.latlng.lng)})
  }

  private setLatLng(lat: number, lng: number) {
    this.lat =lat;
    this.lng = lng;
  }
  public async geocode(adresse: any, map: any) {
    this.address = adresse
    let url = `https://nominatim.openstreetmap.org/search/?format=json&addressdetails=1&q=${adresse}`;
    let resp = await fetch(url);
    let datas = await resp.json();
    const lat = (datas[0].lat)
    const lng = (datas[0].lon)
    this.lat = lat
    this.lng = lng
    const marker = L.marker([this.lat, this.lng],{
      icon: this.markerGreen
    }).addTo(this.map);
    map.flyTo([this.lat, this.lng], 8)
  }
  public showCategoryService() {
    this.categoryService.showCategory()
      .subscribe((response: LAUFEN.Category[]) => {
        this.category = response
      })
  }
  public selectCategory(name: string){
    this.categorySelected = name
  }
  public addNewPil(){
    this.http.post(BASE_URL + '/pil/new_pil/',{
      name: this.name,
      city: this.address,
      category: this.categorySelected,
      lat: this.lat,
      lng: this.lng,
      street: this.street,
      cp: this.cp,
      url: this.url,
      content: this.content,
      id_i : this.id_i
    }, {
      withCredentials: true,
    })
    .subscribe({
      next: () => this.router.navigateByUrl('/list_pic'),
      error: (e) => console.log(e)
    })
  }
  public selectI(id:number){
    this.id_i = id
  }
  submit(){
    this.addNewPil()
  }
}
