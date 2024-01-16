import { Component, OnInit } from '@angular/core';
import { LAUFEN } from '../../laufen';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.css']
})
export class SpotlightComponent implements OnInit {

  public itinerary: LAUFEN.Itinerary[]=[]
  public map: any
  public isVisible= false
  public target : any
  public cp: number = 0
  public itinerarySelectorShown: boolean = false

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.showIteneraryService(this.map)
  }
  public showIteneraryService(map: any) {
    this.mapService.showItenerarySpotlight()
      .subscribe((response: LAUFEN.Itinerary[]) => {
        this.itinerary = response
      })
    }
    public getItineraryDetail(id: number){
      this.mapService.showDetailItenerary(id).subscribe(
        (response: LAUFEN.Itinerary[])=>{
          this.itinerary = response
          this.itinerarySelectorShown = true
        }
      )
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
      this.showIteneraryService(this.map)
      if (!validate)
        return
    }
}
