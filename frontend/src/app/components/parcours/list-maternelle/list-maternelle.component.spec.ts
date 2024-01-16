import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaternelleComponent } from './list-maternelle.component';

describe('ListMaternelleComponent', () => {
  let component: ListMaternelleComponent;
  let fixture: ComponentFixture<ListMaternelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaternelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaternelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
