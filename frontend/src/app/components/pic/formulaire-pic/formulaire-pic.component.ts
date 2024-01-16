import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../../laufen';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-formulaire-pic',
  templateUrl: './formulaire-pic.component.html',
  styleUrls: ['./formulaire-pic.component.css']
})
export class FormulairePicComponent implements OnInit {

  public map: any
  public name: string =''
  public url: string =''
  public city: string =''
  public street: string=''
  public lat: number = 0
  public lng: number = 0
  public cp: number = 0
  public categorySelected: string = ''
  public address: string =''
  public markerGreen = L.icon({
    iconUrl: 'assets/markerGreen.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })
  public category: LAUFEN.Category[]=[]
  public newPic: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.newPic = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      city: ['', Validators.required],
      categorySelected: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      street: ['', Validators.required],
      cp: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.showCategoryService()
    const centre = {
      lat: 46.227638,
      lng: 2.213749
    }
    this.newPic= new FormGroup({
      name: new FormControl('', Validators.compose([])),
      city: new FormControl('', Validators.compose([])),
      categorySelected: new FormControl('', Validators.compose([])),
      lat: new FormControl('', Validators.compose([])),
      lng: new FormControl('', Validators.compose([])),
      street: new FormControl('', Validators.compose([])),
      cp: new FormControl('', Validators.compose([])),
      url: new FormControl('', Validators.compose([])),
    })
    this.map = L.map('map').setView(centre, 6);
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
  public addNewPic(){
    this.http.post(BASE_URL + '/pic/new_pic/',{
      name: this.name,
      city: this.address,
      category: this.categorySelected,
      lat: this.lat,
      lng: this.lng,
      street: this.street,
      cp: this.cp,
      url: this.url
    }, {
      withCredentials: true,
    })
    .subscribe({
      next: () => this.router.navigateByUrl('/list_pic'),
      error: (e) => console.log(e)
    })
  }
  public submit(){
    if(this.newPic.valid){
      this.addNewPic()
    }
  }
  public selectCategory(name: string){
    this.categorySelected = name
  }
}
