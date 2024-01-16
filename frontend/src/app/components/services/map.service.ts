import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../laufen';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  public showItenerary(){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+'/itenerary/',{
      withCredentials: true
    })
  }
  public showItenerarySpotlight(){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+'/itenerary/spotlight',{
      withCredentials: true
    })
  }
  public showDetailItenerary(id:number){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itenerary/detail/${id}`,{
      withCredentials: true
    })
  }
  public showGpx(filename: string){
    return BASE_URL+`/itinerary/read_gpx/${filename}`
  }
  public downloadGpx(filename: string){
    return BASE_URL+`/itinerary/download_gpx/${filename}`
  }
  public downloadImg(filename: string){
    return BASE_URL+`/itinerary/download_img/${filename}`
  }
  public downloadPdf(filename: string){
    return BASE_URL+`/itinerary/download_pdf/${filename}`
  }

  public filterItenerary(filtre:number){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itinerary/filter/${filtre}`,{
      withCredentials: true
    })
  }
  public filterIteneraryByComplexity(complexity:number){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itinerary/filter/complexity/${complexity}`,{
      withCredentials: true
    })
  }
  public filterIteneraryBycity(city:string){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itinerary/filter/city/${city}`,{
      withCredentials: true
    })
  }
  public filterIteneraryByLabelFalse(){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itinerary/filter/label/false`,{
      withCredentials: true
    })
  }
  public filterIteneraryByLabelTrue(){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itinerary/filter/label/true`,{
      withCredentials: true
    })
  }
  public showPic(){
    return this.http.get < LAUFEN.Pic[] >(BASE_URL+'/pic/',{
      withCredentials: true
    })
  }
  public filterPicByCity(city:string){
    return this.http.get < LAUFEN.Pic[] >(BASE_URL+`/pic/city/${city}`,{
      withCredentials: true
    })
  }
  public filterPicByCategory(category:string){
    return this.http.get < LAUFEN.Pic[] >(BASE_URL+`/pic/category/${category}`,{
      withCredentials: true
    })
  }
  public deleteItineraryService(id:number){
    return this.http.delete(BASE_URL +`/itinerary/delete/${id}`,{
      withCredentials: true
    })
  }
  public deletePicService(id: number){
    return this.http.delete(BASE_URL +`/pic/delete/${id}`,{
      withCredentials: true
    })
  }
  public getFavorisService(){
    return this.http.get < LAUFEN.Favoris[] >(BASE_URL + '/getFavorite/',{
      withCredentials: true
    })
  }
  public getFavorisItineraryService(){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL + '/getFavoriteItinereary/',{
      withCredentials: true
    })
  }
  public deleteFavorisService(id:number){
    return this.http.delete< LAUFEN.Favoris[] >(BASE_URL +`/deleteFavorite/${id}`,{
      withCredentials: true
    })
  }
  
  public filterTest(filtre:number, complexity:number){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itinerary/filter/test/${filtre}/${complexity}`,{
      withCredentials: true
    })
  }
  public filterMultiple(filtre:number, complexity:number, label: string){
    return this.http.get < LAUFEN.Itinerary[] >(BASE_URL+`/itinerary/filter/multiple/${filtre}/${complexity}/${label}`,{
      withCredentials: true
    })
  }
  public getPilWithIdI(id_i:number){
    return this.http.get < LAUFEN.pil[] >(BASE_URL+`/pil/${id_i}`,{
      withCredentials: true
    })
  }
}
