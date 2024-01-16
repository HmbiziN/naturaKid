import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrimaireComponent } from './list-primaire.component';

describe('ListPrimaireComponent', () => {
  let component: ListPrimaireComponent;
  let fixture: ComponentFixture<ListPrimaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrimaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrimaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
