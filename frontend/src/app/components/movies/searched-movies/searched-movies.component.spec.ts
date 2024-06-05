import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedMoviesComponent } from './searched-movies.component';

describe('SearchedMoviesComponent', () => {
  let component: SearchedMoviesComponent;
  let fixture: ComponentFixture<SearchedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
