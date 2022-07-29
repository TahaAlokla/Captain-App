import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRestaurantComponent } from './info-restaurant.component';

describe('InfoRestaurantComponent', () => {
  let component: InfoRestaurantComponent;
  let fixture: ComponentFixture<InfoRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
