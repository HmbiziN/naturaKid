import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPilForIdIComponent } from './list-pil-for-id-i.component';

describe('ListPilForIdIComponent', () => {
  let component: ListPilForIdIComponent;
  let fixture: ComponentFixture<ListPilForIdIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPilForIdIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPilForIdIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
