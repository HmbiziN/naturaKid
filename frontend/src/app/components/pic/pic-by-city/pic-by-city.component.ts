import { Component, Input, OnInit } from '@angular/core';

import { LAUFEN } from '../../laufen';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-pic-by-city',
  templateUrl: './pic-by-city.component.html',
  styleUrls: ['./pic-by-city.component.css']
})
export class PicByCityComponent implements OnInit {
 public pics : LAUFEN.Pic[]=[]
 @Input() public city: string = ""
 cp: number = 1
 
  constructor(
    private mapService: MapService
    
  ) { }

  ngOnInit(): void {
    this.filterByCity("Issoire")
  }


  public filterByCity(city: string){
    this.mapService.filterPicByCity(this.city)
    .subscribe((response : LAUFEN.Pic[]) =>{
      this.pics = response
    })
  }
  public gotToWbsite(url: string){
    window.open(url, "_blank")
  }

}
