import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCodeComponent } from './article-code.component';

describe('ArticleCodeComponent', () => {
  let component: ArticleCodeComponent;
  let fixture: ComponentFixture<ArticleCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
