import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePicComponent } from './formulaire-pic.component';

describe('FormulairePicComponent', () => {
  let component: FormulairePicComponent;
  let fixture: ComponentFixture<FormulairePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulairePicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulairePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
