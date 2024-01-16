import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePicComponent } from './liste-pic.component';

describe('ListePicComponent', () => {
  let component: ListePicComponent;
  let fixture: ComponentFixture<ListePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
