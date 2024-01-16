import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArticleShopComponent } from './detail-article-shop.component';

describe('DetailArticleShopComponent', () => {
  let component: DetailArticleShopComponent;
  let fixture: ComponentFixture<DetailArticleShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailArticleShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailArticleShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
