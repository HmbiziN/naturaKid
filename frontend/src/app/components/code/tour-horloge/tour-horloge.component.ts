import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-horloge',
  templateUrl: './tour-horloge.component.html',
  styleUrls: ['./tour-horloge.component.css']
})
export class TourHorlogeComponent implements OnInit {
  public rightAnswer1 : boolean = false
  public wrongAnswer1: boolean = false
  public rightAnswer2 : boolean = false
  public wrongAnswer2: boolean = false
  public rightAnswer3 : boolean = false
  public wrongAnswer3: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  public rightOne(){
    this.rightAnswer1 = true
    this.wrongAnswer1 = false
  }
  public wrongOne(){
    this.rightAnswer1 = false
    this.wrongAnswer1 = true
  }
  public rightTwo(){
    this.rightAnswer2 = true
    this.wrongAnswer2 = false
  }
  public wrongTwo(){
    this.rightAnswer2 = false
    this.wrongAnswer2 = true
  }
  public rightThree(){
    this.rightAnswer3= true
    this.wrongAnswer3= false
  }
  public wrongThree(){
    this.rightAnswer3= false
    this.wrongAnswer3= true
  }
}
