import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
window.L = L
import 'leaflet-gpx';
import { MapService } from '../../services/map.service';
import { LAUFEN } from '../../laufen';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../../services/authentification.service';
import { BASE_URL } from 'src/app/utils/global';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public map: any

  public id: number = 0
  public age: number = 0
  public fId: number = 0
  public lat: number = 0
  public lng: number = 0
  public complexity: number = 0

  public title : string = ''
  public content : string = ''
  public gpx : string = ''

  public gpx2: string = ''
  public departure: string=''
  
  public isFavoris: boolean = false
  public isAdmin: boolean = false
  public isConnected: boolean = false
  public picNull: boolean = false
  public isVisible: boolean = false
  public deleteIsVisible: boolean = false
  
  public pics: LAUFEN.Pic[]=[]
  public favoris: LAUFEN.Favoris[]=[]
  public tableData : any[] =[]
  private subscription : Subscription[]= []
  public header = [['Description']]
  public footer = [['Description']]




  public markerGreen = L.icon({
    iconUrl: 'assets/markerGreen.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })

  constructor(

    private router: Router,
    private mapService : MapService,
    private authService: AuthentificationService,
    private http: HttpClient
  ) { 
    const navigation: any = this.router.getCurrentNavigation();
    const state = navigation.extras.state as{
      id: 0
      title: ''
      content: ''
      age: 0
      complexity: 0
      gpx: ''
      lat: 0
      lng: 0
      departure: ''

    }
    this.id= state.id
    this.title = state.title
    this.content = state.content
    this.age = state.age
    this.complexity = state.complexity
    this.gpx = state.gpx
    this.lat = state.lat
    this.lng = state.lng
    this.gpx2 = state.gpx
    this.departure = state.departure
    this.tableData = [[this.content]]
  }

  ngOnInit(): void {
    this.getFavoris()
    this.subscription.push(
      this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
    )
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
    this.filterByCity(this.departure)
    this.showGpxService(this.gpx)

    const centre = {
      lat: 46.227638,
      lng: 2.213749
    }
    var script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js'

    var script2 = document.createElement('script')
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js'

    document.body.append(script)
    document.body.append(script2)

    const mapGpx = L.map('map').setView(centre, 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    .addTo(mapGpx);

    script2.addEventListener('load', () => {
      var afficherDistance = document.getElementById("distance")
      var afficherD = document.getElementById('denivele')
      var gpx = this.gpx; 
      new L.GPX(gpx, {
        async: true,
        marker_options: {
          startIconUrl : 'assets/images/markerGreen.png'
        }

      })
      .on('loaded', function (e) {
        mapGpx.fitBounds(e.target.getBounds(), e.target.get_elevation_gain());
        var denivele = e.target.get_elevation_gain()
        afficherD!.innerHTML =" " + parseFloat(denivele).toFixed(2) +" mètres"
      })
      .on('loaded', function (e) {
        mapGpx.fitBounds(e.target.getBounds(), e.target.get_distance())
      var distance = e.target.get_distance()
      var dKM = distance/1000
      afficherDistance!.innerHTML = " " + dKM + " km" 
      })
      .addTo(mapGpx);
    })

  }

  public backToList(){
    this.router.navigate(['/list_road'])
  }

  public showGpxService(filename: any) {
    const url = this.mapService.showGpx(filename)
    this.gpx = url
  }

  public downloadGpx(gpx:string){
    const url = this.mapService.downloadGpx(this.gpx2)
    const a = document.createElement('a')
    a.href = url
    a.download = `${this.gpx}`
    a.click()
  }
  
  public generatePdf() {
    var pdf = new jsPDF();
    pdf.setFontSize(10);
    pdf.text('Activité : '+ this.title, 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    (pdf as any).autoTable({
    head: this.header,
    body: this.tableData,
    theme: 'striped',
    fillColor: '#f8bbd0'
    })
    pdf.output('dataurlnewwindow')
    pdf.save('table.pdf');
}  

public filterByCity(city: string){
  this.mapService.filterPicByCity(city)
  .subscribe((response : LAUFEN.Pic[]) =>{
    this.pics = response
    if(this.pics.length == 0){
      this.picNull = true
    }
  })
}
public addFavoris( itinerary_id:number){
  this.http.post(BASE_URL + '/favoris/add/',{
    itinerary_id:itinerary_id
    
  },{
    withCredentials: true
  })
  .subscribe({
    next: ()=> this.isVisible = true,
    error: (e)=> console.log(e)
  })
}
  public deleteFavoris(id:number){
    this.mapService.deleteFavorisService(id)
    .subscribe({
      next: ()=> this.deleteIsVisible = true,
      error: (e)=> console.log(e)
    })
  }
  public getFavoris(){
    this.mapService.getFavorisService().subscribe((response: LAUFEN.Favoris[])=>{
      this.favoris = response
      this.fId = this.favoris[0].id
      for(const f of this.favoris){
        if(f.itinerary_id == this.id){
          this.isFavoris = true
        }
      }
    })
  }
  // public getFavoris(){
  //   this.mapService.getFavorisItineraryService().subscribe((response: LAUFEN.Itinerary[])=>{
  //     this.favoris = response
  //     console.log(this.favoris, 'this.favoris  ICI')
  //     for(let f of this.favoris){
  //       console.log(f.title)
  //     }
  //   })
  // }
  public closeMessage(){
    this.isVisible = false
    this.deleteIsVisible = false
  }

}
