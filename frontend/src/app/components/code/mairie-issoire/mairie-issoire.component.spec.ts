import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MairieIssoireComponent } from './mairie-issoire.component';

describe('MairieIssoireComponent', () => {
  let component: MairieIssoireComponent;
  let fixture: ComponentFixture<MairieIssoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MairieIssoireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MairieIssoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
