import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAdComponent } from './pending-ad.component';

describe('PendingAdComponent', () => {
  let component: PendingAdComponent;
  let fixture: ComponentFixture<PendingAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
