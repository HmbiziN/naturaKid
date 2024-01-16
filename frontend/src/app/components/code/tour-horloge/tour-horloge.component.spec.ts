import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourHorlogeComponent } from './tour-horloge.component';

describe('TourHorlogeComponent', () => {
  let component: TourHorlogeComponent;
  let fixture: ComponentFixture<TourHorlogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourHorlogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourHorlogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
