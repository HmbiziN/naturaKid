import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicByCityComponent } from './pic-by-city.component';

describe('PicByCityComponent', () => {
  let component: PicByCityComponent;
  let fixture: ComponentFixture<PicByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicByCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
