import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItineraryComponent } from './detail-itinerary.component';

describe('DetailItineraryComponent', () => {
  let component: DetailItineraryComponent;
  let fixture: ComponentFixture<DetailItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailItineraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
