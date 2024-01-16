import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddPilComponent } from './form-add-pil.component';

describe('FormAddPilComponent', () => {
  let component: FormAddPilComponent;
  let fixture: ComponentFixture<FormAddPilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddPilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddPilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
