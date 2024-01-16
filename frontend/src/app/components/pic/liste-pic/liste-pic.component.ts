import { Component, OnInit } from '@angular/core';
import { LAUFEN } from '../../laufen';
import * as L from 'leaflet';
import { MapService } from '../../services/map.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-liste-pic',
  templateUrl: './liste-pic.component.html',
  styleUrls: ['./liste-pic.component.css']
})
export class ListePicComponent implements OnInit {
  public map: any
  public pics : LAUFEN.Pic[]=[]
  public category : LAUFEN.Category[]=[]
  public showMessage : boolean =false
  public idPSelected : number =0
  public markerGreen = L.icon({
    iconUrl: 'assets/markerGreen.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })

  constructor(
    private mapService: MapService, 
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.showCategoryService()
    const centre = {
      lat: 46.227638,
      lng: 2.213749
    }
    this.map = L.map('map').setView(centre, 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'données OpenSreetMap France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(this.map)
    this.showPicService(this.map)
  }

  public showPicService(map: any) {
    this.mapService.showPic()
      .subscribe((response: LAUFEN.Pic[]) => {
        this.pics = response
        for (const p of response) {
          const marker = L.marker([p.lat, p.lng], {
            icon: this.markerGreen
          }).addTo(map);
          marker.bindPopup(("<b>"+p.name+"</b><br/>")) 
        }
      })
  }
  public showCategoryService() {
    this.categoryService.showCategory()
      .subscribe((response: LAUFEN.Category[]) => {
        this.category = response
      })
  }
  public filterByCity(city: string){
    this.mapService.filterPicByCity(city)
    .subscribe((response : LAUFEN.Pic[]) =>{
      this.pics = response
    })
  }
  public filterByCategory(category: string){
    this.mapService.filterPicByCategory(category)
    .subscribe((response : LAUFEN.Pic[]) =>{
      this.pics = response
    })
  }

  public deletePic(id:number){
    this.mapService.deletePicService(id)
    .subscribe(()=>{
      this.showMessage = false
      window.location.reload()
    })
  }
  public messageDeletePic(id:number){
    this.idPSelected = id
    this.showMessage = true
  }
  public btnNo(){
    window.location.reload()
  }
  }


