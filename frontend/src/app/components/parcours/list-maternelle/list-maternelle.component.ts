import { Component, OnInit } from '@angular/core';
import { LAUFEN } from '../../laufen';
import * as L from 'leaflet'
import { Subscription } from 'rxjs'
import { AuthentificationService } from '../../services/authentification.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-list-maternelle',
  templateUrl: './list-maternelle.component.html',
  styleUrls: ['./list-maternelle.component.css']
})
export class ListMaternelleComponent implements OnInit {

  public map: any
  public itenerary: LAUFEN.Itinerary[]=[]
  public itenerarySelected: LAUFEN.Itinerary[]=[]
  private subscription : Subscription[]= []
  public itinerary: LAUFEN.Itinerary[]= []
  public user: LAUFEN.User | null = null
  public citySearch: string = ''
  public idISelected: number= 0
  public filterAge: number=0
  public filterComplexity: number=0
  public isAdmin: boolean = false
  public isConnected: boolean = false
  public isVisible: boolean = false
  public mapOne: boolean = true
  public showMessage: boolean = false
  public itineraryIsNull: boolean = false
  public itinerarySelectorShown: boolean = false
  public markerGreen = L.icon({
    iconUrl: 'assets/markerGreen.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })
  public cp: number = 0
  
  constructor(
    private authService: AuthentificationService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    
    this.updateFilterCity()
    const centre = {
      lat: 46.227638,
      lng: 2.213749
    }
    this.subscription.push(
      this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
    )
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
    this.map = L.map('map').setView(centre, 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'données OpenSreetMap France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(this.map)
    this.filterByAge(1, this.map)
  }
  // public filterIteneraryByLabelTrue(map: any) {
  //   this.mapService.filterIteneraryByLabelTrue()
  //     .subscribe((response: LAUFEN.Itinerary[]) => {
  //       this.itenerary = response
  //       for (const d of response) {
  //         const marker = L.marker([d.lat, d.lng], {
  //           icon: this.markerGreen
  //         }).addTo(map);
  //         marker.bindPopup(("<b>"+d.title+"</b><br/>")) 
  //       }
  //     })
  // }
  public getItineraryDetail(id: number){
    this.mapService.showDetailItenerary(id).subscribe(
      (response: LAUFEN.Itinerary[])=>{
        this.itinerary = response
        this.itinerarySelectorShown = true
        this.mapOne = false
      }
    )
  }
  public updateFilterCity(){
    const itenerary = this.itenerary
    if(this.citySearch && this.citySearch !== ''){
      const s = this.citySearch.toUpperCase()
    this.itenerary = this.itenerary.filter(
      i => i.departure.toUpperCase().includes(s)
    )
    }else{
      this.itenerary = itenerary
      
    }
  }
  public filterByComplexity(complexity: number){
    this.filterComplexity = complexity
  }
  public showIteneraryService(map: any) {
    this.mapService.showItenerary()
      .subscribe((response: LAUFEN.Itinerary[]) => {
        this.itenerary = response
        if (this.itenerary.length == 0){
          this.itineraryIsNull = true
        }
        for (const d of response) {
          const marker = L.marker([d.lat, d.lng], {
            icon: this.markerGreen
          }).addTo(map);
          marker.bindPopup(("<b>"+d.title+"</b><br/>")) 
        }
      })
  }
  // public filterByLabelFalse(){
  //   this.mapService.filterIteneraryByLabelFalse()
  //   .subscribe((response : LAUFEN.Itinerary[]) =>{
  //     this.itenerary = response
  //   })
  // }
  // public filterByLabelTrue(){
  //   this.mapService.filterIteneraryByLabelTrue()
  //   .subscribe((response : LAUFEN.Itinerary[]) =>{
  //     this.itenerary = response
  //   })
  // }
  public deleteItinerary(id:number){
    this.mapService.deleteItineraryService(id)
    .subscribe(()=>{
      this.showIteneraryService(this.map)
      this.showMessage = false
      window.location.reload()
    })
  }

  public messageDeleteItinerary(id:number){
    this.idISelected = id
    this.showMessage = true
  }
  public btnNo(){
    window.location.reload()
  }
  public filterByAge(filtre: number, map:any){
    this.filterAge = filtre
    this.mapService.filterItenerary(filtre)
    .subscribe((response : LAUFEN.Itinerary[]) =>{
      this.itenerary = response
      for (const d of response) {
        const marker = L.marker([d.lat, d.lng], {
          icon: this.markerGreen
        }).addTo(map);
        marker.bindPopup(("<b>"+d.title+"</b><br/>")) 
      }
    })
  }
  public updateFilter(filtre: number, complexity: number){
    this.mapService.filterTest(filtre, complexity)
    .subscribe((response: LAUFEN.Itinerary[])=>{
      this.itenerary = response
    })
  }

  public getItineraryWithFilter(){
    this.updateFilter
    (this.filterAge, this.filterComplexity)
  }

  public openItinerarySelect(event: Event | undefined = undefined): void {
    this.itinerarySelectorShown = true

    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  public closeItinerarySelect(validate: boolean): void {
    this.itinerarySelectorShown = false
    if (!validate)
      return
  }
}
