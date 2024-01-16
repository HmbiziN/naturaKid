import { Component, Input, OnInit } from '@angular/core';
import { LAUFEN } from '../../laufen';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-list-pil-for-id-i',
  templateUrl: './list-pil-for-id-i.component.html',
  styleUrls: ['./list-pil-for-id-i.component.css']
})
export class ListPilForIdIComponent implements OnInit {

  @Input() public id_i: number = 0
  public pil : LAUFEN.pil[] = []
  cp: number = 1

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.getPil(this.id_i)
  }
  public getPil(id: number){
    this.mapService.getPilWithIdI(id)
    .subscribe((response : LAUFEN.pil[]) =>{
      this.pil = response
    })
  }
  public gotToWbsite(url: string){
    window.open(url, "_blank")
  }

}
// getPilWithIdI