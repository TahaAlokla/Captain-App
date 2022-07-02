import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResturantComponent } from './home-resturant.component';

describe('HomeResturantComponent', () => {
  let component: HomeResturantComponent;
  let fixture: ComponentFixture<HomeResturantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResturantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
