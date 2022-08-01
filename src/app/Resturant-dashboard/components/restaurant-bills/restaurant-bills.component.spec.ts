import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantBillsComponent } from './restaurant-bills.component';

describe('RestaurantBillsComponent', () => {
  let component: RestaurantBillsComponent;
  let fixture: ComponentFixture<RestaurantBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
