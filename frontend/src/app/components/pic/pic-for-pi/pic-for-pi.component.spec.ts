import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicForPiComponent } from './pic-for-pi.component';

describe('PicForPiComponent', () => {
  let component: PicForPiComponent;
  let fixture: ComponentFixture<PicForPiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicForPiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicForPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
