import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LAUFEN } from '../../laufen';
import { MapService } from '../../services/map.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as L from 'leaflet';
window.L = L
import 'leaflet-gpx';
import { AuthentificationService } from '../../services/authentification.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/utils/global';

@Component({
  selector: 'app-detail-itinerary',
  templateUrl: './detail-itinerary.component.html',
  styleUrls: ['./detail-itinerary.component.css']
})
export class DetailItineraryComponent implements OnInit {

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>()
  @Output() validate: EventEmitter<void> = new EventEmitter<void>()
  @Input() public itinerary: LAUFEN.Itinerary[] = []

  public favoris: LAUFEN.Favoris[]=[]
  public deleteIsVisible: boolean = false
  public isFavoris: boolean = false
  public isConnected: boolean = false
  public addIsVisible: boolean = false
  public picNull: boolean = false
  public tableData : any[] =[]
  public map2: any
  public gpx : string = ''
  public header = [['Description']]
  public fId: number = 0
  public id: number = 0
  public pics: LAUFEN.Pic[]=[]
  public descriptionMeteo : string = ''
  public iconMeteo: string= ''
  public iconUrl: string= ''
  public temp: number = 0

  private subscription : Subscription[]= []

  constructor(
    private authService: AuthentificationService,
    private mapService: MapService,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.getMeteo()
    this.getFavoris()
    this.subscription.push(
      this.authService.isConnected().subscribe(isConnected=>this.isConnected = isConnected)
    )
    this.showGpxService(this.itinerary[0].gpx)
    this.filterByCity(this.itinerary[0].departure)
    this.id = this.itinerary[0].id
    const centre = {
      lat: this.itinerary[0].lat,
      lng: this.itinerary[0].lng
    }
    var script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js'

    var script2 = document.createElement('script')
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js'

    document.body.append(script)
    document.body.append(script2)

    const mapGpx = L.map('map2').setView(centre, 6);
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
      var distance = e.target.get_distance().toFixed(2)
      var dKM = distance/1000
      afficherDistance!.innerHTML = " " + dKM.toFixed(2) + " km " + " "
      })
      .addTo(mapGpx);
    })

  }
  public deleteFavoris(id:number){
    this.mapService.deleteFavorisService(id)
    .subscribe({
      next: ()=> this.deleteIsVisible = true, 
      error: (e)=> console.log(e)
    })
  }
  public generatePdf() {
    var pdf = new jsPDF();
    pdf.setFontSize(10);
    pdf.text('Activité : '+ this.itinerary[0].title, 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    (pdf as any).autoTable({
    head: this.header,
    body: [[this.itinerary[0].content]],
    theme: 'striped',
    fillColor: '#f8bbd0'
    })
    pdf.output('dataurlnewwindow')
    pdf.save('table.pdf');
  }  
  public downloadGpx(gpx:string){
    const url = this.mapService.downloadGpx(this.itinerary[0].gpx)
    const a = document.createElement('a')
    a.href = url
    a.download = `${this.itinerary[0].gpx}`
    a.click()
  }
  public showGpxService(filename: any) {
    const url = this.mapService.showGpx(filename)
    this.gpx = url
  }
  public closeMessage(){
    this.addIsVisible = false
    this.deleteIsVisible = false
  }

  public goToMyAccount(){
    window.location.reload()
  }
  public addFavoris(itinerary_id:number){
    this.http.post(BASE_URL + '/favoris/add/',{
      itinerary_id:itinerary_id
      
    },{
      withCredentials: true
    })
    .subscribe({
      next: ()=> this.addIsVisible = true,
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
  public filterByCity(city: string){
    this.mapService.filterPicByCity(city)
    .subscribe((response : LAUFEN.Pic[]) =>{
      this.pics = response
      if(this.pics.length == 0){
        this.picNull = true
      }
    })
  }
  public async getMeteo(){
    let key: string =  "cd68abf68d645635b8bae8cb9f1c1338"
    let url = (`https://api.openweathermap.org/data/2.5/weather?q=${this.itinerary[0].departure}&appid=${key}&units=metric&lang=fr`)
    let resp = await fetch(url)
    let datas = await resp.json()
    this.descriptionMeteo = datas.weather[0].description
    this.iconMeteo = datas.weather[0].icon
    this.temp = datas.main.temp
    this.iconUrl = "http://openweathermap.org/img/w/" + this.iconMeteo + ".png"
  }
}
