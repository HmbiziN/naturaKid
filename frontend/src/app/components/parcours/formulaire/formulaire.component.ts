import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/utils/global';
import { AuthentificationService } from '../../services/authentification.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  
  public map: any
  public departure: string = ''
  public lat: number = 0
  public lng: number = 0
  public distance: number = 0
  public mapLocalisation: boolean = false
  public address: string =''
  public complexity: number =0
  public age: number =0
  public complexityOne: boolean = true
  public complexityTwo: boolean = true
  public complexityThree: boolean = true
  public ageOne: boolean = true
  public ageTwo: boolean = true
  public ageThree: boolean = true
  public markerGreen = L.icon({
    iconUrl: 'assets/markerGreen.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
  })
  
  public title: string =''
  public content: string =''
  public gpx: string =''
  public doc: string =''
  public newItinerary: FormGroup;
  public conditionIsVisible: boolean = false
  public label: boolean = false
  public labelTrue: boolean = false
  public labelFalse: boolean = false
  public play: boolean = false
  public playTrue: boolean = false
  public playFalse: boolean = false
  public selectedDoc : File | null = null
  public selectedgpx : File | null = null
  public selectedimg : File | null = null
  public isAdmin: boolean = false
  private subscription : Subscription[]= []
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthentificationService
    ) { 
      this.newItinerary = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        lat: ['', Validators.required],
        lng: ['', Validators.required],
        gpx:['', Validators.required],
        doc:[''],
        age:['', Validators.required],
        complexity:['', Validators.required],
        label: [''],
        play:[''],
        distance: ['', Validators.required],
        departure:['', Validators.required]
      })
    }
    
    ngOnInit(): void {
      const centre = {
        lat: 46.227638,
        lng: 2.213749
      }
      this.subscription.push(
        this.authService.isAdmin().subscribe(isAdmin=>this.isAdmin = isAdmin)
      )
      this.newItinerary =new FormGroup({
        title: new FormControl('', Validators.compose([])),
        content: new FormControl('', Validators.compose([])),
        lat: new FormControl('', Validators.compose([])),
        lng: new FormControl('', Validators.compose([])),
        gpx:new FormControl('', Validators.compose([])),
        doc:new FormControl('', Validators.compose([])),
        age:new FormControl('', Validators.compose([])),
        complexity:new FormControl('', Validators.compose([])),
        play: new FormControl('', Validators.compose([])),
        label: new FormControl('', Validators.compose([])),
        distance: new FormControl('', Validators.compose([])),
        departure: new FormControl('', Validators.compose([]))
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
  
  public valueAgeSelected(value: number){
    this.age = value
    if (this.age == 1) {
      this.ageOne = true
    }
    else {
      this.ageOne = false
    }
    if (this.age == 2) {
      this.ageTwo = true
    }
    else {
      this.ageTwo = false
    }
    if (this.age == 3) {
      this.ageThree = true
    }
    else {
      this.ageThree = false
    }
    
  }
  public valueComplexitySelected(value: number){
    this.complexity = value
    if (this.complexity == 1) {
      this.complexityOne = true
    }
    else {
      this.complexityOne = false
    }
    if (this.complexity == 2) {
      this.complexityTwo = true
    }
    else {
      this.complexityTwo = false
    }
    if (this.complexity == 3) {
      this.complexityThree = true
    }
    else {
      this.complexityThree = false
    }
  }
  public labelSelected(value: boolean){
    this.label = value
    if (this.label == true) {
      this.labelTrue = true
    }
    else {
      this.labelTrue = false
    }
    if (this.label == false) {
      this.labelFalse = true
    }
    else {
      this.labelFalse = false
    }
  }
  public playSelected(value: boolean) {
    this.play = value
    if (this.play == true) {
      this.playTrue = true
    }
    else {
      this.playTrue = false
    }
    if (this.play == false) {
      this.playFalse = true
    }
    else {
      this.playFalse = false
    }
  }
  
  public onDocSelected(event: any) {
    this.selectedDoc = <File>event.target.files[0]
    this.uploadDoc(this.selectedDoc)
  }
  
  public uploadDoc(selectedDoc: File) {
    const fd = new FormData()
    fd.append('doc', selectedDoc, selectedDoc.name)
    return this.http.post(BASE_URL + '/itenerary/add_file/', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
      }
      else if (event.type === HttpEventType.Response){
      }
    })
  }
  
  public ongpxSelected(event: any){
    this.selectedgpx = <File>event.target.files[0]
    this.uploadgpx(this.selectedgpx)
  }
  
  public uploadgpx(selectedgpx: File){
    const fd = new FormData()
    fd.append('gpx', selectedgpx, selectedgpx.name)
    return this.http.post(BASE_URL + '/itenerary/add_gpx/', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
      }
      else if (event.type === HttpEventType.Response){
      }
    })
  }
  public onimgSelected(event: any){
    this.selectedimg = <File>event.target.files[0]
    this.uploadimg(this.selectedimg)
  }
  
  public uploadimg(selectedimg: File){
    const fd = new FormData()
    fd.append('img', selectedimg, selectedimg.name)
    return this.http.post(BASE_URL + '/itenerary/add_img/', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
      }
      else if (event.type === HttpEventType.Response){
      }
    })
  }
  
  public addNewItenerary() {
    
    this.http.post(BASE_URL + '/itinerary/new_itenerary/', {
      title: this.title,
      age: this.age,
      complexity: this.complexity,
      lat: this.lat,
      lng: this.lng,
      content: this.content,
      active: false,
      gpx: this.selectedgpx?.name,
      doc: this.selectedDoc?.name,
      img: this.selectedimg?.name,
      play: this.play,
      label: this.label,
      departure: this.address,
      distance: this.distance,
    }, {
      withCredentials: true,
    })
    .subscribe({
      next: () => this.router.navigateByUrl('/list_road'),
      error: (e) => console.log(e)
    })
  }
  
  public submit(){
    if(this.newItinerary.valid){
      this.addNewItenerary()
    }
  }
}
